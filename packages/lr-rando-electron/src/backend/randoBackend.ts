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
            for(const key of Object.keys(this.oldState) as (keyof RandoMemoryState)[]){
                if(this.oldState[key] === newState[key]){
                    delete newState[key];
                }
            }
            this.oldState = Object.assign(this.oldState, newState);
            return this.prettifyState(newState);
        }
    }

    prettifyState(state: RandoMemoryState): RandoMemoryState {
        const regionInfo = extractZoneInfo(state.region.map, state.region.zone);
        if(!regionInfo.known){
            const key = regionInfo.map+':'+regionInfo.zone;
            if(!this.unknownRegions.has(key)){
                this.unknownRegions.add(key);
                console.log(`New unknown region: ${key}`);
            }
        }
        state.region = regionInfo;
        const EpAbilities: string[] = [];
        const unknownEp: string[] = [];
        state.epAbilities.forEach(ability =>{
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
        state.items = new Map([...state.items].map(kv => [prettyPrintItem(kv[0]).name,kv[1]]));
        state.keyItems = new Map([...state.keyItems].map(kv => [prettyPrintKeyItem(kv[0]).name,kv[1]]));
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
