import { DateTime, TimeRange } from "./model";

export function isTimeInRange(time: DateTime, range: TimeRange): boolean {
    const parsed = parseRange(range);
    if(time.day < parsed.from.day || time.day > parsed.to.day){
        return false;
    }
    if(!isHourInRange(time.hour, parsed.from.hour, parsed.to.hour)){
        return false;
    }
    return parsed.from.minute <= time.minute && time.minute <= parsed.to.minute;
}

function parseRange(range: TimeRange): {from: DateTime, to: DateTime} {
    const fromDay = range.fromDate?.valueOf() ?? 0;
    const toDay = range.toDate?.valueOf() ?? 13;
    const [fromHour, fromMinute] = range.from.split(':');
    const [toHour, toMinute] = range.to.split(':');
    return {
        from: {
            day: fromDay,
            hour: Number(fromHour) ?? 6,
            minute: Number(fromMinute) ?? 0
        },
        to: {
            day: toDay,
            hour: Number(toHour) ?? 6,
            minute: Number(toMinute) ?? 0
        }
    };
}

// Since days tick over at 6am we have to be a little careful
function isHourInRange(hour: number, from: number, to: number): boolean {
    if(from === 6 && to === 6){
        return true;
    }
    const normHour = (hour + 18) % 24;
    const normFrom = (from + 18) % 24;
    const normTo = (to + 18) % 24;
    return normFrom <= normHour && normHour <= normTo;
}