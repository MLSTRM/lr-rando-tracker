import { resolveMainQuestProgress } from "lr-rando-core";
import { BYTE, DWORD, INT, INT64, SHORT } from "memoryjs";
import { LrMemoryReader, RandoMemoryState, resolveDateTime } from ".";

//should stop at first null char.
export function stripNullChars(input: Buffer): string {
    const str = input.toString();
    return str.replace(/\0/g, '');
}

const someStatsBaseLocation = 0x4CF79D8; //Initial pointer into interesting memory block
const schemaLength = 0x130;
const schemaOffset = 0x148; //pSomeStatsBase -> schema location
const keyItemLength = 0x18;
const keyItemAmountOffset = 0x12;
const keyItemsOffset = 0x158C; //Offset from pSomeStatsBase to key item pointer
const itemOffset = 0x16AC; //Offset from pSomeStatsBase to main item pointer
const gameHeader = 0x1968;
const mapOffset = gameHeader + 0x50;
const recoveryItemOffset = 0x1418;
const chocoboOffset = 0x1A48;

const epAbilitiesMaybe = 0x17B50;

export function attachAndVerify(reader: LrMemoryReader): boolean {
    try {
        if(!reader.isAttached()){
            reader.tryAttach();
            if(!reader.isAttached()){
                console.log('Process attachment failed');
                return false;
            }
        }
        const pSomeStatsBase = reader.readMemoryAddress(someStatsBaseLocation, DWORD);
        const headerLocation = pSomeStatsBase + gameHeader;
        const header = reader.readBuffer(headerLocation, 13, true)?.toString();
        if(header === "white_0000002"){
            console.log(`Verified reader!`);
            return true;
        }
        console.log('Unable to verify process information');
    } catch (err){
        console.error(`Error while attaching to process: ${err}`);
    }
    return false;
}

export function scrapeRandoState(reader: LrMemoryReader): RandoMemoryState {
    const pSomeStatsBase = reader.readMemoryAddress(someStatsBaseLocation, DWORD);
    const schemaIndex = reader.readMemoryAddress(pSomeStatsBase + 0xBF, BYTE, true);
    const pKeyItems = reader.readMemoryAddress(pSomeStatsBase + keyItemsOffset, DWORD, true);
    const pItems = reader.readMemoryAddress(pSomeStatsBase + itemOffset, DWORD, true);
    return {
        gil: reader.readMemoryAddress(pSomeStatsBase + 0x2844, INT, true),
        region: {
            map: stripNullChars(reader.readBuffer(pSomeStatsBase + mapOffset, 14, true)),
            zone: stripNullChars(reader.readBuffer(pSomeStatsBase + mapOffset + 0x10, 14, true))
        },
        maxEP: reader.readMemoryAddress(pSomeStatsBase + 0x2884, INT, true) / 2000,
        time: {
            trueDay: reader.readMemoryAddress(pSomeStatsBase + 0x1A6E, BYTE, true),
            ...resolveDateTime(reader.readMemoryAddress(pSomeStatsBase - 0x10680+0x100000, INT64, true))
        },
        schemas: {
            active: stripNullChars(reader.readBuffer(pSomeStatsBase + schemaOffset + (schemaLength * schemaIndex), 64, true))
        },
        recoveryItemSlots: reader.readMemoryAddress(pSomeStatsBase + recoveryItemOffset, BYTE, true),
        odinHealth: reader.readMemoryAddress(pSomeStatsBase + chocoboOffset, SHORT, true),
        items: generateItemMap(reader, pItems),
        keyItems: generateItemMap(reader, pKeyItems),
        epAbilities: resolveEPAbilities(reader, pSomeStatsBase + epAbilitiesMaybe),
        mainQuestProgress: resolveMainQuestProgress({
            luxerion: reader.readMemoryAddress(pSomeStatsBase + mapOffset + 0x64, SHORT, true),
            yusnaan: reader.readMemoryAddress(pSomeStatsBase + mapOffset + 0x78, SHORT, true),
            wildlands1: reader.readMemoryAddress(pSomeStatsBase + mapOffset + 0x94, SHORT, true),
            wildlands2: reader.readMemoryAddress(pSomeStatsBase + mapOffset + 0x8C, SHORT, true),
            deaddunes: reader.readMemoryAddress(pSomeStatsBase + mapOffset + 0xA0, SHORT, true)
        })
    }
}

function generateItemMap(reader: LrMemoryReader, base: number): Map<string, number> {
    const maxItems = 50; //todo make this reflect the bag?
    const map: Map<string, number> = new Map();
    for(var i = 0; i<maxItems; i++){
        const item = stripNullChars(reader.readBuffer(base + (keyItemLength*i), 16, true));
        const count = reader.readMemoryAddress(base + (keyItemLength*i) + keyItemAmountOffset, BYTE, true);
        if(item.length > 0 && count > 0){
            map.set(item, count);
        } else {
            return map;
        }
    }
    console.log('Reached end of iteration, might be some missing items at the end');
    return map;
}

function resolveEPAbilities(reader: LrMemoryReader, base: number): string[] {
    const EpAbilities: string[] = [];
    for(var i = 0; i<50; i++){
        const offset = base + 0x10*i;
        const ability = stripNullChars(reader.readBuffer(offset, 8, true));
        if(ability.length > 0){
            EpAbilities.push(ability);
            if(i==49){
                console.log('Still have information at last EP index - could be more?');
            }
        }
    }
    return EpAbilities;
}