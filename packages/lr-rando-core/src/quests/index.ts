import { Areas, QuestState } from "..";
import { prayers } from "./canvas";
import { DeadDunesMainQuest, DeadDunesSideQuests, DeadMainQuestCompletionValues } from "./deaddunes";
import { LuxerionMainQuest, LuxerionSideQuests, LuxMainQuestCompletionValues } from "./luxerion";
import { QuestInfo, QuestPrerequisites, QuestProgressCheck } from "./model";
import { SazhMainQuest } from "./sazh";
import { WildlandsMainQuest, WildlandsSideQuests, WildMainQuestCompletionValues } from "./wildlands";
import { YusMainQuestCompletionValues, YusnaanMainQuest, YusnaanSideQuests } from "./yusnaan";

const mainQuests = {
    [Areas.LUXERION]: LuxerionMainQuest,
    [Areas.YUSNAAN]: YusnaanMainQuest,
    [Areas.WILDLANDS]: WildlandsMainQuest,
    [Areas.DEAD_DUNES]: DeadDunesMainQuest,
    [Areas.GLOBAL]: SazhMainQuest
}

const sideQuests = {
    [Areas.LUXERION]: LuxerionSideQuests,
    [Areas.YUSNAAN]: YusnaanSideQuests,
    [Areas.WILDLANDS]: WildlandsSideQuests,
    [Areas.DEAD_DUNES]: DeadDunesSideQuests,
    [Areas.GLOBAL]: {}
}

type CanvasLuxNames = keyof typeof prayers[Areas.LUXERION];
type CanvasYusNames = keyof typeof prayers[Areas.YUSNAAN];
type CanvasWildNames = keyof typeof prayers[Areas.WILDLANDS];
type CanvasDeadNames=  keyof typeof prayers[Areas.DEAD_DUNES];
type CanvasGlobalNames = keyof typeof prayers[Areas.GLOBAL];

export type CanvasNames = CanvasLuxNames | CanvasYusNames | CanvasWildNames | CanvasDeadNames | CanvasGlobalNames;

type SideLuxNames = keyof typeof sideQuests[Areas.LUXERION];
type SideYusNames = keyof typeof sideQuests[Areas.YUSNAAN];
type SideWildNames = keyof typeof sideQuests[Areas.WILDLANDS];
type SideDeadNames = keyof typeof sideQuests[Areas.DEAD_DUNES];

export type SideQuestNames = SideLuxNames | SideYusNames | SideWildNames | SideDeadNames;

type MainLuxNames = keyof typeof mainQuests[Areas.LUXERION];
type MainYusNames = keyof typeof mainQuests[Areas.YUSNAAN];
type MainWildNames = keyof typeof mainQuests[Areas.WILDLANDS];
type MainDeadNames = keyof typeof mainQuests[Areas.DEAD_DUNES];
type MainSazhNames = keyof typeof mainQuests[Areas.GLOBAL];

export type MainQuestNames = MainLuxNames | MainYusNames | MainWildNames | MainDeadNames | MainSazhNames;

export type QuestNames = CanvasNames | SideQuestNames | MainQuestNames;

export const allQuests: {[key in QuestNames]: QuestInfo} = {
    ...mainQuests[Areas.LUXERION],
    ...mainQuests[Areas.YUSNAAN],
    ...mainQuests[Areas.WILDLANDS],
    ...mainQuests[Areas.DEAD_DUNES],
    ...mainQuests[Areas.GLOBAL],
    ...sideQuests[Areas.LUXERION],
    ...sideQuests[Areas.YUSNAAN],
    ...sideQuests[Areas.WILDLANDS],
    ...sideQuests[Areas.DEAD_DUNES],
    ...prayers[Areas.LUXERION],
    ...prayers[Areas.YUSNAAN],
    ...prayers[Areas.WILDLANDS],
    ...prayers[Areas.DEAD_DUNES],
    ...prayers[Areas.GLOBAL],
}

export type SideQuestAreas = Areas.LUXERION | Areas.YUSNAAN | Areas.WILDLANDS | Areas.DEAD_DUNES | Areas.GLOBAL;

export function canStartQuest(questName: string, context: QuestProgressCheck): {can: boolean; reasons?: string[]} {
    const reasons: string[] = [];
    const match = allQuests.hasOwnProperty(questName);
    if(!match){
        return { can: false };
    }
    let canStart = true;
    const questInfo = allQuests[questName as QuestNames];
    const hasQuestCheck = questInfo.prerequisiteQuests;
    if(hasQuestCheck){
        hasQuestCheck.forEach(q => {
            const questCompleted = context.questState[q] === QuestState.COMPLETED;
            if(!questCompleted){
                reasons.push(q);
            }
            canStart &&= questCompleted
        });
    }
    const hasOtherCheck = questInfo.prerequisiteOther;
    if(hasOtherCheck){
        hasOtherCheck.map(other => QuestPrerequisites[other]).forEach(p => {
            const {name, check} = p;
            const prereqCompleted = check(context);
            if(!prereqCompleted){
                reasons.push(name);
            }
            canStart &&= prereqCompleted;
        })
    }
    return {
        can: canStart,
        reasons
    };
}

export interface MainQuestProgressValues {
    luxerion: number;
    yusnaan: number;
    wildlands1: number; //This is the one with the HIGHER memory address
    wildlands2: number;
    deaddunes: number;
}

export interface MainQuestPosition {
    luxerion: number;
    yusnaan: number;
    wildlands: number;
    deaddunes: number;
}

export function resolveMainQuestProgress(input: MainQuestProgressValues): MainQuestPosition {
    const {num: luxerion} = processValueBoundaries(LuxMainQuestCompletionValues, input.luxerion);
    const {num: yusnaan} = processValueBoundaries(YusMainQuestCompletionValues, input.yusnaan);
    const {num: wildlands} = processValueBoundaries(WildMainQuestCompletionValues, input.wildlands1, input.wildlands2);
    const {num: deaddunes} = processValueBoundaries(DeadMainQuestCompletionValues, input.deaddunes);
    return {
        luxerion,
        yusnaan,
        wildlands,
        deaddunes
    };
}

function processValueBoundaries(mapping: {[key: string]: {num: number; complete: number; completeSecond?: number}}, toCheck: number, toCheckSecond?: number): {num: number; name: string} {
    for(const entry of Object.entries(mapping)){
        const {num, complete, completeSecond} = entry[1];
        if(toCheckSecond && completeSecond){
            if(toCheck >= complete && toCheckSecond >= completeSecond){
                return {
                    num,
                    name: entry[0]
                };
            }
        } else if(!toCheckSecond && !completeSecond){
            if(toCheck >= complete){
                return {
                    num,
                    name: entry[0]
                };
            }
        } else {
            console.log('Had only one of 2 expected second values?');
        }
    }
    console.log('Fell through value boundaries');
    return {
        num: 0,
        name: 'Unknown'
    }
}