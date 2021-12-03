export type Item = keyof typeof itemNameMap;

export const itemNameMap = Object.freeze({
    'gil_l_000': 'Bronzed Medal',
    'gil_l_010': 'Silvered Medal',
    'gil_l_020': 'Crystal Medal',
    'gil_d_000': 'Unappraised Item',
    'gil_d_010': 'Lizard Tail',
    'gil_d_020': 'Yellowed Skull',
    'gil_r_000': 'Gold Dust',
    'gil_r_010': 'Platinum Ore',
    'mat_z_000': 'Tattered Leather',
    'mat_z_001': 'Vibrant Ooze',
    'mat_z_002': 'Niblet Hairball',
    'mat_z_003': 'Slug Sweet',
    'mat_z_004': 'Monster Mince',
    'mat_z_007': 'Clear Ooze',
    'mat_z_008': 'Green Leather',
    'mat_z_009': 'Radial Bearing',
    'mat_z_010': 'Goblot Hairball',
    'mat_z_011': 'Arboreal Spore',
    'mat_z_012': 'Dead Man\'s Teeth',
    'mat_z_013': 'Chipped Fang',
    'mat_z_014': 'Shattered Bone',
    'mat_z_015': 'Goopy Goo',
    'mat_z_016': 'Pot Shard',
    'mat_z_017': 'Dried Scale',
    'mat_z_018': 'Wonder Gel',
    'mat_z_019': 'Poisonous Sting',
    'mat_z_020': 'Motor Coil',
    'mat_z_021': 'Ether Coil',
    'mat_z_022': 'Demon Spicule',
    'mat_z_024': 'Organic Carapace',
    'mat_z_028': 'Firewyrm Scale',
    'mat_z_029': 'Quality Machine Oil',
    'mat_z_030': 'Sinister Fang',
    'mat_z_031': 'Stormdragon Down',
    'mat_z_032': 'Green Monster Moss',
    'mat_z_033': 'Desert Rose',
    'mat_z_035': 'Single Eye',
    'mat_z_036': 'AMP Chip',
    'mat_z_044': 'Cactuar Doll',
    'mat_z_045': 'Liquid Glass',
    'key_w_hana': 'Yeul\'s Flower',
    'key_w_hana2': 'Moonsoul Bloom',
    'key_w_hana3': 'Dayring Blossom',
    'key_w_kino': 'Chocoborel',
    'key_w_kino2': 'Luminous Mushroom',
    'key_w_milk': 'Fuzzy Sheep Milk',
    'key_w_smilk': 'Creamy Sheep Milk',
    'key_w_tane': 'Vegetable Seed',
    'key_w_yasai': 'Gysahl Greens',
    'key_w_tanta': 'Tantal Greens',
    'key_w_shiru': 'Sylkis Greens',
    'key_w_drag2': 'Animal Potion',
    'key_w_food': 'Mystical Meal',
    'key_w_drink': 'Chocobull',
});

function isValidItem(name: string): name is Item {
    return itemNameMap.hasOwnProperty(name);
}

export function prettyPrintItem(item: string): { known: boolean, name: string } {
    if (!item) {
        return { known: false, name: '' };
    }
    if (isValidItem(item)) {
        return { known: true, name:itemNameMap[item] };
    }
    return { known: false, name: item };
}