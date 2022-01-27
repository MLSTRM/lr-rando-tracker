import { MainQuestPosition } from ".";
import { MainQuestProgressValues, QuestState } from "..";
import { Bosses, MainQuests, MiniBosses } from "../constants";
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
    sideQuestProgress?: Map<number, QuestStringStatus | ((bytes: number[]) => PartialQuestProgress)>;
    canvasByteIndex?: number,
    canvasByteOffset?: number;
}

export type QuestStringStatus = 'Available'|'Accepted'|'Missed'|'Failed'|'Complete'|'In Progress';

export interface PartialQuestProgress {
    status?: string;
    requirements?: QuestRequirement;
    prerequisiteOther?: QuestPrerequisite[];
}

export interface MainQuestLine {
    id: MainQuests;
    quests: { [key: string]: QuestInfo };
}

export interface QuestRequirement {
    [key: string]: true | number; //TODO: change key here to be KeyItem | Item | Event | Boss and define all events/bosses.
}

export interface EnrichedQuestRequirement {
    [key: string]: {
        required: true | number;
        current: boolean | number;
        oldName: string;
    };
}

export interface EnrichedQuestInfo {
    name: string;
    requirements: false | EnrichedQuestRequirement | EnrichedQuestRequirement[]
    prerequisiteQuests?: { name: string, complete: boolean }[], //narrow to quest ids/names
    prerequisiteOther?: { name: string, complete: boolean }[], //narrowed to specific list below
    trigger?: string | NpcAvailable; //narrow to only NpcAvailable struct
    handIn?: string | NpcAvailable;
}

export interface QuestProgressCheck {
    day: number;
    odin: number;
    hasObtained: { [key: string]: boolean };
    keyInventory: Map<string, number>;
    inventory: Map<string, number>;
    bossLocations: { [key in Bosses | MiniBosses]?: boolean };
    mainQuestProgress: MainQuestPosition;
    mainQuestBytes: MainQuestProgressValues;
    questState: { [key: string]: QuestState };
};

type QuestPrerequisite = keyof typeof QuestPrerequisites;

export const QuestPrerequisites: { [key: string]: { name: string; check: (context: Partial<QuestProgressCheck>) => boolean } } = {
    "time_day_1": { name: 'Day 1', check: context => (context.day ?? 0) >= 1 },
    "time_day_2": { name: 'Day 2', check: context => (context.day ?? 0) >= 2 },
    "time_day_3": { name: 'Day 3', check: context => (context.day ?? 0) >= 3 },
    "time_day_4": { name: 'Day 4', check: context => (context.day ?? 0) >= 4 },
    "time_day_5": { name: 'Day 5', check: context => (context.day ?? 0) >= 5 },
    "time_day_6": { name: 'Day 6', check: context => (context.day ?? 0) >= 6 },
    "time_day_7": { name: 'Day 7', check: context => (context.day ?? 0) >= 7 },
    "time_day_8": { name: 'Day 8', check: context => (context.day ?? 0) >= 8 },
    "time_day_9": { name: 'Day 9', check: context => (context.day ?? 0) >= 9 },
    "time_day_10": { name: 'Day 10', check: context => (context.day ?? 0) >= 10 },
    "odin_level_1": { name: 'Odin Level 1', check: context => (context.odin ?? 0) >= 120 },
    "odin_level_2": { name: 'Odin Level 2 (Glide)', check: context => (context.odin ?? 0) >= 250 },
    "odin_level_3": { name: 'Odin Full Heal', check: context => (context.odin ?? 0) >= 400 },
    "event_make_chocobull": { name: 'Make Chocobull', check: context => !!context.hasObtained?.['chocobull_cardesia'] },
    "event_harvest_gysahl": { name: 'Harvest Gysahl Greens', check: context => !!context.hasObtained?.['gysahl_field'] },
    "event_harvest_tantal": { name: 'Harvest Tantal Greens', check: context => !!context.hasObtained?.['tantal_field'] },
    "keyItem_boss_note": { name: 'Boss\'s Note', check: context => !!context.keyInventory?.get('key_y_shiji') },
    "keyItem_death_ticket": { name: 'Death Game Ticket', check: context => !!context.keyInventory?.get('key_y_death') },
    "keyItem_crux_body": { name: 'Crux Body', check: context => !!context.keyInventory?.get('key_d_wing') || (context.mainQuestBytes?.deaddunes ?? 0) >= 800 },
    "event_pickett_steal": { name: 'Pickett Steal', check: context => !!context.hasObtained?.['pickett_steal'] },
    "time_3h_after_fuzzy_search": { name: '3h after Fuzzy Search', check: context => context.questState?.['Fuzzy Search'] === QuestState.COMPLETED },
    "accept_rough_beast": { name: 'Accept What Rough Beast Slouches', check: context => (context.questState?.['What Rough Beast Slouches'] ?? 0) >= QuestState.STARTED_BLOCKED },
    "accept_old_rivals": { name: 'Accept Old Rivals', check: context => (context.questState?.['Old Rivals'] ?? 0) >= QuestState.STARTED_BLOCKED },
    "area_yusnaan": { name: 'Enter Yusnaan', check: context => (context.mainQuestBytes?.yusnaan ?? 0) >= 110 },
    "boss_{cyclops}": { name: 'Defeat Cyclops', check: context => !!context.bossLocations?.[MiniBosses.CYCLOPS] || (context.mainQuestBytes?.yusnaan ?? 0) >= 220 },
    "mq2_firework_hand_in": { name: 'Return Fireworks', check: context => (context.mainQuestBytes?.yusnaan ?? 0) >= 350 },
    "buried_passion_plus_1_day": { name: "Buried Passion (+1 day)", check: context => context.questState?.['Buried Passion'] === QuestState.COMPLETED }
}