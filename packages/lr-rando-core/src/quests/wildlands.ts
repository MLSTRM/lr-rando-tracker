import { MainQuestLine, QuestInfo } from "./model";
import { MainQuests } from "../constants";
import { Aryas_Chef, Brella, Cardesia, Cornelia, Dr_Gysahl, Dr_Sheep, Hopeful_Hunter, Hunter_Chief, Millie, Moggel, Moogle, Nadia, Old_Man, Professor, Research_Leader, Sarala, Taleb, Thirteen, Tilda } from "../npcs/wildlands";

const Wild_3_1: QuestInfo = {
    name: "The Angel of Valhalla",
    requirements: {
        "gysahl_talk": true,
        "{chocobo_eater}": true
    },
    handIn: Dr_Gysahl
}

const Wild_3_2: QuestInfo = {
    name: "Healing an Angel",
    requirements: {
        "saving_an_angel": true,
        "chocobo_healing": 120
    }
}

const Wild_3_3_interlude: QuestInfo = {
    name: "Chocobo glide",
    requirements: {
        "chocobo_healing": 250
    }
}

const Wild_3_3: QuestInfo = {
    name: "Where Chaos Sleeps",
    requirements: false,
    handIn: "Defeat {caius}"
}

export const WildlandsMainQuest = {
    Wild_3_1,
    Wild_3_2,
    Wild_3_3_interlude,
    Wild_3_3
};

export const WildMainQuestCompletionValues: {[key: string]: {num: number; complete: number; completeSecond: number}} = {
    '3-1': {num: 1, complete: 0x23, completeSecond: 0x1E},
    '3-2': {num: 2, complete: 0x28, completeSecond: 0x28},
    '3-3': {num: 3, complete: 0x5A, completeSecond: 0x3E8},
};

export const WildlandsSideQuests = {
    "A Father's Request": {
        name: "A Father's Request",
        requirements: {
            "fertilizer": true,
            "wandering_man": true
        },
        prerequisiteQuests: [
            "Wild_3_1"
        ],
        trigger: Sarala,
        handIn: Sarala,
        sideQuestId: 21
    } as QuestInfo,
    "The Hunter's Challenge": {
        name: "The Hunter's Challenge",
        requirements: {
            "monster_mince": 3,
            "hand_in": true,
            "amp_chip": 1
        },
        prerequisiteQuests: [
            "Wild_3_1"
        ],
        trigger: Hunter_Chief,
        handIn: Hunter_Chief,
        sideQuestId: 22
    } as QuestInfo,
    "A Final Cure": {
        name: "A Final Cure",
        requirements: {
            "chocoborels": 4,
            "luminous_mushrooms": 4,
            "crimm_mushroom": 1,
            "second_option": true
        },
        prerequisiteQuests: [
            "Wild_3_1",
        ],
        prerequisiteOther: [
            "event_make_chocobull"
        ],
        trigger: Cardesia,
        handIn: Cardesia,
        sideQuestId: 23
    } as QuestInfo,
    "Fuzzy Search": {
        name: "Fuzzy Search",
        requirements: {
            "herd_sheep": 3
        },
        trigger: Dr_Sheep,
        handIn: Dr_Sheep,
        sideQuestId: 24
    } as QuestInfo,
    "Round 'Em Up": {
        name: "Round 'Em Up",
        requirements: {
            "herd_sheep": 3
        },
        prerequisiteQuests: [
            "Fuzzy Search",
            "Wild_3_2"
        ],
        prerequisiteOther: [
            "time_3h_after_fuzzy_search",
        ],
        trigger: Dr_Sheep,
        handIn: Millie,
        sideQuestId: 25
    } as QuestInfo,
    "Chocobo Cheer": {
        name: "Chocobo Cheer",
        requirements: {
            "yeuls_flower": 1
        },
        prerequisiteQuests: [
            "Wild_3_2"
        ],
        trigger: Nadia,
        handIn: Nadia,
        sideQuestId: 26
    } as QuestInfo,
    "Peace and Quiet, Kupo": {
        name: "Peace and Quiet, Kupo",
        requirements: {
            "dryads": 3
        },
        trigger: Moogle,
        handIn: Moogle,
        sideQuestId: 27
    } as QuestInfo,
    "Saving an Angel": {
        name: "Saving an Angel",
        requirements: {
            "chocobo_healing": 120
        },
        prerequisiteQuests: [
            "Wild_3_1"
        ],
        sideQuestId: 28
    } as QuestInfo,
    "Omega Point": {
        name: "Omega Point",
        requirements: {
            "data_scans": 4
        },
        prerequisiteQuests: [
            "Wild_3_2",
        ],
        prerequisiteOther: [
            "odin_level_2"
        ],
        trigger: Research_Leader,
        handIn: Research_Leader,
        sideQuestId: 29
    } as QuestInfo,
    "The Old Man and the Field": {
        name: "The Old Man and the Field",
        requirements: {
            "gysahl_greens": 1,
        },
        prerequisiteQuests: [
            "A Father's Request",
        ],
        prerequisiteOther: [
            "event_harvest_gysahl",
            "event_harvest_tantal"
        ],
        trigger: Old_Man,
        handIn: Old_Man,
        sideQuestId: 30
    } as QuestInfo,
    "Land of Our Forbears": {
        name: "Land of Our Forbears",
        requirements: {
            "talk_to_old_man": true,
            "talk_to_sarala": true
        },
        prerequisiteQuests: [
            "The Old Man and The Field"
        ],
        trigger: Aryas_Chef,
        handIn: Aryas_Chef,
        sideQuestId: 31
    } as QuestInfo,
    "A Taste of the Past": {
        name: "A Taste of the Past",
        requirements: {
            "rocky_crag_mole": 2,
            "aryas_apple": 2
        },
        prerequisiteQuests: [
            "Wild_3_2"
        ],
        trigger: Aryas_Chef,
        handIn: Aryas_Chef,
        sideQuestId: 32
    } as QuestInfo,
    "Dog, Doctor and Assistant": {
        name: "Dog, Doctor and Assistant",
        requirements: {
            "dayring_blossom": 4,
            "moonsoul_bloom": 2,
            "goopy_goo": 5,
            "heal_dog": true
        },
        prerequisiteQuests: [
            "Wild_3_2"
        ],
        trigger: Thirteen,
        handIn: Thirteen,
        sideQuestId: 33
    } as QuestInfo,
    "The Right Stuff": {
        name: "The Right Stuff",
        requirements: {
            "vibrant_ooze": 6
        },
        prerequisiteQuests: [
            "Wild_3_1"
        ],
        trigger: Hopeful_Hunter,
        handIn: Hopeful_Hunter,
        sideQuestId: 35
    } as QuestInfo,
    "The Secret Lives of Sheep": {
        name: "The Secret Lives of Sheep",
        requirements: {
            "lead_to_ruins": true
        },
        prerequisiteQuests: [
            "Round 'Em Up"
        ],
        trigger: Cornelia,
        sideQuestId: 36
    } as QuestInfo,
    "Where Are You, Moogle?": {
        name: "Where Are You, Moogle?",
        requirements: {
            "yeet_moogle_1": true,
            "yeet_moogle_2": true,
            "yeet_moogle_3": true
        },
        prerequisiteQuests: [
            "Peace and Quiet, Kupo"
        ],
        trigger: Moggel,
        handIn: Moggel,
        sideQuestId: 37
    } as QuestInfo,
    "Mercy of a Goddess": {
        name: "Mercy of a Goddess",
        requirements: {
            "cardesias_cure": true
        },
        trigger: Taleb,
        handIn: Taleb,
        sideQuestId: 38
    } as QuestInfo,
    "The Grail of Valhalla": {
        name: "The Grail of Valhalla",
        requirements: {
            "goddess_glyphs": true,
            "chaos_glyps": true,
            "poltae_panels": 4
        },
        trigger: Professor,
        handIn: Professor,
        sideQuestId: 39
    } as QuestInfo,
    "To Live in Chaos": {
        name: "To Live in Chaos",
        requirements: {
            "{chocobo_eater}": true
        },
        prerequisiteQuests: [
            "Wild_3_3",
        ],
        prerequisiteOther: [
            "odin_level_3"
        ],
        trigger: "Station",
        sideQuestId: 40
    } as QuestInfo,
    "Killing Time": {
        name: "Killing Time",
        requirements: false,
        prerequisiteOther: [
            "odin_level_2"
        ],
        handIn: "Poltae Ledge",
        sideQuestId: 81
    } as QuestInfo,
    "Matchmaker": {
        name: "Matchmaker",
        requirements: {
            "moonsoul_bloom": 4,
            "rocky_crag_mole": 2,
            "green_leather": 5,
            "give_to_tilda": true
        },
        prerequisiteQuests: [
            "Dog, Doctor and Assistant",
            "Round 'Em Up"
        ],
        trigger: Tilda,
        handIn: Dr_Sheep,
        sideQuestId: 82
    } as QuestInfo,
    "Mother and Daughter": {
        name: "Mother and Daughter",
        requirements: {
            "dog_doctor_assistant": true,
            "tilda_dog_scene": true
        },
        trigger: Brella,
        handIn: Brella,
        sideQuestId: 83
    } as QuestInfo
}