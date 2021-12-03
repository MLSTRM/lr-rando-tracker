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
            "crest_of_etro": true
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
    '1-1': {num: 1, complete: 0x00},
    '1-2': {num: 2, complete: 0x28},
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
        handIn: "Inquisitor"
    } as QuestInfo,
    "Where are you, Holmes?": {
        name: "Where are you, Holmes?",
        requirements: {
            "holmes_follow": true
        },
        trigger: "Thorton",
        handIn: "Thorton"
    } as QuestInfo,
    "The Things She's Lost": {
        name: "The Things She's Lost",
        requirements: {
            "red_carbuncle_doll": true
        },
        trigger: Dolce,
        handIn: Dolce
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
        trigger: Armena
    } as QuestInfo,
    "Dying Wish": {
        name: "Dying Wish",
        requirements: {
            "shaolong_gui_shell": true,
            "mandragora_root": true,
            "thunderclap_cap": true,
            "spectral_elixir": true
        },
        prerequisiteQuests: [
            "Lux_1_2"
        ],
        trigger: Blythe,
        handIn: Blythe
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
        handIn: Virgil
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
        handIn: "Solandra"
    } as QuestInfo,
    "Soul Seeds": {
        name: "Soul Seeds",
        requirements: {
            "soul_seed": true
        },
        prerequisiteQuests: [
            "Lux_1_2"
        ],
        trigger: "Baird",
        handIn: "Baird"
    } as QuestInfo,
    "Faster Than Lightning": {
        name: "Faster Than Lightning",
        requirements: false,
        prerequisiteQuests: [
            "Lux_1_2"
        ],
        trigger: Lamont
    } as QuestInfo,
    "Treasured Ball": {
        name: "Treasured Ball",
        requirements: {
            "rubber_ball": true
        },
        prerequisiteQuests: [
            "Lux_1_5"
        ],
        trigger: Talbot,
        handIn: Talbot
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
        handIn: Luka
    } as QuestInfo,
    "The Saint's Stone": {
        name: "The Saint's Stone",
        requirements: {
            "crystal_shard": true
        },
        trigger: Aremiah,
        handIn: Aremiah,
        prerequisiteQuests: [
            "Lux_1_5"
        ]
    } as QuestInfo,
    "The Avid Reader": {
        name: "The Avid Reader",
        requirements: false //TODO this one is a mess
    } as QuestInfo,
    "To Save the Sinless": {
        name: "To Save the Sinless",
        requirements: false //TODO So is this one
    } as QuestInfo,
    "Buried Passion": {
        name: "Buried Passion",
        requirements: {
            "armand_return_1": true,
            "armand_return_2": true,
            "armand_return_3": true,
            "quill_pen": true
        },
        prerequisiteQuests: [
            "Lux_1_5"
        ],
        trigger: Armand,
        handIn: Armand
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
        handIn: "Louise"
    } as QuestInfo,
    "Stuck in a Gem": {
        name: "Stuck in a Gem",
        requirements: {
            "starlit_spice": true
        },
        trigger: Gem,
        handIn: "Ronan"
    } as QuestInfo,
    "Get the Girl": {
        name: "Get the Girl",
        requirements: {
            "lackleys_ring": true,
            "maitre-d": true,
            "seila": true
        },
        prerequisiteQuests: [
            "Lux_1_5"
        ],
        trigger: Lackley,
        handIn: "Seila"
    } as QuestInfo,
    "A Rose by Any Other Name": {
        name: "A Rose by Any Other Name",
        requirements: {
            "phantom_rose": true
        },
        prerequisiteQuests: [
            "Lux_1_5"
        ],
        trigger: Alrick,
        handIn: Alrick
    } as QuestInfo,
    "Voices from the Grave": {
        name: "Voices from the Grave",
        requirements: {
            "black_jacket_resident": true,
            "black_dress_woman": true,
            "white_brown_woman": true,
            "ghosts_found": 3
        },
        trigger: "Clock tower guard"
    } as QuestInfo
}