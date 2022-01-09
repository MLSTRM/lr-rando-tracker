import { MainQuestLine, QuestInfo } from "./model";
import { MainQuests } from "../constants";
import { Alrick, Aremiah, Armand, Armena, Blythe, Dolce, Gem, Lackley, Lamont, Luka, Talbot, Virgil } from "../npcs/luxerion";

const Lux_1_1: QuestInfo = {
    name: "An Evil Savior",
    requirements: false,
    prerequisiteQuests: [
        "Wither Faith",
        "Where are you Holmes?"
    ],
    handIn: "Inquisitor",
}

const Lux_1_2: QuestInfo = {
    name: "In the Shadow of the Heretics",
    requirements: false,
    handIn: "Answer the Phone"
}

const Lux_1_3: QuestInfo = {
    name: "Find the Code",
    requirements: [
        {
            "code_1": 9,
            "code_2": 9,
            "code_3": 9,
            "code_4": 9,
        },
        {
            "force_through": true
        }
    ],
    handIn: "Code or Fight",
}

const Lux_1_4: QuestInfo = {
    name: "Rites for a Goddess",
    requirements: false,
    handIn: "Approach the gathering"
}

const Lux_1_5: QuestInfo = {
    name: "Hunter in Light and Shadow",
    requirements: [
        {
            "key_bajji": true
        },
        {
            "force_through": true
        }
    ],
    handIn: "Defeat {Noel}"
}

export const LuxerionMainQuest = {
    Lux_1_1,
    Lux_1_2,
    Lux_1_3,
    Lux_1_4,
    Lux_1_5
};

export const LuxMainQuestCompletionValues: {[key: string]: {num: number; complete: number}} = {
    '1-1': {num: 1, complete: 0x28},
    '1-2': {num: 2, complete: 0x64},
    '1-3': {num: 3, complete: 0x226},
    '1-4': {num: 4, complete: 0x258},
    '1-5': {num: 5, complete: 0x320}
};

export const LuxerionSideQuests = {
    "Whither Faith": {
        name: "Whither Faith",
        requirements: {
            "info_pieces": 9
        },
        handIn: "Inquisitor",
        sideQuestId: 12
    } as QuestInfo,
    "Where are you, Holmes?": {
        name: "Where are you, Holmes?",
        requirements: {
            "holmes_follow": true
        },
        trigger: "Thorton",
        handIn: "Thorton",
        sideQuestId: 2
    } as QuestInfo,
    "The Things She's Lost": {
        name: "The Things She's Lost",
        requirements: [
            {
                "key_kb_g": true
            },
            {
                "key_kb_r": true
            }
        ],
        trigger: Dolce,
        handIn: Dolce,
        sideQuestId: 1
    } as QuestInfo,
    "Like Clockwork": {
        name: "Like Clockwork",
        requirements: {
            "clocks_checked": 13
        },
        prerequisiteQuests: [
            "Lux_1_4"
        ],
        handIn: Armena,
        trigger: Armena,
        sideQuestId: 3
    } as QuestInfo,
    "Dying Wish": {
        name: "Dying Wish",
        requirements: {
            "key_niku": true,
            "key_ninjin": true,
            "key_j_kino": true,
            "key_sp_bt": true
        },
        prerequisiteQuests: [
            "Lux_1_2"
        ],
        trigger: Blythe,
        handIn: Blythe,
        sideQuestId: 4
    } as QuestInfo,
    "Suspicious Spheres": {
        name: "Suspicious Spheres",
        requirements: {
            "locked_chest_1": true,
            "locked_chest_2": true,
            "locked_chest_3": true
        },
        prerequisiteQuests: [
            "Lux_1_2"
        ],
        trigger: Virgil,
        handIn: Virgil,
        sideQuestId: 5
    } as QuestInfo,
    "Born from Chaos": {
        name: "Born from Chaos",
        requirements: {
            "{zomok}": true
        },
        prerequisiteQuests: [
            "Lux_1_2"
        ],
        trigger: "Solandra",
        handIn: "Solandra",
        sideQuestId: 6
    } as QuestInfo,
    "Soul Seeds": {
        name: "Soul Seeds",
        requirements: {
            "key_sm_lt": true,
            "key_soulcd": true
        },
        prerequisiteQuests: [
            "Lux_1_2"
        ],
        trigger: "Baird",
        handIn: "Baird",
        sideQuestId: 7
    } as QuestInfo,
    "Faster Than Lightning": {
        name: "Faster Than Lightning",
        requirements: false,
        prerequisiteQuests: [
            "Lux_1_2"
        ],
        trigger: Lamont,
        sideQuestId: 8
    } as QuestInfo,
    "Treasured Ball": {
        name: "Treasured Ball",
        requirements: {
            "key_ball": true
        },
        prerequisiteQuests: [
            "Lux_1_5"
        ],
        trigger: Talbot,
        handIn: Talbot,
        sideQuestId: 9
    } as QuestInfo,
    "The Angel's Tears": {
        name: "The Angel's Tears",
        requirements: {
            "purchase_day_1": true,
            "purchase_day_2": true,
            "purcahse_day_3": true
        },
        prerequisiteQuests: [
            "Lux_1_2"
        ],
        trigger: Luka,
        handIn: Luka,
        sideQuestId: 10
    } as QuestInfo,
    "The Saint's Stone": {
        name: "The Saint's Stone",
        requirements: {
            "key_l_kawa": true
        },
        trigger: Aremiah,
        handIn: Aremiah,
        prerequisiteQuests: [
            "Lux_1_5"
        ],
        sideQuestId: 11
    } as QuestInfo,
    "The Avid Reader": {
        name: "The Avid Reader",
        requirements: false, //TODO this one is a mess
        sideQuestId: 13
    } as QuestInfo,
    "To Save the Sinless": {
        name: "To Save the Sinless",
        requirements: false, //TODO So is this one
        sideQuestId: 91
    } as QuestInfo,
    "Buried Passion": {
        name: "Buried Passion",
        requirements: {
            "armand_return_1": true,
            "armand_return_2": true,
            "armand_return_3": true,
            "key_l_pen": true
        },
        prerequisiteQuests: [
            "Lux_1_5"
        ],
        trigger: Armand,
        handIn: Armand,
        sideQuestId: 14
    } as QuestInfo,
    "The Girl Who Cried Wolf": {
        name: "The Girl Who Cried Wolf",
        requirements: {
            "graveyard_phone": true,
            "south_phone": true,
            "old_town_phone": true
        },
        prerequisiteQuests: [
            "Lux_1_5"
        ],
        trigger: "North_station_phone",
        handIn: "Louise",
        sideQuestId: 15
    } as QuestInfo,
    "Stuck in a Gem": {
        name: "Stuck in a Gem",
        requirements: {
            "key_l_kusa": true
        },
        trigger: Gem,
        handIn: "Ronan",
        sideQuestId: 16
    } as QuestInfo,
    "Get the Girl": {
        name: "Get the Girl",
        requirements: {
            "key_l_ling": true,
            "maitre-d": true,
            "seila": true
        },
        prerequisiteQuests: [
            "Lux_1_5"
        ],
        trigger: Lackley,
        handIn: "Seila",
        sideQuestId: 17
    } as QuestInfo,
    "A Rose by Any Other Name": {
        name: "A Rose by Any Other Name",
        requirements: {
            "key_l_hana": true
        },
        prerequisiteQuests: [
            "Lux_1_5"
        ],
        trigger: Alrick,
        handIn: Alrick,
        sideQuestId: 19
    } as QuestInfo,
    "Voices from the Grave": {
        name: "Voices from the Grave",
        requirements: {
            "black_jacket_resident": true,
            "black_dress_woman": true,
            "white_brown_woman": true,
            "ghosts_found": 3
        },
        trigger: "Clock tower guard",
        sideQuestId: 20
    } as QuestInfo
}