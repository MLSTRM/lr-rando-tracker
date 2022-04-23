import { Areas, getSideQuestProgress, inflateCanvasBytes, resolveMainQuestProgress, SideQuestProgress } from "lr-rando-core";
import { BYTE, DWORD, INT, INT64, SHORT } from "./model";
import { LrMemoryReader, RandoMemoryState, resolveDateTime } from ".";

// Not really sure why but for some reason the in-memory version mangles the multi byte characters
const weirdEncodedDejaVu = Buffer.from([0x44, 0x85, 0xc8, 0x6a, 0x85, 0xbf, 0x20, 0x56, 0x75]).toString('utf8');

//should stop at first null char.
export function stripNullChars(input: Buffer, stopAtFirstNull = false): string {
    const str = input.toString('utf-8');
    const trimmed = stopAtFirstNull ? str.substr(0, str.indexOf('\0\0')) : str;
    const stripped = trimmed.replace(/\0/g, '');
    if(stripped.startsWith(weirdEncodedDejaVu)){
        return 'Déjà Vu';
    }
    return stripped;
}

const someStatsBaseLocation = 0x4CF79D8; //Initial pointer into interesting memory block
const schemaLength = 0x130;
const schemaOffset = 0x148; //pSomeStatsBase -> schema location
const keyItemLength = 0x18;
const keyItemAmountOffset = 0x12;
const keyItemsOffset = 0x158C; //Offset from pSomeStatsBase to key item pointer
const garbsOffset = 0x173C;
const itemOffset = 0x16AC; //Offset from pSomeStatsBase to main item pointer
const gameHeader = 0x1968;
const mapOffset = gameHeader + 0x50;
const recoveryItemOffset = 0x1418;
const chocoboOffset = 0x1A48;
const sideQuestOffset = 0xAF10;
const canvasOffsetMaybe = 0xC0F0;
const charaCounterBaseLocation = 0x20D252C;

const epAbilitiesMaybe = 0x17B50;
const btscoreOffset = 0x1EF34;

export async function attachAndVerify(reader: LrMemoryReader): Promise<boolean> {
    try {
        if(!reader.isAttached()){
            await reader.tryAttach();
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
    const pGarbs = reader.readMemoryAddress(pSomeStatsBase + + recoveryItemOffset+0x174 + 0x180, DWORD, true);
    const pItems = reader.readMemoryAddress(pSomeStatsBase + itemOffset, DWORD, true);
    const pCharaCounterBase = reader.readMemoryAddress(charaCounterBaseLocation, DWORD);
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
            active: stripNullChars(reader.readBuffer(pSomeStatsBase + schemaOffset + (schemaLength * schemaIndex), 24, true), true), //Longest schema is "Hunter of the Wild" I think
            slot1: stripNullChars(reader.readBuffer(pSomeStatsBase + schemaOffset, 24, true), true),
            slot2: stripNullChars(reader.readBuffer(pSomeStatsBase + schemaOffset + schemaLength, 24, true), true),
            slot3: stripNullChars(reader.readBuffer(pSomeStatsBase + schemaOffset + (schemaLength*2), 24, true), true)
        },
        recoveryItemSlots: reader.readMemoryAddress(pSomeStatsBase + recoveryItemOffset, BYTE, true),
        odinHealth: reader.readMemoryAddress(pSomeStatsBase + chocoboOffset, SHORT, true),
        items: generateItemMap(reader, pItems),
        keyItems: generateItemMap(reader, pKeyItems),
        garbs: resolveGarbList(reader, pGarbs),
        epAbilities: resolveEPAbilities(reader, pSomeStatsBase + epAbilitiesMaybe),
        mainQuestBytes: {
            luxerion: reader.readMemoryAddress(pSomeStatsBase + mapOffset + 0x64, SHORT, true),
            yusnaan: reader.readMemoryAddress(pSomeStatsBase + mapOffset + 0x78, SHORT, true),
            wildlands1: reader.readMemoryAddress(pSomeStatsBase + mapOffset + 0x94, SHORT, true),
            wildlands2: reader.readMemoryAddress(pSomeStatsBase + mapOffset + 0x8C, SHORT, true),
            deaddunes: reader.readMemoryAddress(pSomeStatsBase + mapOffset + 0xA0, SHORT, true),
            sazh: [
                reader.readMemoryAddress(pSomeStatsBase + sideQuestOffset + (0x8 * 34), SHORT, true),
                reader.readMemoryAddress(pSomeStatsBase + sideQuestOffset + (0x8 * 34) + 2, SHORT, true),
                reader.readMemoryAddress(pSomeStatsBase + sideQuestOffset + (0x8 * 34) + 4, SHORT, true),
                reader.readMemoryAddress(pSomeStatsBase + sideQuestOffset + (0x8 * 34) + 6, SHORT, true)
            ]
        },
        sideQuestProgress: extractSideQuestProgress(reader, pSomeStatsBase + sideQuestOffset),
        canvasOfPrayers: {
            accepted: extractCanvasInfo(reader, pSomeStatsBase + canvasOffsetMaybe),
            completed: extractCanvasInfo(reader, pSomeStatsBase + canvasOffsetMaybe + 0x40),
        },
        soulSeeds: reader.readMemoryAddress(pSomeStatsBase + gameHeader+0x50+(57*8)+6, BYTE, true),
        unappraised: resolveCharaCounter(reader, pCharaCounterBase, 825),
        btsc: resolveBtscores(reader, pSomeStatsBase + btscoreOffset)
    }
}

function extractCanvasInfo(reader: LrMemoryReader, base: number): {[key: number]: string[]} {
    const canvasAcceptBuffer = reader.readBuffer(base, 40, true);
    const canvasAcceptArr = Uint8Array.from(canvasAcceptBuffer);
    return {
        0: inflateCanvasBytes(Areas.LUXERION, canvasAcceptArr.slice(0,3)),
        1: inflateCanvasBytes(Areas.YUSNAAN, canvasAcceptArr.slice(6,10)),
        3: inflateCanvasBytes(Areas.WILDLANDS, canvasAcceptArr.slice(12,16)),
        2: inflateCanvasBytes(Areas.DEAD_DUNES, canvasAcceptArr.slice(18,23)),
        4: inflateCanvasBytes(Areas.GLOBAL, canvasAcceptArr.slice(37,40))
    }
}

function extractSideQuestProgress(reader: LrMemoryReader, base: number): {[key: number]: SideQuestProgress[]} {
    const maxMainQuests = 99;
    const mainQuest5 = 34;
    const progress: {[key: number]: SideQuestProgress[]} = {
        0: [],
        1: [],
        3: [],
        2: []
    };
    for(var i = 0; i <= maxMainQuests; i++){
        if(i===mainQuest5){
            continue;
        }
        const questProgress = reader.readMemoryAddress(base + (0x8 * i), SHORT, true);
        const questBytes = [
            questProgress,
            reader.readMemoryAddress(base + (0x8 * i) + 0x2, SHORT, true),
            reader.readMemoryAddress(base + (0x8 * i) + 0x4, SHORT, true),
            reader.readMemoryAddress(base + (0x8 * i) + 0x6, SHORT, true)
        ]
        if(questProgress > 0){
            let resolvedProgress = getSideQuestProgress(Areas.LUXERION, i, questBytes);
            if(resolvedProgress.known){
                if (resolvedProgress.name === 'To Save The Sinless'){
                    // This uses a clone of TAR
                    continue;
                }
                progress[0].push(resolvedProgress);
                if(resolvedProgress.name === 'The Avid Reader'){
                    // TSTS is a clone of TAR
                    const sinless = Object.assign({}, resolvedProgress, {name: 'To Save The Sinless'});
                    progress[0].push(sinless);
                }
                continue;
            }
            resolvedProgress = getSideQuestProgress(Areas.YUSNAAN, i, questBytes);
            if(resolvedProgress.known){
                progress[1].push(resolvedProgress);
                continue;
            }
            resolvedProgress = getSideQuestProgress(Areas.WILDLANDS, i, questBytes);
            if(resolvedProgress.known){
                progress[3].push(resolvedProgress);
                continue;
            }
            resolvedProgress = getSideQuestProgress(Areas.DEAD_DUNES, i, questBytes);
            if(resolvedProgress.known){
                progress[2].push(resolvedProgress);
                continue;
            }
        }
    }
    return progress;
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
    // console.log('Reached end of iteration, might be some missing items at the end');
    return map;
}

function resolveGarbList(reader: LrMemoryReader, base: number): string[] {
    const maxItems = 100; //todo make this reflect the bag?
    const arr: string[] = [];
    for(var i = 0; i<maxItems; i++){
        const item = stripNullChars(reader.readBuffer(base + (keyItemLength*i), 16, true));
        if(item.length>0){
            arr.push(item);
        } else {
            return arr;
        }
    }
    // console.log('Reached end of iteration, might be some missing garbs at the end');
    return arr;
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

function resolveCharaCounter(reader: LrMemoryReader, base: number, index: number): number {
    /*
    LRFF13.exe+5BEFDE - 8B 15 2C25DA02        - mov edx,[LRFF13.exe+20D252C] { (DEA682A0) }
    LRFF13.exe+5BEFE4 - 8D 0C C0              - lea ecx,[eax+eax*8] {multiply index by 9}
    LRFF13.exe+5BEFE7 - 03 C9                 - add ecx,ecx {then double}
    LRFF13.exe+5BEFE9 - 8D 84 CA C82C0500     - lea eax,[edx+ecx*8+00052CC8] {then multiply by 8, add offset}
    LRFF13.exe+5BEFF0 - 85 C0                 - test eax,eax
    LRFF13.exe+5BEFF2 - 74 32                 - je LRFF13.exe+5BF026 {unsure whats happening here}
    LRFF13.exe+5BEFF4 - 66 89 5C 70 30        - mov [eax+esi*2+30],bx {read value with esi offset and base offset of 0x30}
    esi always seems to be 0 but is likely the second arg to sfGetCharaCounter
    */
    const baseCharaCounterOffset = 0x52CC8;
    const pSoulSeed = base + baseCharaCounterOffset + index * 18*8 + 0x30;
    const counterValue = reader.readMemoryAddress(pSoulSeed, SHORT, true);
    return counterValue;
}

function resolveBtscores(reader: LrMemoryReader, base: number): string[] {
    //Find btscores
    //just want the ids, (stored with time and score value)
    const btscNames: string[] = [];
    for(var offset = 0; offset<50; offset++){
        const btscoreToReadLoc = base + 0x10*offset;
        const constant = reader.readMemoryAddress(btscoreToReadLoc + 4, SHORT, true);
        if(constant == 0){
            break;
        }
        const encounterName = reader.readMemoryAddress(btscoreToReadLoc, INT, true);
        // const encounterScore = reader.readMemoryAddress(btscoreToReadLoc+8, INT, true);
        // const encounterTime = reader.readMemoryAddress(btscoreToReadLoc + 12, INT, true);
        const name = `btsc${encounterName.toString().padStart(5,'0')}`;
        btscNames.push(name);
    }
    return btscNames;
}