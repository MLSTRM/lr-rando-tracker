const EpAbilityLookup: { [key: string]: string } = Object.freeze({
    'ti000_00': 'Curaga',
    'ti020_00': 'Arise',
    'ti030_00': 'Esunada',
    'ti500_00': 'Quake',
    'ti600_00': 'Decoy',
    'ti810_00': 'Teleport',
    'ti830_00': 'Escape',
    'ti840_00': 'Chronostasis',
    'ti900_00': 'Overclock',
    'at900_00': 'Army of One', // Still don't really get why this one is different lol
});

export function prettyPrintEpAbility(input?: string): { known: boolean, name: string } {
    if (!input) {
        return { known: false, name: '' };
    }
    if (EpAbilityLookup[input]) {
        return { known: true, name: EpAbilityLookup[input] };
    }
    return { known: false, name: input };
}

//Other things in Ability struct
//Maybe teleport locations?
//Doesn't seem to be quest based

//Seed ?????
//mb210_00 obtained in ark day 1
//mb100_00 obtained in ark day 1
//mbxxx seem to unload when sleeping - potentially display related things
//mb000_00 obtained warping to dead dunes day 2.
//at010_30 attached when messing around with garbs: 