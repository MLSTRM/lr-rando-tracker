import { MainQuestPosition, SideQuestProgress } from 'lr-rando-core';

export interface RandoMemoryState {
    region: {
        map: string;
        zone: string;
        known?: boolean;
    };
    gil: number;
    maxEP: number;
    recoveryItemSlots: number;
    epAbilities: string[];
    time: {
        trueDay: number;
        day: number;
        hour: number;
        minute: number;
    };
    schemas: {
        active: string;
        slot1: string;
        slot2: string;
        slot3: string;
    };
    odinHealth: number;
    keyItems: Map<string, number>;
    items: Map<string, number>;
    garbs: string[];
    mainQuestProgress: MainQuestPosition;
    sideQuestProgress: {[key: number]: SideQuestProgress[]};
    canvasOfPrayers: {
        accepted: {[key: number]: string[]},
        completed: {[key: number]: string[]}
    };
    soulSeeds: number;
    unappraised: number;
}

// data type constants
export const BYTE = 'byte';
export const INT = 'int';
export const INT32 = 'int32';
export const UINT32 = 'uint32';
export const INT64 = 'int64';
export const UINT64 = 'uint64';
export const DWORD = 'dword';
export const SHORT = 'short';
export const LONG = 'long';
export const FLOAT = 'float';
export const DOUBLE = 'double';
export const BOOL = 'bool';
export const BOOLEAN = 'boolean';
export const PTR = 'ptr';
export const POINTER = 'pointer';
export const STR = 'str';
export const STRING = 'string';
export const VEC3 = 'vec3';
export const VECTOR3 = 'vector3';
export const VEC4 = 'vec4';
export const VECTOR4 = 'vector4';