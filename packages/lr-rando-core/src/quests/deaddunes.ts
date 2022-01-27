import { MainQuestLine, PartialQuestProgress, QuestInfo, QuestStringStatus } from "./model";
import { MainQuests } from "../constants";
import { Adonis, Elmer, Jamus, Nolan, Ramon, Tobias, Zanford } from "../npcs/deaddunes";

const Dead_4_1: QuestInfo = {
    name: "Bandits of the Desert",
    requirements: {
        "ruffian": true
    },
    handIn: Adonis
}

const Dead_4_2: QuestInfo = {
    name: "Aspiring Bandit",
    requirements: {
        "adonis_audition": true
    },
    handIn: Adonis
}

const Dead_4_3: QuestInfo = {
    name: "Where the Clavis Lies",
    requirements: false,
    handIn: "Sacred Gate"
}

const Dead_4_4: QuestInfo = {
    name: "Murals of the Gods",
    requirements: {
        "pilgrims_crux": 3,
        "tablet": 3,
        "crux_body": true,
        "crux_tip": true,
        "crux_base": true
    }
}

const Dead_4_5: QuestInfo = {
    name: "The Holy Clavis",
    requirements: false,
    handIn: "Defeat {Grendel}"
}

export const DeadDunesMainQuest= {
    Dead_4_1,
    Dead_4_2,
    Dead_4_3,
    Dead_4_4,
    Dead_4_5
};

export const DeadMainQuestCompletionValues: {[key: string]: {num: number; complete: number}} = {
    '4-1': {num: 1, complete: 0x12C},
    '4-2': {num: 2, complete: 0x1F4},
    '4-3': {num: 3, complete: 0x2BC},
    '4-4': {num: 4, complete: 0x3E8},
    '4-5': {num: 5, complete: 0x4B0}
};

export const DeadDunesSideQuests = {
    "The Life of a Machine": {
        name: "The Life of a Machine",
        requirements: {
            "key_d_oil": 3,
            "loot_skeles": true
        },
        prerequisiteQuests: [
            "Dead_4_3"
        ],
        trigger: "Bhakti",
        handIn: "Bhakti",
        sideQuestId: 41, //check
        sideQuestProgress: new Map([
            [1100, "Accepted"],
            // [1200, "return_oil"],
            // [1300, "open_door"]
        ] as [number, QuestStringStatus | ((bytes: number[]) => PartialQuestProgress)][])
    } as QuestInfo,
    "Old Rivals": {
        name: "Old Rivals",
        requirements: {
            "His Wife's Dream": true
        },
        trigger: Tobias,
        handIn: Tobias,
        sideQuestId: 42,
        sideQuestProgress: new Map([[1000, "Accepted"]])
    } as QuestInfo,
    "His Wife's Dream": {
        name: "His Wife's Dream",
        requirements: {
            "key_d_keisan": true
        },
        prerequisiteOther: [
            "accept_old_rivals"
        ],
        trigger: Ramon,
        handIn: Ramon,
        sideQuestId: 44,
        sideQuestProgress: new Map([[2000, "Accepted"]])
    } as QuestInfo,
    "Tool of the Trade": {
        name: "Tool of the Trade",
        requirements: {
            "key_d_lupe": true
        },
        trigger: Elmer,
        handIn: Elmer,
        sideQuestId: 45,
        sideQuestProgress: new Map([[1100, "Accepted"]])
    } as QuestInfo,
    "Adonis' Audition": {
        name: "Adonis' Audition",
        requirements: {
            "{gurangatch}": true
        },
        trigger: Adonis,
        handIn: Adonis,
        sideQuestId: 46,
        sideQuestProgress: new Map([
            [1000, "Accepted"],
            [9000, ()=>({requirements: {"{gurangatch}": true}})],
            [9100, "Complete"]
        ] as [number, QuestStringStatus | ((bytes: number[]) => PartialQuestProgress)][])
    } as QuestInfo,
    "What Rough Beast Slouches": {
        name: "What Rough Beast Slouches",
        requirements: {
            "key_d_niku": 1
        },
        prerequisiteQuests: [
            "Dead_4_3"
        ],
        trigger: Nolan,
        handIn: Nolan,
        sideQuestId: 47,
        sideQuestProgress: new Map([[1010, "Accepted"]])
    } as QuestInfo,
    "Skeletons in the Closet": {
        name: "Skeletons in the Closet",
        requirements: {
            "skeleton_omega": true
        },
        prerequisiteOther: [
            "keyItem_crux_body"
        ],
        prerequisiteQuests: [
            "Dead_4_3"
        ],
        trigger: Jamus,
        handIn: Jamus,
        sideQuestId: 48,
        sideQuestProgress: new Map([[1010, "Accepted"]])
    } as QuestInfo,
    "Last one Standing": {
        name: "Last one Standing",
        requirements: {
            "all_omegas": 31
        },
        trigger: Zanford,
        handIn: Zanford,
        sideQuestId: 49,
        sideQuestProgress: new Map([[1010, "Accepted"]])
    } as QuestInfo
};