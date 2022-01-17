import { attachAndVerify, LrMemoryReader, RandoMemoryState, scrapeRandoState } from "lr-rando-autotracker";
import { extractZoneInfo, MainQuestPosition, prettyPrintEpAbility, prettyPrintItem, prettyPrintKeyItem,
    getCanvasNamesList, getCanvasQuestInfo, getSideQuestNamesList, SideQuestProgress, areaIndexStringToAreaName, QuestRequirement, getSideQuestInfo, QuestProgressCheck, QuestState, resolveMainQuestProgress } from "lr-rando-core";
import _ from 'lodash';
import { QuestInfo, QuestPrerequisites, EnrichedQuestRequirement, EnrichedQuestInfo } from "lr-rando-core";

const reservedKeys = ['time', 'region', 'mainQuestBytes'];

export class RandoBackend {
    private reader: LrMemoryReader;
    private readerLoaded: boolean = false;
    private oldUnknownEp: string[] = [];
    private unknownRegions: Set<string> = new Set();
    private stateValid: boolean = false;

    private settings: BackendSettings = {
        halfCanvas: false
    };

    private oldState: Partial<BackendRandoMemoryState>;

    constructor(){
        this.reader = new LrMemoryReader();
        this.oldState = {};
    }

    public disconnect(): void {
        this.reader.detatch();
        this.readerLoaded = false;
    }

    public async getState(): Promise<BackendRandoMemoryState | undefined> {
        if(!this.readerLoaded){
            this.readerLoaded = await attachAndVerify(this.reader);
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

    public async getStateChanges(): Promise<Partial<BackendRandoMemoryState>> {
        if(!this.readerLoaded){
            this.readerLoaded = await attachAndVerify(this.reader);
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

    prettifyState(state: BackendRandoMemoryState): BackendRandoMemoryState;
    prettifyState(state: Partial<BackendRandoMemoryState>): Partial<BackendRandoMemoryState> {
        if(state.mainQuestBytes){
            state.mainQuestProgress = resolveMainQuestProgress(state.mainQuestBytes);
            this.oldState.mainQuestProgress = state.mainQuestProgress;
        }

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
            [0,1,2,3,4].forEach(key => {
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

    public getSideQuestList(area?: number): Map<string, SideQuestProgress | undefined> {
        const keys = getSideQuestNamesList(area);
        const areas = (area && area >= 0) ? [area] : [0, 1, 2, 3];
        const map = new Map();
        key: for(const key of keys){
            for(const locs of areas){
                if(this.oldState.sideQuestProgress?.[locs]?.map(q => q.name).includes(key)){
                    map.set(key, this.oldState.sideQuestProgress?.[locs].find(q => q.name === key));
                    continue key;
                }
            }
            map.set(key, undefined);
        }
        return map;
    }

    public getCanvasList(area?: number): Map<string, string> {
        const keys = getCanvasNamesList(area);
        const areas = (area && area >= 0) ? [area] : [0, 1, 2, 3, 4];
        const map = new Map();
        key: for(const key of keys){
            for(const locs of areas){
                if(this.oldState.canvasOfPrayers?.completed[locs]?.includes(key)){
                    map.set(key, 'Complete');
                    continue key;
                } else if (this.oldState.canvasOfPrayers?.accepted[locs]?.includes(key)){
                    map.set(key, 'Accepted');
                    continue key;
                }
            }
            map.set(key, '');
        }
        return map;
    }

    public getCanvasInfoByName(name: string): any {
        let status = '';
        const areas = [0, 1, 2, 3, 4];
        for(const locs of areas){
            if(this.oldState.canvasOfPrayers?.completed[locs]?.includes(name)){
                status = 'Complete';
                break;
            } else if (this.oldState.canvasOfPrayers?.accepted[locs]?.includes(name)){
                status = 'Accepted';
                break;
            }
        }
        const info = getCanvasQuestInfo(name);
        if(info){
            const {quest, region} = info;
            const displayQuest = enrichSideQuestInfo(quest, this.constructProgressCheck(), this.settings);
            //translate names into better forms
            return Object.assign(displayQuest, {status, region: areaIndexStringToAreaName(region)});
        }
        return undefined;
    }

    public getSideQuestInfoByName(name: string): any {
        let status = '';
        const info = getSideQuestInfo(name);
        if(info){
            const {quest, region} = info;
            const progress = this.oldState.sideQuestProgress?.[Number(region)]?.find(q => q.name === name)
            if(progress){
                status = progress.status;
            }
            const displayQuest = enrichSideQuestInfo(quest, this.constructProgressCheck());
            //translate names into better forms
            return Object.assign(displayQuest, {status, region: areaIndexStringToAreaName(region)});
        }
        return undefined;
    }

    constructProgressCheck(): QuestProgressCheck {
        return {
            bossLocations: {},
            day: this.oldState.time?.trueDay || 0,
            hasObtained: {},
            keyInventory: this.oldState.keyItems ?? new Map(),
            odin: this.oldState.odinHealth ?? 0,
            questState: this.convertQuestState(),
            mainQuestProgress: this.oldState.mainQuestProgress!,
            mainQuestBytes: this.oldState.mainQuestBytes!,
            inventory: this.oldState.items ?? new Map()
        };
    }

    convertQuestState(): {[x: string]: QuestState} {
        const base = this.getSideQuestList();
        const canvasBase = this.getCanvasList();
        return Object.fromEntries([...[...base].map(([k,v]) => ([k, statusToIndex(v?.status)])), ...[...canvasBase].map(([k,v]) => ([k, statusToIndex(v)]))]);
    }

    public hasGarbByName(garb: string): boolean {
        return (this.oldState.garbs?.includes(garb) || this.oldState.schemas?.slot1 === garb || this.oldState.schemas?.slot2 === garb || this.oldState.schemas?.slot3 === garb) ?? false;
    }

    public setSettingsHalfCanvas(value?: boolean): void {
        console.log(`Setting half canvas to: ${value}`);
        this.settings.halfCanvas = !!value;
    }
}

function statusToIndex(status?: string): QuestState {
    switch(status){
        case 'Complete':
            return QuestState.COMPLETED;
        default:
            return QuestState.AVAILABLE;
    }
}

function enrichSideQuestInfo(info: QuestInfo, state: QuestProgressCheck, settings?: BackendSettings): EnrichedQuestInfo {
    const mutable: EnrichedQuestInfo = {
        name: info.name,
        requirements: enrichRequirements(info.requirements, state, settings)
    };
    if(info.prerequisiteOther){
        const mappedPrerequisites = info.prerequisiteOther.map(e => ({name: QuestPrerequisites[e].name, complete: QuestPrerequisites[e].check(state)}));
        mutable.prerequisiteOther = mappedPrerequisites;
    }
    if(info.prerequisiteQuests){
        const mappedPrerequisites = info.prerequisiteQuests.map(name => mapMainQuestName(name, state));
        mutable.prerequisiteQuests = mappedPrerequisites;
    }
    if(info.handIn){
        mutable.handIn = info.handIn;
    }
    if(info.trigger){
        mutable.trigger = info.trigger;
    }
    return mutable;
}

function enrichRequirements(reqs: false | QuestRequirement | QuestRequirement[], state: QuestProgressCheck, settings?: BackendSettings): false | EnrichedQuestRequirement | EnrichedQuestRequirement[] {
    if(!reqs){
        return reqs;
    }
    if(!Array.isArray(reqs)){
        const requirement = reqs;
        const mappedRequirement = mapRequirements(requirement, state, settings);
        return mappedRequirement;
    }
    return reqs.map(r => mapRequirements(r, state));
}

function mapMainQuestName(name: string, state: QuestProgressCheck): {name: string, complete: boolean} {
    const match = name.match(/[A-Za-z]*_([0-9])_([0-9])/);
    if(!match){
        return {
            name,
            complete: state.questState[name] === QuestState.COMPLETED
        };
    }
    const key = getAreaFromKey(match[1]);
    return {
        name: `Main Quest ${match[1]}-${match[2]}`,
        complete: !!key && state.mainQuestProgress[key] >= Number(match[2])
    };
}

function getAreaFromKey(id: '1' | '2' | '3' | '4' | '5' | string): keyof MainQuestPosition | undefined{
    switch(id){
        case '1':
            return 'luxerion';
        case '2':
            return 'yusnaan';
        case '3':
            return 'wildlands';
        case '4':
            return 'deaddunes';
        case '5':
            return 'sazh';
    }
    return undefined;
}

function mapRequirements(requirement: QuestRequirement, state: QuestProgressCheck, settings?: BackendSettings): EnrichedQuestRequirement {
    const mappedRequirement: EnrichedQuestRequirement = {};
    for(const key of Object.keys(requirement)){
        const value = requirement[key];
        let name = key;
        let newValue = value;
        let current: number | boolean = 0;
        const isItemWithInfo = prettyPrintItem(key);
        if(isItemWithInfo.known){
            if(typeof value === 'number' && settings && settings.halfCanvas && !isItemWithInfo.name.includes('key_')){
                newValue = Math.ceil(value / 2);
            }
            name = isItemWithInfo.name;
            current = state.inventory?.get(key) ?? 0;
        }
        const isKeyItemWithInfo = prettyPrintKeyItem(key);
        if(isKeyItemWithInfo.known){
            name = isKeyItemWithInfo.name;
            current = state.keyInventory?.get(key) ?? 0;
        }
        if(key==='odin'){
            name = 'Heal Odin';
            current = state.odin;
        }
        if(typeof value === 'boolean'){
            current = !!current;
        }
        mappedRequirement[name] = {
            required: newValue,
            current
        };
    }
    return mappedRequirement;
}


interface BackendSettings {
    halfCanvas: boolean;
}

interface BackendRandoMemoryState extends RandoMemoryState {
    mainQuestProgress?: MainQuestPosition;
}