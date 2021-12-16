import { MainQuestLine, QuestInfo } from "./model";
import { MainQuests } from "../constants";

const Sazh_5_2: QuestInfo = {
    name: "Follow the Chocobo Chick",
    requirements: false,
    handIn: "Airship chest"
}

const Sazh_5_3: QuestInfo = {
    name: "Wishes on a Canvas",
    prerequisiteQuests: [
        "Key to Her Heart"
    ],
    requirements: {
        "key_to_her_heart": true
    },
    handIn: "Canvas"
}

const Sazh_5_4: QuestInfo = {
    name: "What Soul Seed Traders Want",
    requirements: {
        "seedhunter_card": true,
        "moogle_fragment": true
    },
    handIn: "Seedhunter"
}

const Sazh_5_5: QuestInfo = {
    name: "Battle's Bounty",
    requirements: false,
    handIn: {
        name: "Slaughterhouse Special",
        available: {
            from: "19:00",
            to: "03:00"
        }
    }
}

const Sazh_5_6: QuestInfo = {
    name: "Beyond the Sandstorm",
    requirements: {
        "pilgrims_crux": 1,
        "{cactair}": true
    },
    handIn: "{cactair}"
}

const Sazh_5_1: QuestInfo = {
    name: "Father and Son (Completion)",
    requirements: {
        "fragment_of_courage": true,
        "fragment_of_kindness": true,
        "fragment_of_mischief": true,
        "fragment_of_radiance": true,
        "fragment_of_smiles": true
    },
    trigger: "Sazh",
    handIn: "Sazh",
    sideQuestId: 34
}

export const SazhMainQuest= {
    Sazh_5_1,
    Sazh_5_2,
    Sazh_5_3,
    Sazh_5_4,
    Sazh_5_5,
    Sazh_5_6
};