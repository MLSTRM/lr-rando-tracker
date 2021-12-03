import { Areas } from '../constants';
import { isTimeInRange } from '../datetime';
import { DateTime, NpcAvailable } from '../model';
import { DeadDunesNpcs } from './deaddunes';
import { LuxerionNpcs } from './luxerion';
import { WildlandsNpcs } from './wildlands';

export * from './deaddunes';
export * from './luxerion';
export * from './wildlands';
export * from './yusnaan';

export const NpcRegistry: {[K in Areas]?: {[key: string]: NpcAvailable}} = {
    [Areas.DEAD_DUNES]: DeadDunesNpcs,
    [Areas.LUXERION]: LuxerionNpcs,
    [Areas.WILDLANDS]: WildlandsNpcs,
    [Areas.DEAD_DUNES]: DeadDunesNpcs
};

export function isNpcAvailable(area: Areas, name: string, time: DateTime): boolean {
    const npcInfo = NpcRegistry[area]?.[name];
    if(!npcInfo){
        return false;
    }
    return isTimeInRange(time, npcInfo.available);
}