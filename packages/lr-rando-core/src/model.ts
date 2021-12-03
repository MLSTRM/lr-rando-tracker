import { Days, Time } from "./constants";

export interface NpcAvailable {
    name: string, 
    available: TimeRange,
    location?: {
        map: string,
        zone: string
    };
};

export interface TimeRange {
    from: Time,
    to: Time,
    fromDate?: Days,
    toDate?: Days
}

export interface DateTime {
    day: number;
    hour: number;
    minute: number;
}