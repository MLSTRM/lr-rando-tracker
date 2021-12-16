import { QuestInfo } from "./model";
import { Areas } from "../constants";

//TODO: Add prerequisites
export const prayers = {
    [Areas.LUXERION]: {
         "Revenge is Sweet": {
            name: "Revenge is Sweet",
            requirements: {
                "niblet_hairball": 6
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
                "tattered_leather": 8
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
                "liquid_glass": 3
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
                "niblet_hairball": 60,
                "tattered_leather": 80
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
                "demon_spicule": 3
            },
            canvasByteIndex: 0,
            canvasByteOffset: 0x04
        } as QuestInfo,
         "Slay the Machine": {
            name: "Slay the Machine",
            requirements: {
                "motor_coil": 5
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
                "proof_of_legendary_title": 1
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
                "stormdragon_down": 1
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
                "quality_machine_oil": 1
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
                "chipped_fang": 10
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
                "demon_spicule": 10,
                "stormdragon_down": 8
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
                "chipped_fang": 10,
                "motor_coil": 15
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
                "quality_machine_oil": 5,
                "liquid_glass": 10
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
                "ether_coil": 3
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
                "poisonous_sting": 10
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
                "clear_ooze": 4
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
                "jade_hair_comb": 1,
                "bronze_pocket_watch": 1
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
                "chocobo_girls_phone_no": 1
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
                "unfired_rocket_fireworks": 1
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
                "statue_fragment": 5
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
                "shattered_bone": 3
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
                "firewyrm_scale": 1
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
                "shattered_bone": 5,
                "poisonous_sting": 10
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
                "single_eye": 1
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
                "radial_bearing": 30
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
                "firewyrm_scale": 5,
                "single_eye": 5
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
                "radial_bearing": 10,
                "ether_coil": 15,
                "clear_ooze": 30
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
                "dayring_blossom": 3
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
                "moonsoul_bloom": 5
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
                "vibrant_ooze": 8
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
                "gysahl_greens": 5
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
                "rocky_crag_mole": 1,
                "chocoborel": 3,
                "luminous_mushroom": 2
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
                "arboreal_spore": 10
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
                "mystical_meal": 1
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
                "chocobull": 1,
                "animal_potion": 1
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
                "goopy_goo": 5
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
                "chocoborel": 10
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
                "vegetable_seed": 10
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
                "wonder_gel": 3
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
                "amp_chip": 1
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
                "green_monster_moss": 2
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
                "green_leather": 6
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
                "monster_mince": 10
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
                "dayring_blossom": 8,
                "moonsoul_bloom": 6
            },
            prerequisiteQuests: [
                "Sun Flower",
                "Moon Flower"
            ],
            canvasByteIndex: 3,
            canvasByteOffset: 0x08
        } as QuestInfo,
         "Dumpling Cook-off": {
            name: "Dumpling Cook-off",
            requirements: {
                "monster_mince": 15,
                "green_leather": 15
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
                "vibrant_ooze": 20,
                "wonder_gel": 10
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
                "gysahl_greens": 3,
                "tantal_greens": 2,
                "sylkis_greens": 1
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
                "green_monster_moss": 8
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
                "slug_sweet": 12
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
                "arboreal_spore": 10,
                "goopy_goo": 20,
                "slug_sweet": 50
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
                "sinister_fang": 1
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
                "sinister_fang": 5,
                "amp_chip": 5
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
                "desert_rose": 1
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
                "dried_scale": 3
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
                "goblot_hairball": 8
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
                "desert_rose": 10,
                "dried_scale": 30
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
                "lizard_tail": 3
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
                "lizard_tail": 20
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
                "lizard_tail": 5
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
                "yellowed_skull": 3
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
                "cactuar_doll": 1
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
                "dead_mans_teeth": 5
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
                "dead_mans_teeth": 20
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
                "pot_shard":10
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
                "organic_carapace": 1
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
                "goblot_hairball": 10,
                "pot_shard": 5
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
                "organic_carapace": 5,
                "cactuar_doll": 5
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
                "yellowed_skull": 5
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
                "yellowed_skull": 20
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
                "pilgrims_crux": 3
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
                "broken_gyroscope": 1
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
                "moogle_dust": 1
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
                "oldfashioned_photo_frame": 1
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
                "lapis_lazuli": 1
            },
            prerequisiteQuests: [
                "A Man for a Chocobo"
            ],
            canvasByteIndex: 1,
            canvasByteOffset: 0x04
        } as QuestInfo,
         "Key to Her Heart": {
            name: "Key to Her Heart",
            requirements: {
                "beloveds_gift": 1
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
                "power_booster": 1
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
                "golden_scarab": 1
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
                "proof_of_courage": 1
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
                "violet_amulet": 1
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
                "etros_forbidden_tome": 1
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
                "proof_of_unlocking_the_light_gate": 1,
                "proof_of_unlocking_the_green_gate": 1
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
                "key_to_the_green_gate": 1,
                "key_to_the_sand_gate": 1
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
                "oath_of_the_merchants_guild": 1,
                "bandits_bloodseal": 1
            },
            prerequisiteOther: [
                "time_day_9"
            ],
            canvasByteIndex: 0,
            canvasByteOffset: 0x80
        } as QuestInfo
    }
}