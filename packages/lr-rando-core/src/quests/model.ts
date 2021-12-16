import { QuestNames } from ".";
import { QuestState } from "..";
import { Areas, Bosses, MainQuests, MiniBosses } from "../constants";
import { KeyItem } from "../identifiers";
import { NpcAvailable } from "../model";

export interface QuestInfo {
    name: string;
    requirements: false | QuestRequirement | QuestRequirement[]
    prerequisiteQuests?: string[], //narrow to quest ids/names
    prerequisiteOther?: QuestPrerequisite[], //narrow to specific list
    trigger?: string | NpcAvailable; //narrow to only NpcAvailable struct
    handIn?: string | NpcAvailable;
    failable?: boolean;
    sideQuestId?: number;
    sideQuestProgress?: Map<number, string>;
    canvasByteIndex?: number,
    canvasByteOffset?: number;
}

export interface MainQuestLine {
    id: MainQuests;
    quests: {[key: string]: QuestInfo}
}

interface QuestRequirement {
    [key: string]: true | number //TODO: change key here to be KeyItem | Item | Event
}

export interface QuestProgressCheck {
    day: number;
    odin: number;
    hasObtained: {[key: string]: boolean};
    keyInventory: {[key in KeyItem]?: number};
    visited: {[key in Areas]?: boolean};
    bossLocations: {[key in Bosses | MiniBosses]?: boolean};
    questState: {[key in QuestNames]: QuestState} & {[key: string]: undefined};
};

type QuestPrerequisite = keyof typeof QuestPrerequisites;

export const QuestPrerequisites = {
    "time_day_1": {name: '', check: (context: QuestProgressCheck) => context.day >= 1},
    "time_day_2": {name: '', check: (context: QuestProgressCheck) => context.day >= 2},
    "time_day_3": {name: '', check: (context: QuestProgressCheck) => context.day >= 3},
    "time_day_4": {name: '', check: (context: QuestProgressCheck) => context.day >= 3},
    "time_day_5": {name: '', check: (context: QuestProgressCheck) => context.day >= 3},
    "time_day_6": {name: '', check: (context: QuestProgressCheck) => context.day >= 3},
    "time_day_7": {name: '', check: (context: QuestProgressCheck) => context.day >= 3},
    "time_day_8": {name: '', check: (context: QuestProgressCheck) => context.day >= 3},
    "time_day_9": {name: '', check: (context: QuestProgressCheck) => context.day >= 3},
    "time_day_10": {name: '', check: (context: QuestProgressCheck) => context.day >= 3},
    "odin_level_1": {name: '', check: (context: QuestProgressCheck) => context.odin >= 120},
    "odin_level_2": {name: '', check: (context: QuestProgressCheck) => context.odin >= 250},
    "odin_level_3": {name: '', check: (context: QuestProgressCheck) => context.odin >= 400},
    "event_make_chocobull": {name: '', check: (context: QuestProgressCheck) => context.hasObtained['chocobull_cardesia']},
    "event_harvest_gysahl": {name: '', check: (context: QuestProgressCheck) => context.hasObtained['gysahl_field']},
    "event_harvest_tantal": {name: '', check: (context: QuestProgressCheck) => context.hasObtained['tantal_field']},
    "keyItem_boss_note": {name: '', check: (context: QuestProgressCheck) => !!context.keyInventory['key_y_shiji']},
    "event_pickett_steal": {name: '', check: (context: QuestProgressCheck) => context.hasObtained['pickett_steal']},
    "time_3h_after_fuzzy_search": {name: '', check: (context: QuestProgressCheck) => true},
    "accept_rough_beast": {name: '', check: (context: QuestProgressCheck) => context.hasObtained['rough_beast']},
    "area_yusnaan": {name: '', check: (context: QuestProgressCheck) => !!context.visited[Areas.YUSNAAN]},
    "boss_{cyclops}": {name: '', check: (context: QuestProgressCheck) => !!context.bossLocations[MiniBosses.CYCLOPS]}
}