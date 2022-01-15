import { MainQuestPosition, QuestNames, SideQuestProgress } from ".";
import { QuestState } from "..";
import { Areas, Bosses, MainQuests, MiniBosses } from "../constants";
import { KeyItem } from "../identifiers";
import { NpcAvailable } from "../model";

export interface QuestInfo {
    name: string;
    requirements: false | QuestRequirement | QuestRequirement[]
    prerequisiteQuests?: string[], //narrow to quest ids/names
    prerequisiteOther?: QuestPrerequisite[], //narrowed to specific list below
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
    quests: {[key: string]: QuestInfo};
}

export interface QuestRequirement {
    [key: string]: true | number; //TODO: change key here to be KeyItem | Item | Event | Boss and define all events/bosses.
}

export interface EnrichedQuestRequirement {
    [key: string]: {
        required: true | number;
        current: boolean | number
    };
}

export interface EnrichedQuestInfo {
    name: string;
    requirements: false | EnrichedQuestRequirement | EnrichedQuestRequirement[]
    prerequisiteQuests?: {name: string, complete: boolean}[], //narrow to quest ids/names
    prerequisiteOther?: {name: string, complete: boolean}[], //narrowed to specific list below
    trigger?: string | NpcAvailable; //narrow to only NpcAvailable struct
    handIn?: string | NpcAvailable;
}

export interface QuestProgressCheck {
    day: number;
    odin: number;
    hasObtained: {[key: string]: boolean};
    keyInventory: Map<string, number>;
    inventory: Map<string, number>;
    visited: {[key in Areas]?: boolean};
    bossLocations: {[key in Bosses | MiniBosses]?: boolean};
    mainQuestProgress: MainQuestPosition;
    mainQuestBytes: MainQuestPosition;
    questState: {[key: string]: QuestState};
};

type QuestPrerequisite = keyof typeof QuestPrerequisites;

export const QuestPrerequisites = {
    "time_day_1": {name: 'Day 1', check: (context: QuestProgressCheck) => context.day >= 1},
    "time_day_2": {name: 'Day 2', check: (context: QuestProgressCheck) => context.day >= 2},
    "time_day_3": {name: 'Day 3', check: (context: QuestProgressCheck) => context.day >= 3},
    "time_day_4": {name: 'Day 4', check: (context: QuestProgressCheck) => context.day >= 4},
    "time_day_5": {name: 'Day 5', check: (context: QuestProgressCheck) => context.day >= 5},
    "time_day_6": {name: 'Day 6', check: (context: QuestProgressCheck) => context.day >= 6},
    "time_day_7": {name: 'Day 7', check: (context: QuestProgressCheck) => context.day >= 7},
    "time_day_8": {name: 'Day 8', check: (context: QuestProgressCheck) => context.day >= 8},
    "time_day_9": {name: 'Day 9', check: (context: QuestProgressCheck) => context.day >= 9},
    "time_day_10": {name: 'Day 10', check: (context: QuestProgressCheck) => context.day >= 10},
    "odin_level_1": {name: 'Odin Level 1', check: (context: QuestProgressCheck) => context.odin >= 120},
    "odin_level_2": {name: 'Odin Level 2 (Glide)', check: (context: QuestProgressCheck) => context.odin >= 250},
    "odin_level_3": {name: 'Odin Full Heal', check: (context: QuestProgressCheck) => context.odin >= 400},
    "event_make_chocobull": {name: 'Make Chocobull', check: (context: QuestProgressCheck) => context.hasObtained['chocobull_cardesia']},
    "event_harvest_gysahl": {name: 'Harvest Gysahl Greens', check: (context: QuestProgressCheck) => context.hasObtained['gysahl_field']},
    "event_harvest_tantal": {name: 'Harvest Tantal Greens', check: (context: QuestProgressCheck) => context.hasObtained['tantal_field']},
    "keyItem_boss_note": {name: 'Boss\'s Note', check: (context: QuestProgressCheck) => !!context.keyInventory.get('key_y_shiji')},
    "keyItem_death_ticket": {name: 'Death Game Ticket', check: (context: QuestProgressCheck) => !!context.keyInventory.get('key_y_death')},
    "keyItem_crux_body": {name: 'Crux Body', check: (context: QuestProgressCheck) => !!context.keyInventory.get('key_d_wing') || context.mainQuestBytes.deaddunes >= 800},
    "event_pickett_steal": {name: 'Pickett Steal', check: (context: QuestProgressCheck) => context.hasObtained['pickett_steal']},
    "time_3h_after_fuzzy_search": {name: '3h after Fuzzy Search', check: (context: QuestProgressCheck) => true},
    "accept_rough_beast": {name: 'Accept What Rough Beast Slouches', check: (context: QuestProgressCheck) => context.questState['What Rough Beast Slouches'] >= 2},
    "accept_old_rivals": {name: 'Accept Old Rivals', check: (context: QuestProgressCheck) => context.questState['Old Rivals'] >= 2},
    "area_yusnaan": {name: 'Enter Yusnaan', check: (context: QuestProgressCheck) => context.mainQuestBytes.yusnaan >= 110},
    "boss_{cyclops}": {name: 'Defeat Cyclops', check: (context: QuestProgressCheck) => !!context.bossLocations[MiniBosses.CYCLOPS] || context.mainQuestBytes.yusnaan >= 220 },
    "mq2_firework_hand_in": {name: 'Return Fireworks', check: (context: QuestProgressCheck) => context.mainQuestBytes.yusnaan >= 350 }
}