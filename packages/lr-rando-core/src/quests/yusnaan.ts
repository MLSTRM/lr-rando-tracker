import { MainQuestLine, QuestInfo } from "./model";
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
        sideQuestId: 61
    } as QuestInfo,
    "The Fighting Actress": {
        name: "The Fighting Actress",
        requirements: {
            "match_1": true,
            "match_2": true,
            "match_3": true
        },
        trigger: Zoe,
        sideQuestId: 62
    } as QuestInfo,
    "Songless Diva": {
        name: "Songless Diva",
        requirements: {
            "berdy_talk": true,
            "key_y_kaban": true,
        },
        trigger: Olga,
        handIn: Berdy,
        sideQuestId: 63
    } as QuestInfo,
    "Stolen Things": {
        name: "Stolen Things",
        requirements: {
            "key_y_letter": true,
            "pickett_steal_letter": true
        },
        prerequisiteOther: [
            "event_pickett_steal"
        ],
        trigger: Gregory,
        handIn: Gregory,
        sideQuestId: 64
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
        sideQuestId: 65
    } as QuestInfo,
    "A Testing Proposition": {
        name: "A Testing Proposition",
        requirements: {
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
        sideQuestId: 66
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
        sideQuestId: 67
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
        sideQuestId: 68
    } as QuestInfo,
    "Friends Forever": {
        name: "Friends Forever",
        requirements: {
            "heros_garden_chick": true,
            "broken_statue_chick": true,
            "cactuar_statue_chick": true,
            "fireworks_stall_chick": true,
            "terrace_cafe_chick": true,
            "yusnaan_station_chick": true
        },
        prerequisiteQuests: [
            "Yus_2_3"
        ],
        trigger: Primrose,
        handIn: Primrose,
        sideQuestId: 69
    } as QuestInfo,
    "Family Food": {
        name: "Family Food",
        requirements: {
            "talk_to_gordon": true,
            "eat_at_restaurants": 6,
            "key_y_bashira": true,
            "recipe": true
        },
        trigger: Seedy_Owner,
        handIn: Gordon_Gourmet,
        sideQuestId: 70
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
        sideQuestId: 71
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
        sideQuestId: 72
    } as QuestInfo,
    "Adoring Adornments": {
        name: "Adoring Adornments",
        requirements: {
            "adornments": 55
        },
        prerequisiteQuests: [
            "Yus_2_1"
        ],
        trigger: Candice,
        handIn: Candice,
        sideQuestId: 73
    } as QuestInfo,
    "Adoring Candice": {
        name: "Adoring Candice",
        requirements: {
            "key_y_megane": true
        },
        prerequisiteQuests: [
            "Adoring Adornments"
        ],
        trigger: Tomesso,
        handIn: Tomesso,
        sideQuestId: 74
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
        sideQuestId: 76
    } as QuestInfo,
    "Death Game": {
        name: "Death Game",
        requirements: {
            "death_game_point": 30
        },
        prerequisiteOther: [
            "keyItem_death_ticket"
        ],
        prerequisiteQuests: [
            "Death Safari"
        ],
        trigger: Biggs,
        handIn: Biggs,
        sideQuestId: 77
    } as QuestInfo
}