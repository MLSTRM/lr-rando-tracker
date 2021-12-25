import { attachAndVerify, LrMemoryReader, RandoMemoryState, scrapeRandoState } from "lr-rando-autotracker";
import { extractZoneInfo, MainQuestPosition, prettyPrintEpAbility, prettyPrintItem, prettyPrintKeyItem, getCanvasNamesList, getCanvasQuestInfo } from "lr-rando-core";
import _ from 'lodash';

const reservedKeys = ['time', 'region'];

export class RandoBackend {
    private reader: LrMemoryReader;
    private readerLoaded: boolean = false;
    private oldUnknownEp: string[] = [];
    private unknownRegions: Set<string> = new Set();
    private stateValid: boolean = false;

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
        const newState = scrapeRandoState(this.reader);
        if(this.checkStateValid(newState)){
            this.stateValid = true;
            this.oldState = newState;
            return this.prettifyState(newState);
        } else {
            this.stateValid = false;
            return undefined;
        }
    }

    public getStateChanges(): Partial<RandoMemoryState> {
        if(!this.readerLoaded){
            this.readerLoaded = attachAndVerify(this.reader);
            return {};
        } else {
            const newState = scrapeRandoState(this.reader);
            if(this.checkStateValid(newState)){
                this.stateValid = true;
                this.removeDuplicatesRecursive(this.oldState, newState);
                this.oldState =_.merge(this.oldState, newState);
                return this.prettifyState(newState);
            } else {
                this.stateValid = false;
                return {};
            }
        }
    }

    checkStateValid(state: RandoMemoryState): boolean {
        if(state.maxEP > 20){
            return false;
        }
        return true;
    }

    removeDuplicatesRecursive(obj1: any, obj2: any): any {
        for(const key of Object.keys(obj1).filter(k => !reservedKeys.includes(k))){
            if(obj1[key] instanceof Map || obj2[key] instanceof Map){
                continue;
            } 
            else if (Array.isArray(obj1[key]) && Array.isArray(obj2[key])){
                if(obj1[key].length === obj2[key].length){
                    if(obj1[key].every((v: any) => obj2[key].includes(v)) && obj2[key].every((v: any) => obj1[key].includes(v)) ){
                        delete obj2[key];
                    }
                }
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
        if(state.region){
            const regionInfo = extractZoneInfo(state.region.map, state.region.zone);
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

        if(state.canvasOfPrayers){
            // Only show accepted quests which are not completed
            const completed = this.oldState.canvasOfPrayers?.completed ?? {};
            const accepted = this.oldState.canvasOfPrayers?.accepted ?? {};
            Object.keys(completed).forEach(key => {
                if(accepted[key]){
                    accepted[key] = accepted[key]?.filter(i => !completed[key]?.includes(i)) ?? [];
                }
            });
            state.canvasOfPrayers = {
                completed,
                accepted
            };
        } else {
            delete state.canvasOfPrayers;
        }

        return state;
    }

    public checkItemCount(name: string): number {
        return this.stateValid ? this.oldState.items?.get(name) ?? 0 : 0;
    }

    public checkKeyItemCount(name: string): number {
        return this.stateValid ? this.oldState.keyItems?.get(name) ?? 0 : 0;
    }

    public checkEPAbility(name: string): boolean {
        return this.stateValid && !!this.oldState.epAbilities?.includes(name);
    }

    public checkMainQuest(main: string): number {
        return this.stateValid ? this.oldState.mainQuestProgress?.[main as unknown as keyof MainQuestPosition] ?? 0 : 0;
    }

    public getCanvasList(area?: number): string[] {
        return getCanvasNamesList(area);
    }

    public getCanvasInfoByName(name: string): any {
        return getCanvasQuestInfo(name);
    }
}
