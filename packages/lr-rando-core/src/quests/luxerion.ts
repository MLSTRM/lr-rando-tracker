import { MainQuestLine, PartialQuestProgress, QuestInfo, QuestStringStatus } from "./model";
import { MainQuests } from "../constants";
import { Alrick, Aremiah, Armand, Armena, Blythe, Dolce, Gem, Lackley, Lamont, Luka, Ranulph, Talbot, Virgil } from "../npcs/luxerion";

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
            "info_pieces": 9,
            "inquisitor_talk": true
        },
        handIn: "Inquisitor",
        sideQuestId: 12,
        sideQuestProgress: new Map([[1010,()=>({status: "In Progress", requirements: {"inquisitor_talk": true}})]])
    } as QuestInfo,
    "Where are you, Holmes?": {
        name: "Where are you, Holmes?",
        requirements: {
            "holmes_follow": true
        },
        trigger: "Thorton",
        handIn: "Thorton",
        sideQuestId: 2,
        sideQuestProgress: new Map([[1020,()=>({status: "In Progress", requirements: {"holmes_follow": true}})]])
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
        sideQuestId: 3,
        sideQuestProgress: new Map([[1010, (bytes) => ({status: "Accepted", requirements: { "clocks_checked": bytes[1]}})]]) //clocks on second byte
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
        sideQuestId: 4,
        sideQuestProgress: new Map([[1010, "Accepted"]]) //basic hand in
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
        sideQuestId: 5,
        sideQuestProgress: new Map([[1010, "Accepted"]]) //No chest register.
    } as QuestInfo,
    "Born from Chaos": {
        name: "Born from Chaos",
        requirements: {
            "key_tume": true
        },
        prerequisiteQuests: [
            "Lux_1_2"
        ],
        trigger: "Solandra",
        handIn: "Solandra",
        sideQuestId: 6,
        sideQuestProgress: new Map([[1010, "Accepted"]])
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
        sideQuestId: 7,
        sideQuestProgress: new Map([[1010, "Accepted"]])
    } as QuestInfo,
    "Faster Than Lightning": {
        name: "Faster Than Lightning",
        requirements: false,
        prerequisiteQuests: [
            "Lux_1_2"
        ],
        trigger: Lamont,
        sideQuestId: 8,
        sideQuestProgress: new Map([[1000, "Available"]]) //Stays available when race starts. annoying.
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
        sideQuestId: 9,
        sideQuestProgress: new Map([[1010, "Accepted"]])
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
        sideQuestId: 10,
        sideQuestProgress: new Map([
            [5, ()=>({status: "In Progress"})],
            [10, ()=>({status: "In Progress", requirements: {"purchase_day_1": true}})],
            [20, ()=>({status: "In Progress", requirements: {"purchase_day_2": true}})],
            [1000, ()=>({status: "In Progress", requirements: {"purchase_day_3": true}})]
        ]) //second byte is purchase number, third is day purchased on
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
        sideQuestId: 11,
        sideQuestProgress: new Map([[1010, "Accepted"], [1020, "In Progress"]])
    } as QuestInfo,
    "The Avid Reader": {
        name: "The Avid Reader",
        prerequisiteQuests: [
            "Lux_1_5"
        ],
        requirements: {
            "talk_mitka": true,
            "man_with_no_name": true,
            "key_l_syokai": true,
            "erine": true,
            "key_l_diary": true
        },
        sideQuestId: 13,
        failable: true,
        trigger: Ranulph,
        handIn: Ranulph,
        sideQuestProgress: new Map([
            [1010, "Accepted"],
            [1050, ()=>({status: 'In Progress', requirements: {"talk_mitka": true}})],
            [1060, ()=>({status: 'In Progress', requirements: {"man_with_no_name": true}})],
            [1070, ()=>({status: 'In Progress', requirements: {"erine": true}})],
            [1100, ()=>({status: "Failed"})],
            [9000, "Complete"] // TODO check this value to see if its different for TAR and TSTS
        ] as [number, QuestStringStatus | ((bytes: number[]) => PartialQuestProgress)][]) //1070 is 5am + either journal
    } as QuestInfo,
    "To Save the Sinless": {
        name: "To Save the Sinless",
        prerequisiteQuests: [
            "Lux_1_5",
            "Buried Passion"
        ],
        prerequisiteOther: [
            "buried_passion_plus_1_day" //second byte on buried passion
        ],
        requirements: {
            "key_l_diary_2": true,
            "ranulph": true,
            "armand": true,
            "Born from Chaos or Fuzzy Search": true,
            "armand_again": true,
            "reddick": true
        },
        sideQuestId: 13, //Uses same id as Avid Reader... Name is on 91.
        handIn: Ranulph,
        sideQuestProgress: new Map([
            [1100, ()=>({status: 'In Progress', requirements: {"ranulph": true}})],
            [1150, ()=>({status: 'In Progress', requirements: {"armand": true}})],
            [1200, ()=>({status: 'In Progress', requirements: {"armand_again": true}})],
            [2000, ()=>({status: 'In Progress', requirements: {"reddick": true}})],
            [9000, "Complete"] // Might be shared with TAR - how to determine?
        ] as [number, QuestStringStatus | ((bytes: number[]) => PartialQuestProgress)][])
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
        sideQuestId: 14,
        sideQuestProgress: new Map([
            [1100, "Accepted"],
            [1200, ()=>({status: 'In Progress', requirements: {"armand_return_1": true}})],
            [1300, ()=>({status: 'In Progress', requirements: {"armand_return_2": true}})],
            [9000, "Complete"]
        ] as [number, QuestStringStatus | ((bytes: number[]) => PartialQuestProgress)][]) //second byte used for save the sinless.
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
        sideQuestId: 15,
        sideQuestProgress: new Map([[9900, "Failed"], [9999, 'Missed']]) //Fails when you touch down from the ark on the next day.
    } as QuestInfo,
    "Stuck in a Gem": {
        name: "Stuck in a Gem",
        requirements: {
            "talk_to_stall": true,
            "key_l_kusa": true
        },
        trigger: Gem,
        handIn: "Ronan",
        sideQuestId: 16,
        sideQuestProgress: new Map([
            [1010, "Accepted"],
            [1020, ()=>({status: "In Progress", requirements: {"talk_to_stall": true}})]
        ] as [number, QuestStringStatus | ((bytes: number[]) => PartialQuestProgress)][])
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
        sideQuestId: 17,
        sideQuestProgress: new Map([
            [1010, "Accepted"],
            [1020, ()=>({status: "In Progress", requirements: {"maitre-d": true}})],
            [1030, ()=>({status: "In Progress", requirements: {"seila": true}})],
            //[1040, "graveyard"] //No real point having this here
        ] as [number, QuestStringStatus | ((bytes: number[]) => PartialQuestProgress)][])
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
        sideQuestId: 19,
        sideQuestProgress: new Map([[1010, "Accepted"]])
    } as QuestInfo,
    "Voices from the Grave": {
        name: "Voices from the Grave",
        requirements: {
            "talk_to_guard": true,
            "black_jacket_resident": true,
            "black_dress_woman": true,
            "white_brown_woman": true,
            "ghosts_found": 3
        },
        trigger: "Clock tower guard",
        sideQuestId: 20,
        sideQuestProgress: new Map([[1000, "Accepted"]]) //Doesn't seem to track state in the normal way...
    } as QuestInfo
}