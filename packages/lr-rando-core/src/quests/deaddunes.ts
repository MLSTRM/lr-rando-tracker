import { MainQuestLine, QuestInfo } from "./model";
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
            "bhakti_oil": 3,
            "loot_skeles": true
        },
        prerequisiteQuests: [
            "Dead_4_3"
        ],
        trigger: "Bhakti",
        handIn: "Bhakti"
    } as QuestInfo,
    "Old Rivals": {
        name: "Old Rivals",
        requirements: {
            "his_wifes_dream": true
        },
        trigger: Tobias,
        handIn: Tobias
    } as QuestInfo,
    "His Wife's Dream": {
        name: "His Wife's Dream",
        requirements: {
            "pilgrims_crux": 1,
            "arithmometer": true
        },
        prerequisiteQuests: [
            "started_Old Rivals"
        ],
        trigger: Ramon,
        handIn: Ramon
    } as QuestInfo,
    "Tool of the Trade": {
        name: "Tool of the Trade",
        requirements: {
            "loupe": true
        },
        trigger: Elmer,
        handIn: Elmer
    } as QuestInfo,
    "Adonis' Audition": {
        name: "Adonis' Audition",
        requirements: {
            "{gurangatch}": true
        },
        trigger: Adonis,
        handIn: Adonis
    } as QuestInfo,
    "What Rough Beast Slouches": {
        name: "What Rough Beast Slouches",
        requirements: {
            "monster_flesh": 1
        },
        prerequisiteQuests: [
            "Dead_4_3"
        ],
        trigger: Nolan,
        handIn: Nolan
    } as QuestInfo,
    "Skeletons in the Closet": {
        name: "Skeletons in the Closet",
        requirements: {
            "skeleton_omega": true
        },
        prerequisiteQuests: [
            "Dead_4_3",
            "keyItem_crux_body"
        ],
        trigger: Jamus,
        handIn: Jamus
    } as QuestInfo,
    "Last one Standing": {
        name: "Last one Standing",
        requirements: {
            "all_omegas": 31
        },
        trigger: Zanford,
        handIn: Zanford
    } as QuestInfo
};