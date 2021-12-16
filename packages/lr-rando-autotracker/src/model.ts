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
    };
    odinHealth: number;
    keyItems: Map<string, number>;
    items: Map<string, number>;
    mainQuestProgress: MainQuestPosition;
    sideQuestProgress: {[key: string]: SideQuestProgress[]};
    canvasOfPrayers: {
        accepted: {[key: string]: string[]},
        completed: {[key: string]: string[]}
    }
}