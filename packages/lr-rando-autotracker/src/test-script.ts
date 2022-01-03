import { BYTE, DWORD, INT, INT64, SHORT } from "memoryjs";
import { LrMemoryReader } from "./memoryReader";
import { resolveDateTime } from "./datetime";
import { prettyPrintEpAbility, extractZoneInfo, getSideQuestProgress, inflateCanvasBytes, Areas } from 'lr-rando-core';
import { stripNullChars } from ".";

//CONFIG
const reader = new LrMemoryReader(false);
const showItems = false;
const showGarbs = false;
const showSchemaInfo = true;
const showEpAbilitiesEtc = false;
const showSideQuests = false;
const showCanvasQuests = false;
const loop = false;

//Info
const someStatsBaseLocation = 0x4CF79D8; //Initial pointer into interesting memory block
const schemaLength = 0x130;
const schemaOffset = 0x148; //pSomeStatsBase -> schema location
const keyItemLength = 0x18;
const keyItemAmountOffset = 0x12;
const keyItemsOffset = 0x158C; //Offset from pSomeStatsBase to key item pointer
const itemOffset = 0x16AC; //Offset from pSomeStatsBase to main item pointer
const gameHeader = 0x1968;
const recoveryItemOffset = 0x1418;
const chocoboOffset = 0x1A48;
const sideQuestOffset = 0xAF10;
const canvasOffsetMaybe = 0xC0F0;
const charaCounterBaseLocation = 0x20D252C;

const epAbilitiesMaybe = 0x17B50;

const interval = setInterval(async () => {
    try {
        if(!reader.isAttached()){
            console.log(`Attaching to process`);
            await reader.tryAttach();
            if(reader.isAttached()){
                const pSomeStatsBase = reader.readMemoryAddress(someStatsBaseLocation, DWORD);
                const headerLocation = pSomeStatsBase + gameHeader;
                const header = reader.readBuffer(headerLocation, 13, true)?.toString();
                if(header === "white_0000002"){
                    console.log(`Verified reader!`);
                }
            }
        } else {
            const pSomeStatsBase = reader.readMemoryAddress(someStatsBaseLocation, DWORD);
            console.log(`Reading pSomeStatsBase location as: ${pSomeStatsBase.toString(16)}`);
            const map = reader.readBuffer(pSomeStatsBase + gameHeader+0x50, 13, true).toString() ?? '';
            const zone = reader.readBuffer(pSomeStatsBase + gameHeader+0x50+0x10, 14, true).toString() ?? '';
            console.log(`Reading region info as: ${JSON.stringify(extractZoneInfo(map, zone))}`);
            console.log(`reading Gil pointer as: ${reader.readMemoryAddress(pSomeStatsBase + 0x2844, INT, true)}`);
            console.log(`reading Current EP as: ${reader.readMemoryAddress(pSomeStatsBase + 0x2880, INT, true) / 2000}`);
            console.log(`reading Max EP as: ${reader.readMemoryAddress(pSomeStatsBase + 0x2884, INT, true) / 2000}`);
            console.log(`recovery item slots: ${reader.readMemoryAddress(pSomeStatsBase + recoveryItemOffset, BYTE, true)}`);
            console.log(`Odin health: ${reader.readMemoryAddress(pSomeStatsBase + chocoboOffset, SHORT, true)}`);
            // Seems not...
            /*
            console.log(`Luxerion maybe not: 1-${reader.readMemoryAddress(pSomeStatsBase + chocoboOffset - 0x2A, BYTE, true)}`);
            console.log(`Yusnaan maybe: 2-${reader.readMemoryAddress(pSomeStatsBase + chocoboOffset - 0x2B, BYTE, true)}`);
            console.log(`Dunes maybe: 4-${reader.readMemoryAddress(pSomeStatsBase + chocoboOffset + 0x11, BYTE, true)}`);
            console.log(`Sazh maybe: 5-${reader.readMemoryAddress(pSomeStatsBase + chocoboOffset - 0x14, BYTE, true)}`);
            */
            console.log(`Luxerion main quest progress: ${reader.readMemoryAddress(pSomeStatsBase + gameHeader+0x50+0x64, SHORT, true)}`);
            console.log(`Yusnaan main quest progress: ${reader.readMemoryAddress(pSomeStatsBase + gameHeader+0x50+0x78, SHORT, true)}`);
            console.log(`Wildlands main quest progress: ${reader.readMemoryAddress(pSomeStatsBase + gameHeader+0x50+0x94, SHORT, true)}`);
            console.log(`Wildlands main quest second marker: ${reader.readMemoryAddress(pSomeStatsBase + gameHeader+0x50+0x8c, SHORT, true)}`);
            console.log(`Dead dunes main quest progress: ${reader.readMemoryAddress(pSomeStatsBase + gameHeader+0x50+0xA0, SHORT, true)}`);
            console.log(`Soul seeds: ${reader.readMemoryAddress(pSomeStatsBase + gameHeader+0x50+(57*8)+6, BYTE, true)}`);

            const pItems = reader.readMemoryAddress(pSomeStatsBase + recoveryItemOffset+0x294, DWORD, true);
            console.log(`item pointer: ${pItems.toString(16)}`);
            const pKeyItems = reader.readMemoryAddress(pSomeStatsBase + recoveryItemOffset+0x174, DWORD, true);
            console.log(`key item pointer: ${pKeyItems.toString(16)}`);
            const pGarbs = reader.readMemoryAddress(pSomeStatsBase + recoveryItemOffset+0x174 + 0x180, DWORD, true);
            console.log(`garb list pointer: ${pGarbs.toString(16)}`);


            if(showEpAbilitiesEtc){
                const EpAbilities: string[] = [];
                let unknown = 0;
                for(var i = 0; i<50; i++){
                    const offset = pSomeStatsBase + epAbilitiesMaybe + 0x10*i;
                    const ability = reader.readBuffer(offset, 8, true)?.toString();
                    const {known, name} = prettyPrintEpAbility(ability);
                    if(known){
                        EpAbilities.push(name);
                    } else {
                        unknown++;
                    }
                }
                console.log(`EP abilities: ${EpAbilities.join(", ")}`);
                console.log(`Unknown entries in region: ${unknown}`);
            }

            const dayTime = reader.readMemoryAddress(pSomeStatsBase - 0x10680+0x100000, INT64, true);
            const destructuredDayTime = resolveDateTime(dayTime);
            console.log(`reading Day as: ${reader.readMemoryAddress(pSomeStatsBase + 0x1A6E, BYTE, true)}`);
            console.log(`reading Day/Time as: ${JSON.stringify(destructuredDayTime)}`);

            const activeSchemaIndex = reader.readMemoryAddress(pSomeStatsBase + 0xBF, BYTE, true);
            if(showSchemaInfo){
                // Nocturne shows as "Nocturneour" ?? Check region with CE
                console.log(`schema info memory region start: ${(pSomeStatsBase + schemaOffset).toString(16)}`);
                console.log(`reading Schema 1 as: ${stripNullChars(reader.readBuffer(pSomeStatsBase + schemaOffset, 64, true), true)}`);
                console.log(`reading Schema 2 as: ${stripNullChars(reader.readBuffer(pSomeStatsBase + schemaOffset + schemaLength, 64, true), true)}`);
                console.log(`reading Schema 3 as: ${stripNullChars(reader.readBuffer(pSomeStatsBase + schemaOffset + (schemaLength*2), 64, true), true)}`);
                console.log(`Active schema index: ${reader.readMemoryAddress(pSomeStatsBase + 0xBF, BYTE, true)}`);
            }
            console.log(`Overworld garb: ${reader.readBuffer(pSomeStatsBase + schemaOffset + (schemaLength * activeSchemaIndex), 32, true)?.toString()}`);
            if(showItems){
                console.log('Key item info');
                // 299 key item slots?!?
                for(var i = 0; i<100; i++){
                    //can early exit if item is empty
                    //This still has 16 length even though it shows nothing. Unprinting null chars??
                    const item = reader.readBuffer(pKeyItems + (keyItemLength*i), 16, true)?.toString();
                    const count = reader.readMemoryAddress(pKeyItems + (keyItemLength*i) + keyItemAmountOffset, BYTE, true);
                    if(count > 0){
                        console.log(`Key item ${i}: "${item}" - count ${count}`);
                    } else {
                        break;
                    }
                }
                console.log('item info');
                // Only 99 item slots?
                for(var i = 0; i<50; i++){
                    const item = reader.readBuffer(pItems + (keyItemLength*i), 16, true)?.toString();
                    const count = reader.readMemoryAddress(pItems + (keyItemLength*i) + keyItemAmountOffset, BYTE, true);
                    if(count > 0){
                        console.log(`item ${i}: "${item}" - count ${count}`);
                    } else {
                        break;
                    }
                }
            }
            if(showGarbs){
                console.log('garb list');
                for(var i = 0; i<100; i++){
                    const item = reader.readBuffer(pGarbs + (keyItemLength*i), 16, true);
                    const stripped = stripNullChars(item);
                    if(stripped.length > 0){
                        console.log(stripped);
                    }
                }
            }

            if(showSideQuests){
                for(var i = 0; i<99; i++){
                    const questProgress = reader.readMemoryAddress(pSomeStatsBase + sideQuestOffset + (0x8 * i), SHORT, true);
                    if(questProgress > 0){
                        console.log(`Side quest ${i} (${questProgress}) - ${JSON.stringify(getSideQuestProgress(undefined, i, questProgress))}`);
                    }
                }
            }

            if(showCanvasQuests){
                const canvasAcceptBuffer = reader.readBuffer(pSomeStatsBase + canvasOffsetMaybe, 40, true);
                const canvasAcceptArr = Uint8Array.from(canvasAcceptBuffer);
                console.log(`Accepted canvas of prayers quests:`);
                console.log([...canvasAcceptArr].map(b=>b.toString(16)));
                console.log(`Luxerion: ${inflateCanvasBytes(Areas.LUXERION, canvasAcceptArr.slice(0,3))}`);
                console.log(`Yusnaan: ${inflateCanvasBytes(Areas.YUSNAAN, canvasAcceptArr.slice(6,10))}`);
                console.log(`Wildlands: ${inflateCanvasBytes(Areas.WILDLANDS, canvasAcceptArr.slice(12,16))}`);
                console.log(`Dead dunes: ${inflateCanvasBytes(Areas.DEAD_DUNES, canvasAcceptArr.slice(18,22))}`);
                console.log(`Global: ${inflateCanvasBytes(Areas.GLOBAL, canvasAcceptArr.slice(37,40))}`);
                
                const canvasDoneBuffer = reader.readBuffer(pSomeStatsBase + canvasOffsetMaybe + 0x40, 40, true);
                const canvasDoneArr = Uint8Array.from(canvasDoneBuffer);
                console.log(`Completed canvas of prayers quests:`);
                console.log([...canvasDoneArr].map(b=>b.toString(16)));
                console.log(`Luxerion: ${inflateCanvasBytes(Areas.LUXERION, canvasDoneArr.slice(0,3))}`);
                console.log(`Yusnaan: ${inflateCanvasBytes(Areas.YUSNAAN, canvasDoneArr.slice(6,10))}`);
                console.log(`Wildlands: ${inflateCanvasBytes(Areas.WILDLANDS, canvasDoneArr.slice(12,16))}`);
                console.log(`Dead dunes: ${inflateCanvasBytes(Areas.DEAD_DUNES, canvasDoneArr.slice(18,22))}`);
                console.log(`Global: ${inflateCanvasBytes(Areas.GLOBAL, canvasDoneArr.slice(37,40))}`);
                // TODO: fill in byte info for other regions than luxerion
            }

            const pCharaCounterBase = reader.readMemoryAddress(charaCounterBaseLocation, DWORD);
            console.log(`pCharaCounterBase: ${pCharaCounterBase.toString(16)}`);
            const baseCharaCounterOffset = 0x52CC8;
            const charaCounterIndex = 825;
            const pSoulSeed = pCharaCounterBase + baseCharaCounterOffset + charaCounterIndex * 18*8 + 0x30;
            const soulSeedsMaybe = reader.readMemoryAddress(pSoulSeed, SHORT, true);
            console.log(`${pCharaCounterBase.toString(16)} + ${baseCharaCounterOffset.toString(16)} + ${(charaCounterIndex*18*8).toString(16)} + 0x30 = ${pSoulSeed.toString(16)}`);
            console.log(`Soul seeds: ${soulSeedsMaybe}`);

            if(!loop){
                reader.detatch();
                clearInterval(interval);
            }
        }
    } catch (err){
        console.log(`error: ${err}`);
        clearInterval(interval);
    }
}, 2000);

// For some reason CE's offsets are different to the raw ones, presumably because of some kind of header ignoring/addition idk.
// Need to manually recalc all pointers and then can pull the differences off the cheat table directly.

// Done:
// pSomeStatsBase (Gil, EP, Date, schema stuff if I want to)
// key items inventory location
// item inventory location
// Active overworld schema resolution
// Current area id/name (started)

// TODO:
// Quest progress
// Current area id/name?
// Bosses killed (from quest progress maybe)
// Clean up offset calcs
// recovery item slots
// key item name mappings

// Define output struct
// Create basic ui?

// key items track peak/current/cumulative for different uses (i.e. cruxes)

// Offset calc
//                0xDE9F1258
// pSomeStatsBase 0xde9efe40
// 0x17B50

//HEADER = 'white_0000002'


// Item start - 0xDCDA0D50
// pSomeStats - 0xDE0551D0


// boss mappings in btscore
/*


"1480║$btscore000" = "Caius Ballad-"; //tutorial
"1481║$btscore001" = "Ereshkigal-"; //noel
"1482║$btscore002" = "Ereshkigal-";
"1483║$btscore003" = "Grendel"; //snow
"1484║$btscore004" = "Parandus";
"1485║$btscore005" = "Parandus";
"1486║$btscore006" = "Snow Villiers++"; //wildlands
"1487║$btscore007" = "Zaltys+"; //dead dunes
"1488║$btscore008" = "Zaltys+";
"1489║$btscore009" = "Bhunivelze"; //final
"1490║$btscore010" = "Bhunivelze+";
"1491║$btscore011" = "Zaltys"; //unused?
"1492║$btscore050" = "Aeronite";
"1493║$btscore051" = "Noel Kreiss++"; //ultimate lair

*/