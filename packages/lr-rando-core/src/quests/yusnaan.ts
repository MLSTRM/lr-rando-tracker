import { MainQuestLine, PartialQuestProgress, QuestInfo, QuestStringStatus } from "./model";
import { MainQuests } from "../constants";
import { Berdy, Biggs, Candice, DrunkPyro, Funicula, Gordon_Gourmet, Gregory, Lennet, Lennet_Date, Morris, Olga, Primrose, Seedy_Owner, Tanbam, Tomesso, Velno, Zoe } from "../npcs/yusnaan";

const Yus_2_1: QuestInfo = {
    name: "The Great Break-In",
    requirements: {
            "key_y_ticket": true,
            "{cyclops}": true,
            "key_y_id": true
    },
    handIn: "Augur's Quarter"
}

const Yus_2_2: QuestInfo = {
    name: "The Legend of the Savior",
    requirements: {
        "key_y_shiji": true,
        "key_y_fire": 10,
        "hand_in_fireworks": true,
        "cos_fa00": true,
    },
    trigger: "Sarzhak",
    handIn: "Sarzhak"
}

const Yus_2_3: QuestInfo = {
    name: "Solitary Patron",
    requirements: {
        "key_y_serap": true
    },
    handIn: "Defeat {Snow}"
}

export const YusnaanMainQuest = {
        Yus_2_1,
        Yus_2_2,
        Yus_2_3
};

export const YusMainQuestCompletionValues: {[key: string]: {num: number; complete: number}} = {
    '0-1': {num: 0, complete: 0x5A},
    '2-1': {num: 1, complete: 0x136},
    '2-2': {num: 2, complete: 0x190},
    '2-3': {num: 3, complete: 0x2BC},
};

export const YusnaanSideQuests = {
    "Fireworks in a Bottle": {
        name: "Fireworks in a Bottle",
        requirements: {
            "key_y_sake": true
        },
        prerequisiteQuests: [
            "Yus_2_1",
        ],
        prerequisiteOther: [
            "keyItem_boss_note"
        ],
        trigger: DrunkPyro,
        handIn: DrunkPyro,
        sideQuestId: 61,
        sideQuestProgress: new Map([[1100, "Accepted"]])
    } as QuestInfo,
    "The Fighting Actress": {
        name: "The Fighting Actress",
        requirements: {
            "match_1": true,
            "match_2": true,
            "match_3": true
        },
        prerequisiteQuests: [
            'Yus_2_1'
        ],
        prerequisiteOther: [
            "keyItem_boss_note",
            "mq2_firework_hand_in"
        ],
        trigger: Zoe,
        sideQuestId: 62,
        sideQuestProgress: new Map([[1100, "Accepted"]]) //Match is on second byte. Gremlin=1, anubys=2, zaltys=3
    } as QuestInfo,
    "Songless Diva": {
        name: "Songless Diva",
        requirements: {
            "berdy_talk": true,
            "key_y_kaban": true,
        },
        trigger: Olga,
        handIn: Berdy,
        sideQuestId: 63,
        sideQuestProgress: new Map([[1100, "Accepted"]]) // no berdy talk index. On completion second byte holds day?
    } as QuestInfo,
    "Stolen Things": {
        name: "Stolen Things",
        requirements: {
            "key_y_letter": true,
            "pickett_steal_letter": true
        },
        prerequisiteOther: [
            // Done when status = 1000
            "event_pickett_steal"
        ],
        trigger: Gregory,
        handIn: Gregory,
        sideQuestId: 64,
        sideQuestProgress: new Map([
            [1000, ()=>({status: "Available", requirements: {"event_pickett_steal": true}} as PartialQuestProgress)],
            [2000, ()=>({status: "In Progress", requirements: {"key_y_letter": true}} as PartialQuestProgress)],
            [3000, ()=>({status: "In Progress", requirements: {"pickett_steal_letter": true}} as PartialQuestProgress)]
        ])
    } as QuestInfo,
    "Fireworks for a Steal": {
        name: "Fireworks for a Steal",
        requirements: {
            "{skatane}": true,
            "return_fireworks": true
        },
        prerequisiteQuests: [
            "Yus_2_1",
        ],
        prerequisiteOther: [
            "keyItem_boss_note"
        ],
        trigger: Funicula,
        handIn: Funicula,
        sideQuestId: 65,
        sideQuestProgress: new Map([
            [1500, "Accepted"],
            [2000, ()=>({status: "In Progress", requirements: {"{skatane}": true}} as PartialQuestProgress)],
            [3000, ()=>({status: "In Progress", requirements: {"return_fireworks": true}} as PartialQuestProgress)]
        ] as [number, QuestStringStatus | ((bytes: number[]) => PartialQuestProgress)][])
    } as QuestInfo,
    "A Testing Proposition": {
        name: "A Testing Proposition",
        requirements: {
            "initial_cutscene": true,
            "get_nektar": true,
            "use_nektar": true,
            "get_nektar_2": true,
            "use_nektar_2": true,
            "get_miracle_nektar": true,
            "use_miracle_nektar": true,
            "get_nektar_gods": true,
            "slaughterhouse_demo": true
        },
        trigger: Velno,
        handIn: Velno,
        sideQuestId: 66,
        sideQuestProgress: new Map([
            [1500, ()=>({status: "Accepted", requirements: {"initial_cutscene": true}} as PartialQuestProgress)],
            [2000, ()=>({status: "In Progress", requirements: {"get_nektar": true}} as PartialQuestProgress)],
            [3000, ()=>({status: "In Progress", requirements: {"get_nektar_2": true}} as PartialQuestProgress)],
            [4000, ()=>({status: "In Progress", requirements: {"get_miracle_nektar": true}} as PartialQuestProgress)],
            [5000, ()=>({status: "In Progress", requirements: {"get_nektar_gods": true}} as PartialQuestProgress)]
        ])
    } as QuestInfo,
    "Last Date": {
        name: "Last Date",
        requirements: {
            "do_the_date": true
        },
        prerequisiteQuests: [
            "Yus_2_3"
        ],
        trigger: Lennet,
        handIn: Lennet_Date,
        sideQuestId: 67,
        sideQuestProgress: new Map([[1100, "Accepted"]]) //Second short for day of date
    } as QuestInfo,
    "Free Will": {
        name: "Free Will",
        requirements: {
            "return_24h": true,
            "key_y_honou": 3,
            "niblet_omega": true
        },
        trigger: "Diviner",
        handIn: "Diviner",
        sideQuestId: 68,
        sideQuestProgress: new Map([
            [1100, "Accepted"],
            [1200, "return_24h"],
            [1300, "desert_flames"]
        ]) //second digit was 2 when accepted day1:02:10, third digit became 1 at day3:06:30
    } as QuestInfo,
    "Friends Forever": {
        name: "Friends Forever",
        requirements: {
            "find_choco_chicks": 6,
        },
        prerequisiteQuests: [
            "Yus_2_3"
        ],
        trigger: Primrose,
        handIn: Primrose,
        sideQuestId: 69,
        sideQuestProgress: new Map([[1100, bytes => ({status: "Accepted", requirements: {"find_choco_chicks": bytes[1]}})]]) //Found on second byte
    } as QuestInfo,
    "Family Food": {
        name: "Family Food",
        requirements: {
            "talk_to_gordon": true,
            "eat_at_restaurants": 6,
            "key_y_bashira": true,
            "key_y_recipe": true,
            "key_y_cream": true
        },
        trigger: Seedy_Owner,
        handIn: Gordon_Gourmet,
        sideQuestId: 70,
        sideQuestProgress: new Map([
            [1100, "Accepted"],
            [1200, (bytes) => ({status: "In Progress", requirements: {"talk_to_gordon": true, "eat_at_restaurants": bytes[1]}})],
            // [1300, "fetch_musk"],
            // [1400, "recipe"],
            // [1500, "steak"]
        ] as [number, QuestStringStatus | ((bytes: number[]) => PartialQuestProgress)][]) //restaurants eaten on second byte
    } as QuestInfo,
    "Tanbam's Taboo": {
        name: "Tanbam's Taboo",
        requirements: {
            "{desmond}": true
        },
        prerequisiteQuests: [
            "Yus_2_3"
        ],
        trigger: Tanbam,
        handIn: Tanbam,
        sideQuestId: 71,
        sideQuestProgress: new Map([[1100, "Accepted"]]) //second byte on completion = clear date
    } as QuestInfo,
    "Play It for Me": {
        name: "Play It for Me",
        requirements: {
            "key_y_kagi1": true,
            "key_y_rappa": true,
            "key_y_kagi2": true,
            "key_y_kagi3": true
        },
        trigger: Morris,
        handIn: Morris,
        sideQuestId: 72,
        sideQuestProgress: new Map([[1100, "Accepted"]]) //second byte: number of music chests opened
    } as QuestInfo,
    "Adoring Adornments": {
        name: "Adoring Adornments",
        requirements: {
            "first_pick": 20,
            "second_pick": 30,
            "adornments": 55
        },
        prerequisiteQuests: [
            "Yus_2_1"
        ],
        trigger: Candice,
        handIn: Candice,
        sideQuestId: 73,
        sideQuestProgress: new Map([
            [1100, "Accepted"],
            [1200, ()=>({status: "In Progress", requirements: {"first_pick": 20}})],
            [1300, ()=>({status: "In Progress", requirements: {"second_pick": 30}})],
            // [9000, "adornments"]
        ] as [number, QuestStringStatus | ((bytes: number[]) => PartialQuestProgress)][]) //20, 30, 55? second works at ~35
    } as QuestInfo,
    "Adoring Candice": {
        name: "Adoring Candice",
        requirements: {
            "key_y_megane": true
        },
        prerequisiteQuests: [
            "Adoring Adornments",
            "Yus_2_3"
        ],
        trigger: Tomesso,
        handIn: Tomesso,
        sideQuestId: 74,
        sideQuestProgress: new Map([[1100, "Accepted"]])
    } as QuestInfo,
    "Death Safari": {
        name: "Death Safari",
        requirements: {
            "key_y_gabu": 30
        },
        prerequisiteQuests: [
            "Yus_2_1"
        ],
        trigger: "Gatekeeper",
        handIn: "Gatekeeper",
        sideQuestId: 76,
        sideQuestProgress: new Map([[1100, "Accepted"]])
    } as QuestInfo,
    "Death Game": {
        name: "Death Game",
        requirements: {
            "key_y_sanka": 30
        },
        prerequisiteOther: [
            "keyItem_death_ticket"
        ],
        prerequisiteQuests: [
            "Death Safari"
        ],
        trigger: Biggs,
        handIn: Biggs,
        sideQuestId: 77,
        sideQuestProgress: new Map([[1100, "Accepted"]])
    } as QuestInfo
}