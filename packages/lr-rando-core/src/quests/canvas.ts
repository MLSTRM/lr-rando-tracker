import { QuestInfo } from "./model";
import { Areas } from "../constants";

//TODO: Add prerequisites
export const prayers = {
    [Areas.LUXERION]: {
         "Revenge is Sweet": {
            name: "Revenge is Sweet",
            requirements: {
                "mat_z_002": 6
            },
            prerequisiteQuests: [
                "Lux_1_1"
            ],
            canvasByteIndex: 0,
            canvasByteOffset: 0x01
        } as QuestInfo,
         "Gift of Gratitude": {
            name: "Gift of Gratitude",
            requirements: {
                "mat_z_000": 8
            },
            prerequisiteQuests: [
                "Lux_1_1"
            ],
            canvasByteIndex: 0,
            canvasByteOffset: 0x02
        } as QuestInfo,
         "Inventive Seamstress": {
            name: "Inventive Seamstress",
            requirements: {
                "mat_z_045": 3
            },
            prerequisiteQuests: [
                "Lux_1_1"
            ],
            canvasByteIndex: 1,
            canvasByteOffset: 0x01
        } as QuestInfo,
         "Trapped": {
            name: "Trapped",
            requirements: {
                "mat_z_002": 60,
                "mat_z_000": 80
            },
            prerequisiteQuests: [
                "Revenge is Sweet",
                "Gift of Gratitude"
            ],
            canvasByteIndex: 1,
            canvasByteOffset: 0x80
        } as QuestInfo,
         "A Song for God": {
            name: "A Song for God",
            requirements: {
                "mat_z_022": 3
            },
            prerequisiteOther: [
                'time_day_3'
            ],
            canvasByteIndex: 0,
            canvasByteOffset: 0x04
        } as QuestInfo,
         "Slay the Machine": {
            name: "Slay the Machine",
            requirements: {
                "mat_z_020": 5
            },
            prerequisiteOther: [
                "time_day_3"
            ],
            canvasByteIndex: 0,
            canvasByteOffset: 0x10
        } as QuestInfo,
         "Mythical Badge": {
            name: "Mythical Badge",
            requirements: {
                "ley_l_kishin": 1
            },
            prerequisiteOther: [
                "time_day_3"
            ],
            canvasByteIndex: 2,
            canvasByteOffset: 0x10
        } as QuestInfo,
         "Grave of a Bounty Hunter": {
            name: "Grave of a Bounty Hunter",
            requirements: {
                "mat_z_031": 1
            },
            prerequisiteOther: [
                "time_day_5"
            ],
            canvasByteIndex: 0,
            canvasByteOffset: 0x80
        } as QuestInfo,
         "Puppeteer's Lament": {
            name: "Puppeteer's Lament",
            requirements: {
                "mat_z_029": 1
            },
            prerequisiteOther: [
                "time_day_5"
            ],
            canvasByteIndex: 1,
            canvasByteOffset: 0x04
        } as QuestInfo,
         "Revenge Has Teeth": {
            name: "Revenge Has Teeth",
            requirements: {
                "mat_z_013": 10
            },
            prerequisiteOther: [
                "time_day_5"
            ],
            canvasByteIndex: 1,
            canvasByteOffset: 0x08
        } as QuestInfo,
         "Enchanted Brush": {
            name: "Enchanted Brush",
            requirements: {
                "mat_z_022": 10,
                "mat_z_031": 8
            },
            prerequisiteQuests: [
                "A Song for God",
                "Grave of a Bounty Hunter"
            ],
            canvasByteIndex: 0,
            canvasByteOffset: 0x20
        } as QuestInfo,
         "Night Patrol": {
            name: "Night Patrol",
            requirements: {
                "mat_z_013": 10,
                "mat_z_020": 15
            },
            prerequisiteQuests: [
                "Slay the Machine",
                "Revenge Has Teeth"
            ],
            canvasByteIndex: 1,
            canvasByteOffset: 0x04
        } as QuestInfo,
         "Heretics' Beasts": {
            name: "Heretics' Beasts",
            requirements: {
                "mat_z_029": 5,
                "mat_z_045": 10
            },
            prerequisiteQuests: [
                "Inventive Seamstress",
                "Puppeteer's Lament"
            ],
            canvasByteIndex: 0,
            canvasByteOffset: 0x40
        } as QuestInfo
    },
    [Areas.YUSNAAN]: {
         "Secret Machine": {
            name: "Secret Machine",
            requirements: {
                "mat_z_021": 3
            },
            prerequisiteOther: [
                "time_day_1"
            ],
            canvasByteIndex: 0,
            canvasByteOffset: 0x04
        } as QuestInfo,
         "Soulful Horn": {
            name: "Soulful Horn",
            requirements: {
                "mat_z_019": 10
            },
            prerequisiteOther: [
                "time_day_2"
            ],
            canvasByteIndex: 0,
            canvasByteOffset: 0x08
        } as QuestInfo,
         "A Dangerous Cocktail": {
            name: "A Dangerous Cocktail",
            requirements: {
                "mat_z_007": 4
            },
            prerequisiteOther: [
                "time_day_3"
            ],
            canvasByteIndex: 0,
            canvasByteOffset: 0x80
        } as QuestInfo,
         "Time Doesn't Heal": {
            name: "Time Doesn't Heal",
            requirements: {
                "key_b_16": 1,
                "key_b_17": 1
            },
            prerequisiteOther: [
                "boss_{cyclops}"
            ],
            canvasByteIndex: 2,
            canvasByteOffset: 0x80
        } as QuestInfo,
         "A Man for a Chocobo Girl": {
            name: "A Man for a Chocobo Girl",
            requirements: {
                "key_b_20": 1
            },
            prerequisiteQuests: [
                "Yus_2_2"
            ],
            canvasByteIndex: 3,
            canvasByteOffset: 0x01
        } as QuestInfo,
         "Unfired Firework": {
            name: "Unfired Firework",
            requirements: {
                "key_b_18": 1
            },
            prerequisiteQuests: [
                "Yus_2_3"
            ],
            canvasByteIndex: 2,
            canvasByteOffset: 0x40
        } as QuestInfo,
         "Rebuilding": {
            name: "Rebuilding",
            requirements: {
                "key_b_19": 5
            },
            prerequisiteQuests: [
                "Yus_2_3"
            ],
            canvasByteIndex: 3,
            canvasByteOffset: 0x02
        } as QuestInfo,
         "Source of Inspiration": {
            name: "Source of Inspiration",
            requirements: {
                "mat_z_014": 3
            },
            prerequisiteOther: [
                "time_day_5"
            ],
            canvasByteIndex: 1,
            canvasByteOffset: 0x04
        } as QuestInfo,
         "True Colors": {
            name: "True Colors",
            requirements: {
                "mat_z_028": 1
            },
            prerequisiteOther: [
                "time_day_5"
            ],
            canvasByteIndex: 1,
            canvasByteOffset: 0x40
        } as QuestInfo,
         "Beast Summoner": {
            name: "Beast Summoner",
            requirements: {
                "mat_z_014": 5,
                "mat_z_019": 10
            },
            prerequisiteQuests: [
                "Soulful Horn",
                "Source of Inspiration"
            ],
            canvasByteIndex: 1,
            canvasByteOffset: 0x10
        } as QuestInfo,
         "Youth Potion": {
            name: "Youth Potion",
            requirements: {
                "mat_z_035": 1
            },
            prerequisiteOther: [
                "time_day_7"
            ],
            canvasByteIndex: 1,
            canvasByteOffset: 0x08
        } as QuestInfo,
         "Spell for Spell": {
            name: "Spell for Spell",
            requirements: {
                "mat_z_009": 30
            },
            prerequisiteOther: [
                "time_day_7"
            ],
            canvasByteIndex: 2,
            canvasByteOffset: 0x01
        } as QuestInfo,
         "What Seekers Seek": {
            name: "What Seekers Seek",
            requirements: {
                "mat_z_028": 5,
                "mat_z_035": 5
            },
            prerequisiteQuests: [
                "Youth Potion",
                "True Colors"
            ],
            canvasByteIndex: 1,
            canvasByteOffset: 0x20
        } as QuestInfo,
         "Ultimate Craving": {
            name: "Ultimate Craving",
            requirements: {
                "mat_z_009": 10,
                "mat_z_021": 15,
                "mat_z_007": 30
            },
            prerequisiteQuests: [
                "Secret Machine",
                "A Dangerous Cocktail",
                "Spell for Spell"
            ],
            canvasByteIndex: 1,
            canvasByteOffset: 0x80
        } as QuestInfo
    },
    [Areas.WILDLANDS]: {
         "Sun Flower": {
            name: "Sun Flower",
            requirements: {
                "key_w_hana3": 3
            },
            prerequisiteOther: [
                "time_day_1"
            ],
            canvasByteIndex: 0,
            canvasByteOffset: 0x10
        } as QuestInfo,
         "Moon Flower": {
            name: "Moon Flower",
            requirements: {
                "key_w_hana2": 5
            },
            prerequisiteOther: [
                "time_day_1"
            ],
            canvasByteIndex: 0,
            canvasByteOffset: 0x20
        } as QuestInfo,
         "Forget Me Not": {
            name: "Forget Me Not",
            requirements: {
                "mat_z_001": 8
            },
            prerequisiteOther: [
                "time_day_1"
            ],
            canvasByteIndex: 1,
            canvasByteOffset: 0x02
        } as QuestInfo,
         "Chocobo Chow": {
            name: "Chocobo Chow",
            requirements: {
                "key_w_yasai": 5
            },
            prerequisiteOther: [
                "time_day_1"
            ],
            canvasByteIndex: 3,
            canvasByteOffset: 0x01
        } as QuestInfo,
         "Digging Mole": {
            name: "Digging Mole",
            requirements: {
                "key_w_mogura": 1,
                "key_w_kino": 3,
                "key_w_kino2": 2
            },
            prerequisiteOther: [
                "time_day_1"
            ],
            canvasByteIndex: 3,
            canvasByteOffset: 0x04
        } as QuestInfo,
         "Moghan's Plea": {
            name: "Moghan's Plea",
            requirements: {
                "mat_z_011": 10
            },
            prerequisiteQuests: [
                "Peace and Quiet, Kupo"
            ],
            canvasByteIndex: 2,
            canvasByteOffset: 0x04
        } as QuestInfo,
         "Moogle Gourmand": {
            name: "Moogle Gourmand",
            requirements: {
                "key_w_food": 1
            },
            prerequisiteQuests: [
                "Peace and Quiet, Kupo"
            ],
            canvasByteIndex: 3,
            canvasByteOffset: 0x20
        } as QuestInfo,
         "Emergency Treatment": {
            name: "Emergency Treatment",
            requirements: {
                "key_w_drink": 1,
                "key_w_drag2": 1
            },
            prerequisiteQuests: [
                "Wild_3_2"
            ],
            canvasByteIndex: 3,
            canvasByteOffset: 0x10
        } as QuestInfo,
         "Fresh Fertilizer": {
            name: "Fresh Fertilizer",
            requirements: {
                "mat_z_015": 5
            },
            prerequisiteQuests: [
                "Land of Our Forebears"
            ],
            canvasByteIndex: 1,
            canvasByteOffset: 0x08
        } as QuestInfo,
         "Secret of the Chocoborel": {
            name: "Secret of the Chocoborel",
            requirements: {
                "key_w_kino": 10
            },
            prerequisiteOther: [
                "time_day_3"
            ],
            canvasByteIndex: 0,
            canvasByteOffset: 0x40
        } as QuestInfo,
         "Wildlands in Danger!": {
            name: "Wildlands in Danger!",
            requirements: {
                "key_w_tane": 10
            },
            prerequisiteOther: [
                "time_day_3"
            ],
            canvasByteIndex: 0,
            canvasByteOffset: 0x80
        } as QuestInfo,
         "A Word of Thanks": {
            name: "A Word of Thanks",
            requirements: {
                "mat_z_018": 3
            },
            prerequisiteOther: [
                "time_day_3"
            ],
            canvasByteIndex: 1,
            canvasByteOffset: 0x04
        } as QuestInfo,
         "For the Future": {
            name: "For the Future",
            requirements: {
                "mat_z_036": 1
            },
            prerequisiteOther: [
                "time_day_3"
            ],
            canvasByteIndex: 1,
            canvasByteOffset: 0x10
        } as QuestInfo,
         "Hunter's Challenge": {
            name: "Hunter's Challenge",
            requirements: {
                "mat_z_032": 2
            },
            prerequisiteOther: [
                "time_day_3"
            ],
            canvasByteIndex: 2,
            canvasByteOffset: 0x01
        } as QuestInfo,
         "Echoes of a Drum": {
            name: "Echoes of a Drum",
            requirements: {
                "mat_z_008": 6
            },
            prerequisiteOther: [
                "time_day_3"
            ],
            canvasByteIndex: 2,
            canvasByteOffset: 0x40
        } as QuestInfo,
         "A Voice from Below": {
            name: "A Voice from Below",
            requirements: {
                "mat_z_004": 10
            },
            prerequisiteOther: [
                "time_day_3"
            ],
            canvasByteIndex: 2,
            canvasByteOffset: 0x80
        } as QuestInfo,
         "Two Together": {
            name: "Two Together",
            requirements: {
                "key_w_hana3": 8,
                "key_w_hana2": 6
            },
            prerequisiteQuests: [
                "Sun Flower",
                "Moon Flower"
            ],
            prerequisiteOther: [
                "time_day_3"
            ],
            canvasByteIndex: 3,
            canvasByteOffset: 0x08
        } as QuestInfo,
         "Dumpling Cook-off": {
            name: "Dumpling Cook-off",
            requirements: {
                "mat_z_004": 15,
                "mat_z_008": 15
            },
            prerequisiteQuests: [
                "Echoes of a Drum",
                "A Voice from Below"
            ],
            canvasByteIndex: 1,
            canvasByteOffset: 0x20
        } as QuestInfo,
         "A Secret Wish": {
            name: "A Secret Wish",
            requirements: {
                "mat_z_001": 20,
                "mat_z_018": 10
            },
            prerequisiteQuests: [
                "Forget Me Not",
                "A Word of Thanks"
            ],
            canvasByteIndex: 2,
            canvasByteOffset: 0x02
        } as QuestInfo,
         "Sylkis Secrets": {
            name: "Sylkis Secrets",
            requirements: {
                "key_w_yasai": 3,
                "key_w_tanta": 2,
                "key_w_shiru": 1
            },
            prerequisiteQuests: [
                "Chocobo Chow"
            ],
            canvasByteIndex: 3,
            canvasByteOffset: 0x02
        } as QuestInfo,
         "Hunting the Hunter": {
            name: "Hunting the Hunter",
            requirements: {
                "mat_z_032": 8
            },
            prerequisiteQuests: [
                "Hunter's Challenge"
            ],
            canvasByteIndex: 1,
            canvasByteOffset: 0x01
        } as QuestInfo,
         "Gatekeeper's Curiosity": {
            name: "Gatekeeper's Curiosity",
            requirements: {
                "mat_z_003": 12
            },
            prerequisiteOther: [
                "time_day_5"
            ],
            canvasByteIndex: 2,
            canvasByteOffset: 0x20
        } as QuestInfo,
         "What's in a Brew": {
            name: "What's in a Brew",
            requirements: {
                "mat_z_011": 10,
                "mat_z_015": 20,
                "mat_z_003": 50
            },
            prerequisiteQuests: [
                "Fresh Fertilizer",
                "Moghan's Plea",
                "Gatekeeper's Curiosity"
            ],
            canvasByteIndex: 2,
            canvasByteOffset: 0x08
        } as QuestInfo,
         "Brain Over Brawn": {
            name: "Brain Over Brawn",
            requirements: {
                "mat_z_030": 1
            },
            prerequisiteOther: [
                "time_day_7"
            ],
            canvasByteIndex: 1,
            canvasByteOffset: 0x40
        } as QuestInfo,
         "A Prayer to a Goddess": {
            name: "A Prayer to a Goddess",
            requirements: {
                "mat_z_030": 5,
                "mat_z_036": 5
            },
            prerequisiteQuests: [
                "For the Future",
                "Brain over Brawn"
            ],
            canvasByteIndex: 2,
            canvasByteOffset: 0x20
        } as QuestInfo
    },
    [Areas.DEAD_DUNES]: {
         "Flower in the Sands": {
            name: "Flower in the Sands",
            requirements: {
                "mat_z_033": 1
            },
            prerequisiteOther: [
                "time_day_1"
            ],
            canvasByteIndex: 0,
            canvasByteOffset: 0x40
        } as QuestInfo,
         "Biologically Speaking": {
            name: "Biologically Speaking",
            requirements: {
                "mat_z_017": 3
            },
            prerequisiteOther: [
                "time_day_1"
            ],
            canvasByteIndex: 0,
            canvasByteOffset: 0x80
        } as QuestInfo,
         "Banned Goods": {
            name: "Banned Goods",
            requirements: {
                "mat_z_010": 8
            },
            prerequisiteOther: [
                "time_day_1"
            ],
            canvasByteIndex: 1,
            canvasByteOffset: 0x08
        } as QuestInfo,
         "Desert Cleanup": {
            name: "Desert Cleanup",
            requirements: {
                "mat_z_033": 10,
                "mat_z_017": 30
            },
            prerequisiteQuests: [
                "Flower in the Sands",
                "Biologically Speaking"
            ],
            canvasByteIndex: 2,
            canvasByteOffset: 0x80
        } as QuestInfo,
         "Lucky Charm": {
            name: "Lucky Charm",
            requirements: {
                "gil_d_010": 3
            },
            prerequisiteOther: [
                "area_yusnaan"
            ],
            canvasByteIndex: 3,
            canvasByteOffset: 0x08
        } as QuestInfo,
         "A New Application": {
            name: "A New Application",
            requirements: {
                "gil_d_010": 20
            },
            prerequisiteQuests: [
                "Family Food"
            ],
            canvasByteIndex: 3,
            canvasByteOffset: 0x20
        } as QuestInfo,
         "Supply and Demand": {
            name: "Supply and Demand",
            requirements: {
                "gil_d_010": 5
            },
            prerequisiteQuests: [
                "Lucky Charm"
            ],
            canvasByteIndex: 3,
            canvasByteOffset: 0x10
        } as QuestInfo,
         "Pride and Greed I": {
            name: "Pride and Greed I",
            requirements: {
                "gil_d_020": 3
            },
            prerequisiteOther: [
                "time_day_3"
            ],
            canvasByteIndex: 3,
            canvasByteOffset: 0x40
        } as QuestInfo,
         "For My Child": {
            name: "For My Child",
            requirements: {
                "mat_z_044": 1
            },
            prerequisiteOther: [
                "time_day_3"
            ],
            canvasByteIndex: 1,
            canvasByteOffset: 0x02
        } as QuestInfo,
         "Climbing the Ranks I": {
            name: "Climbing the Ranks I",
            requirements: {
                "mat_z_012": 5
            },
            prerequisiteOther: [
                "time_day_3"
            ],
            canvasByteIndex: 1,
            canvasByteOffset: 0x10
        } as QuestInfo,
         "Climbing the Ranks II": {
            name: "Climbing the Ranks II",
            requirements: {
                "mat_z_012": 20
            },
            prerequisiteQuests: [
                "Climbing the Ranks I"
            ],
            canvasByteIndex: 2,
            canvasByteOffset: 0x08
        } as QuestInfo,
         "Miracle Vintage": {
            name: "Miracle Vintage",
            requirements: {
                "mat_z_016": 10
            },
            prerequisiteOther: [
                "time_day_4"
            ],
            canvasByteIndex: 1,
            canvasByteOffset: 0x40
        } as QuestInfo,
         "Heightened Security": {
            name: "Heightened Security",
            requirements: {
                "mat_z_024": 1
            },
            prerequisiteOther: [
                "time_day_4"
            ],
            canvasByteIndex: 2,
            canvasByteOffset: 0x10
        } as QuestInfo,
         "The Real Client": {
            name: "The Real Client",
            requirements: {
                "mat_z_010": 10,
                "mat_z_016": 5
            },
            prerequisiteQuests: [
                "Banned Goods",
                "Miracle Vintage"
            ],
            canvasByteIndex: 1,
            canvasByteOffset: 0x01
        } as QuestInfo,
         "Bandit's New Weapon": {
            name: "Bandit's New Weapon",
            requirements: {
                "mat_z_024": 5,
                "mat_z_044": 5
            },
            prerequisiteQuests: [
                "For My Child",
                "Heightened Security"
            ],
            canvasByteIndex: 1,
            canvasByteOffset: 0x04
        } as QuestInfo,
         "Pride and Greed II": {
            name: "Pride and Greed II",
            requirements: {
                "gil_d_020": 5
            },
            prerequisiteOther: [
                "time_day_7"
            ],
            prerequisiteQuests: [
                "Pride and Greed I"
            ],
            canvasByteIndex: 3,
            canvasByteOffset: 0x80
        } as QuestInfo,
         "Pride and Greed III": {
            name: "Pride and Greed III",
            requirements: {
                "gil_d_020": 20
            },
            prerequisiteOther: [
                "time_day_9"
            ],
            prerequisiteQuests: [
                "Pride and Greed II"
            ],
            canvasByteIndex: 4,
            canvasByteOffset: 0x01
        } as QuestInfo,
         "A Treasure for a God": {
            name: "A Treasure for a God",
            requirements: {
                "key_d_key": 3
            },
            prerequisiteQuests: [
                "Dead_4_5"
            ],
            canvasByteIndex: 3,
            canvasByteOffset: 0x04
        } as QuestInfo
    },
    [Areas.GLOBAL]: {
         "Shoot for the Sky": {
            name: "Shoot for the Sky",
            requirements: {
                "key_b_07": 1
            },
            prerequisiteOther: [
                "time_day_2"
            ],
            canvasByteIndex: 1,
            canvasByteOffset: 0x80
        } as QuestInfo,
         "Where Moogles Be": {
            name: "Where Moogles Be",
            requirements: {
                "key_b_04": 1
            },
            prerequisiteQuests: [
                "Saving an Angel"
            ],
            canvasByteIndex: 1,
            canvasByteOffset: 0x10
        } as QuestInfo,
         "Fading Prayer": {
            name: "Fading Prayer",
            requirements: {
                "key_b_05": 1
            },
            prerequisiteQuests: [
                "Saving an Angel"
            ],
            canvasByteIndex: 1,
            canvasByteOffset: 0x20
        } as QuestInfo,
         "Seeing the Dawn": {
            name: "Seeing the Dawn",
            requirements: {
                "key_b_02": 1
            },
            prerequisiteQuests: [
                "A Man for a Chocobo",
                "Yus_2_3"
            ],
            canvasByteIndex: 1,
            canvasByteOffset: 0x04
        } as QuestInfo,
         "Key to Her Heart": {
            name: "Key to Her Heart",
            requirements: {
                "key_s_okuri": 1
            },
            prerequisiteQuests: [
                "Sazh_5_3"
            ],
            canvasByteIndex: 0,
            canvasByteOffset: 0x10
        } as QuestInfo,
         "Staying Sharp": {
            name: "Staying Sharp",
            requirements: {
                "key_b_03": 1
            },
            prerequisiteQuests: [
                "Death Safari"
            ],
            canvasByteIndex: 1,
            canvasByteOffset: 0x08
        } as QuestInfo,
         "Digging Mysteries": {
            name: "Digging Mysteries",
            requirements: {
                "key_b_08": 1
            },
            prerequisiteOther: [
                "accept_rough_beast"
            ],
            canvasByteIndex: 2,
            canvasByteOffset: 0x01
        } as QuestInfo,
         "A Girl's Challenge": {
            name: "A Girl's Challenge",
            requirements: {
                "key_b_00": 1
            },
            prerequisiteQuests: [
                "Lux_1_5"
            ],
            canvasByteIndex: 1,
            canvasByteOffset: 0x01
        } as QuestInfo,
         "What's Left Behind": {
            name: "What's Left Behind",
            requirements: {
                "key_b_01": 1
            },
            prerequisiteQuests: [
                "Lux_1_5"
            ],
            canvasByteIndex: 1,
            canvasByteOffset: 0x02
        } as QuestInfo,
         "Forbidden Tome": {
            name: "Forbidden Tome",
            requirements: {
                "key_b_06": 1
            },
            prerequisiteQuests: [
                "Wild_3_3"
            ],
            canvasByteIndex: 1,
            canvasByteOffset: 0x40
        } as QuestInfo,
         "Roadworks I": {
            name: "Roadworks I",
            requirements: {
                "key_b_14": 1,
                "key_b_15": 1
            },
            prerequisiteOther: [
                "time_day_9"
            ],
            canvasByteIndex: 0,
            canvasByteOffset: 0x20
        } as QuestInfo,
         "Roadworks II": {
            name: "Roadworks II",
            requirements: {
                "key_b_09": 1,
                "key_b_10": 1
            },
            prerequisiteOther: [
                "time_day_9"
            ],
            canvasByteIndex: 0,
            canvasByteOffset: 0x40
        } as QuestInfo,
         "Roadworks III": {
            name: "Roadworks III",
            requirements: {
                "key_b_11": 1,
                "key_b_12": 1
            },
            prerequisiteOther: [
                "time_day_9"
            ],
            canvasByteIndex: 0,
            canvasByteOffset: 0x80
        } as QuestInfo
    }
}