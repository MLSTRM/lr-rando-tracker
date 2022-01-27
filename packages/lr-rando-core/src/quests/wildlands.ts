import { MainQuestLine, QuestInfo, QuestStringStatus } from "./model";
import { MainQuests } from "../constants";
import { Aryas_Chef, Brella, Cardesia, Cornelia, Dr_Gysahl, Dr_Sheep, Hopeful_Hunter, Hunter_Chief, Millie, Moggel, Moogle, Nadia, Old_Man, Professor, Research_Leader, Sarala, Taleb, Thirteen, Tilda } from "../npcs/wildlands";
import { PartialQuestProgress } from ".";

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
        "odin": 120
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
            "key_w_mori": true,
            "wandering_man": true,
            "give_fertiliser": true,
        },
        prerequisiteQuests: [
            "Wild_3_1"
        ],
        trigger: Sarala,
        handIn: Sarala,
        sideQuestId: 21,
        sideQuestProgress: new Map([
            [1050, "Accepted"],
            [1100, ()=>({requirements: {"wandering_man": true}})],
            [1200, ()=>({requirements: {"give_fertiliser": true}})]
        ] as [number, QuestStringStatus | ((bytes: number[]) => PartialQuestProgress)][])
    } as QuestInfo,
    "The Hunter's Challenge": {
        name: "The Hunter's Challenge",
        requirements: {
            "mat_z_004": 3,
            "hand_in": true,
            "mat_z_036": 1
        },
        prerequisiteQuests: [
            "Wild_3_1"
        ],
        trigger: Hunter_Chief,
        handIn: Hunter_Chief,
        sideQuestId: 22,
        sideQuestProgress: new Map([
            [2000, "Accepted"],
            [4000, ()=>({status: "In Progress", requirements: {"hand_in": true}})]
        ] as [number, QuestStringStatus | ((bytes: number[]) => PartialQuestProgress)][])
    } as QuestInfo,
    "A Final Cure": {
        name: "A Final Cure",
        requirements: {
            "make_chocobull": true,
            "second_option": true,
            "key_w_kino": 4,
            "key_w_kino2": 4,
            "key_w_mash": 1
        },
        prerequisiteQuests: [
            "Wild_3_1", //Not just this it seems
        ],
        prerequisiteOther: [
            "odin_level_1", //verify????
        ],
        trigger: Cardesia,
        handIn: Cardesia,
        sideQuestId: 23,
        sideQuestProgress: new Map([
            [1500, ()=>({status: 'Available'})],
            [2000, ()=>({requirements: {"make_chocobull": true}})],
            [3000, ()=>({requirements: {"second_option": true}})]
        ] as [number, QuestStringStatus | ((bytes: number[]) => PartialQuestProgress)][])
    } as QuestInfo,
    "Fuzzy Search": {
        name: "Fuzzy Search",
        requirements: {
            "start_herding": true,
            "herd_sheep": 3
        },
        trigger: Dr_Sheep,
        handIn: Dr_Sheep,
        sideQuestId: 24,
        sideQuestProgress: new Map([
            [1000, ()=>({status: "Accepted"} as PartialQuestProgress)],
            [2000, ()=>({status: "In Progress", requirements: {"start_herding": true}})],
            [3000, ()=>({requirements: {"herd_sheep": 1}})],
            [4000, ()=>({requirements: {"herd_sheep": 2}})],
            [5000, ()=>({requirements: {"herd_sheep": 3}})]
        ])
    } as QuestInfo, //Requirements: T, progress: Map<number, Partial<T>> assign value from map across based on main progress value (enriched by bytes?)
    "Round 'Em Up": {
        name: "Round 'Em Up",
        requirements: {
            "start_herding": true,
            "herd_sheep": 3,
            "sheep_return": true
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
        sideQuestId: 25,
        sideQuestProgress: new Map([
            [2000, ()=>({requirements: {"start_herding": true}} as PartialQuestProgress)],
            [3000, ()=>({requirements: {"herd_sheep": 1}})],
            [4000, ()=>({requirements: {"herd_sheep": 2}})],
            [5000, ()=>({requirements: {"herd_sheep": 3}})],
            [6000, ()=>({requirements: {"sheep_return": true}})]
        ])
    } as QuestInfo,
    "Chocobo Cheer": {
        name: "Chocobo Cheer",
        requirements: {
            "key_w_hana": 1
        },
        prerequisiteQuests: [
            "Wild_3_2"
        ],
        trigger: Nadia,
        handIn: Nadia,
        sideQuestId: 26,
        sideQuestProgress: new Map([[2000, "Accepted"], /*[3000, "eat flower"]*/])
    } as QuestInfo,
    "Peace and Quiet, Kupo": {
        name: "Peace and Quiet, Kupo",
        requirements: {
            "dryads": 3
        },
        trigger: Moogle,
        handIn: Moogle,
        sideQuestId: 27,
        sideQuestProgress: new Map([[3000, ()=>({requirements: {"dryads": 3}})]])
    } as QuestInfo,
    "Saving an Angel": {
        name: "Saving an Angel",
        requirements: {
            "key_w_yasai_t": true,
            "feed_greens": true,
            "odin": 120
        },
        prerequisiteQuests: [
            "Wild_3_1"
        ],
        sideQuestId: 28,
        sideQuestProgress: new Map([[3000, ()=>({requirements: {"feed_greens": true}})]])
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
        sideQuestId: 29,
        sideQuestProgress: new Map([[1100, "Accepted"], [1200,  ()=>({requirements: {"data_scans": 4}})]] as [number, QuestStringStatus | ((bytes: number[]) => PartialQuestProgress)][])
    } as QuestInfo,
    "The Old Man and the Field": {
        name: "The Old Man and the Field",
        requirements: {
            "key_w_yasai": 1,
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
        sideQuestId: 30,
        sideQuestProgress: new Map([
            [1100, ()=>({status: "Available"}) /*"plant_seed"*/],
            [2000, ()=>({prerequisiteOther: ["event_harvest_tantal"]})],
            [3000, "Accepted"]
        ] as [number, QuestStringStatus | ((bytes: number[]) => PartialQuestProgress)][])
    } as QuestInfo,
    "Land of Our Forbears": {
        name: "Land of Our Forbears",
        requirements: {
            "old_man": true,
            "sarala": true
        },
        prerequisiteQuests: [
            "The Old Man and The Field"
        ],
        trigger: Aryas_Chef,
        handIn: Aryas_Chef,
        sideQuestId: 31,
        sideQuestProgress: new Map([
            [1100, "Accepted"],
            [1500, ()=>({requirements: {"old_man": true}})],
            [2000, ()=>({requirements: {"sarala": true}})]
        ] as [number, QuestStringStatus | ((bytes: number[]) => PartialQuestProgress)][])
    } as QuestInfo,
    "A Taste of the Past": {
        name: "A Taste of the Past",
        requirements: {
            "key_w_mogura": 2,
            "key_w_apple": 2
        },
        prerequisiteQuests: [
            "Wild_3_2"
        ],
        trigger: Aryas_Chef,
        handIn: Aryas_Chef,
        sideQuestId: 32,
        sideQuestProgress: new Map([[2000, "Accepted"]])
    } as QuestInfo,
    "Dog, Doctor and Assistant": {
        name: "Dog, Doctor and Assistant",
        requirements: {
            "key_w_hana3": 4,
            "key_w_hana2": 2,
            "mat_z_015": 5,
            "heal_dog": true
        },
        prerequisiteQuests: [
            "Wild_3_2"
        ],
        trigger: Thirteen,
        handIn: Thirteen,
        sideQuestId: 33,
        sideQuestProgress: new Map([[2000, "Accepted"], [3000, "heal_dog"]])
    } as QuestInfo,
    "The Right Stuff": {
        name: "The Right Stuff",
        requirements: {
            "mat_z_001": 6
        },
        prerequisiteQuests: [
            "Wild_3_1"
        ],
        trigger: Hopeful_Hunter,
        handIn: Hopeful_Hunter,
        sideQuestId: 35,
        sideQuestProgress: new Map([[2000, "Accepted"]])
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
        sideQuestId: 36,
        sideQuestProgress: new Map([[2000, "Accepted"]])
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
        sideQuestId: 37,
        sideQuestProgress: new Map([
            [1500, "Accepted"],
            [2000, ()=>({requirements: {"yeet_moogle_1": true}})],
            [3000, ()=>({requirements: {"yeet_moogle_2": true}})],
            [4000, ()=>({requirements: {"yeet_moogle_3": true}})]
        ] as [number, QuestStringStatus | ((bytes: number[]) => PartialQuestProgress)][])
    } as QuestInfo,
    "Mercy of a Goddess": {
        name: "Mercy of a Goddess",
        requirements: {
            "key_w_hiyaku": true
        },
        prerequisiteQuests: [
            'A Final Cure'
        ],
        trigger: Taleb,
        handIn: Taleb,
        sideQuestId: 38,
        sideQuestProgress: new Map([
            [1500, "Accepted"],
            //[2000, "cure"]
        ])
    } as QuestInfo,
    "The Grail of Valhalla": {
        name: "The Grail of Valhalla",
        requirements: {
            "key_w_moji1": true,
            "key_w_moji2": true,
            "give_glyphs": true,
            "poltae_panel": true,
            "key_w_buhin1": true,
            "key_w_buhin2": true,
            "key_w_buhin3": true
        },
        trigger: Professor,
        handIn: Professor,
        sideQuestId: 39,
        sideQuestProgress: new Map([
            [2000, "Accepted"],
            [3000, ()=>({requirements: {"give_glyphs": true}})],
            [4000, ()=>({requirements: {"poltae_panel": true}})],
            //[5000, "key_w_buhin1"],
            //[6000, "key_w_buhin2"],
            //[7000, "key_w_buhin3"]
        ] as [number, QuestStringStatus | ((bytes: number[]) => PartialQuestProgress)][])
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
        sideQuestId: 40,
        sideQuestProgress: new Map([[900, ()=>({status: "Available"})], [1000, ()=>({status: "Accepted"})]])
    } as QuestInfo,
    "Killing Time": {
        name: "Killing Time",
        requirements: false,
        prerequisiteOther: [
            "odin_level_2"
        ],
        handIn: "Poltae Ledge",
        sideQuestId: 81,
        sideQuestProgress: new Map([[1200, "Accepted"]])
    } as QuestInfo,
    "Matchmaker": {
        name: "Matchmaker",
        requirements: {
            "key_w_hana2": 4,
            "key_w_mogura": 2,
            "mat_z_008": 5,
            "give_to_tilda": true
        },
        prerequisiteQuests: [
            "Dog, Doctor and Assistant",
            "Round 'Em Up"
        ],
        trigger: Tilda,
        handIn: Dr_Sheep, // No time restriction on this hand in?
        sideQuestId: 82,
        sideQuestProgress: new Map([
            [1500, "Accepted"],
            [2000, ()=>({requirements: {"give_to_tilda": true}})]
        ] as [number, QuestStringStatus | ((bytes: number[]) => PartialQuestProgress)][])
    } as QuestInfo,
    "Mother and Daughter": {
        name: "Mother and Daughter",
        requirements: {
            "dog_doctor_assistant": true,
            "tilda_dog_scene": true
        },
        trigger: Brella,
        handIn: Brella,
        sideQuestId: 83,
        sideQuestProgress: new Map([
            [2000, "Accepted"],
            [3000, ()=>({requirements: {"tilda_dog_scene": true}})]
        ] as [number, QuestStringStatus | ((bytes: number[]) => PartialQuestProgress)][])
    } as QuestInfo
}