import { attachAndVerify, LrMemoryReader, RandoMemoryState, scrapeRandoState } from "lr-rando-autotracker";
import { extractZoneInfo, MainQuestPosition, prettyPrintEpAbility, prettyPrintItem, prettyPrintKeyItem } from "lr-rando-core";

export class RandoBackend {
    private reader: LrMemoryReader;
    private readerLoaded: boolean = false;
    private oldUnknownEp: string[] = [];
    private unknownRegions: Set<string> = new Set();

    private oldState: Partial<RandoMemoryState>;

    constructor(){
        this.reader = new LrMemoryReader();
        this.oldState = {};
    }

    public disconnect(): void {
        this.reader.detatch();
    }

    public getState(): RandoMemoryState | undefined {
        if(!this.readerLoaded){
            this.readerLoaded = attachAndVerify(this.reader);
            if(!this.readerLoaded){
                return undefined;
            }
        }
        const newState =  scrapeRandoState(this.reader);
        this.oldState = newState;
        return this.prettifyState(newState);
    }

    public getStateChanges(): Partial<RandoMemoryState> {
        if(!this.readerLoaded){
            this.readerLoaded = attachAndVerify(this.reader);
            return {};
        } else {
            const newState = scrapeRandoState(this.reader);
            this.removeDuplicatesRecursive(this.oldState, newState);
            this.oldState = Object.assign(this.oldState, newState);
            return this.prettifyState(newState);
        }
    }

    removeDuplicatesRecursive(obj1: any, obj2: any): any {
        for(const key of Object.keys(obj1).filter(k => k!=='time')){
            if(Array.isArray(obj1[key]) || Array.isArray(obj2[key]) || obj1[key] instanceof Map || obj2[key] instanceof Map){
                continue;
            }
            else if(typeof obj1[key] === "object" && typeof obj2[key] === "object"){
                this.removeDuplicatesRecursive(obj1[key], obj2[key]);
                if(Object.keys(obj2[key]).length === 0){
                    delete obj2[key];
                }
            }
            else if(obj1[key] === obj2[key]){
                delete obj2[key];
            }
        }
    }

    prettifyState(state: RandoMemoryState): RandoMemoryState;
    prettifyState(state: Partial<RandoMemoryState>): Partial<RandoMemoryState> {
        if(state.region?.zone){
            const regionInfo = extractZoneInfo(state.region.map ?? this.oldState.region?.map, state.region.zone);
            if(!regionInfo.known){
                const key = regionInfo.map+':'+regionInfo.zone;
                if(!this.unknownRegions.has(key)){
                    this.unknownRegions.add(key);
                    console.log(`New unknown region: ${key}`);
                }
            }
            state.region = regionInfo;
        }

        if(state.epAbilities){
            const EpAbilities: string[] = [];
            const unknownEp: string[] = [];
            state.epAbilities?.forEach(ability =>{
                const {known, name} = prettyPrintEpAbility(ability);
                if(known){
                    EpAbilities.push(name);
                } else {
                    unknownEp.push(name);
                }
            });
            if(unknownEp.length != this.oldUnknownEp.length){
                console.log(`Number of unknown ep values changed: ${this.oldUnknownEp.length} to ${unknownEp.length}`);
                console.log(`List is now: ${JSON.stringify(unknownEp)}`);
                this.oldUnknownEp = unknownEp;
            }
            state.epAbilities = EpAbilities;
        }

        if(state.items){
            state.items = new Map([...state.items].map(kv => [prettyPrintItem(kv[0]).name,kv[1]]));
        }

        if(state.keyItems){
            state.keyItems = new Map([...state.keyItems].map(kv => [prettyPrintKeyItem(kv[0]).name,kv[1]]));
        }

        return state;
    }

    public checkItemCount(name: string): number {
        return this.oldState.items?.get(name) ?? 0;
    }

    public checkKeyItemCount(name: string): number {
        return this.oldState.keyItems?.get(name) ?? 0;
    }

    public checkEPAbility(name: string): boolean {
        return !!this.oldState.epAbilities?.includes(name);
    }

    public checkMainQuest(main: string): number {
        return this.oldState.mainQuestProgress?.[main as unknown as keyof MainQuestPosition] ?? 0;
    }
}
