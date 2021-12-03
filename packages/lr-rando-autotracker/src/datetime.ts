/*
1350000000:06:00 (Day 1)
1395000000:07:00 (Day 1)
1440000000:08:00 (Day 1)
1485000000:09:00 (Day 1)
1530000000:10:00 (Day 1)
1575000000:11:00 (Day 1)
1620000000:12:00 (Day 1)
1665000000:13:00 (Day 1)
1710000000:14:00 (Day 1)
1755000000:15:00 (Day 1)
1800000000:16:00 (Day 1)
1845000000:17:00 (Day 1)
1890000000:18:00 (Day 1)
1935000000:19:00 (Day 1)
1980000000:20:00 (Day 1)
2025000000:21:00 (Day 1)
2070000000:22:00 (Day 1)
2115000000:23:00 (Day 1)
2160000000:00:00 (Day 2)
2205000000:01:00 (Day 2)
2250000000:02:00 (Day 2)
2295000000:03:00 (Day 2)
2340000000:04:00 (Day 2)
2385000000:05:00 (Day 2)
2430000000:06:00 (Day 2)
*/
// 45,000,000 = 1h
// 1 day = 1,080,000,000 ?


export function resolveDateTime(base: number): { day: number, hour: number; minute: number;} {
    //Known issue: this doesn't work on ark/final day? Or on day 3+? Pointer drifted...
    const baseDay1 = 1350000000;
    const offset = base-baseDay1;
    //console.log(`date offset: ${offset} from base: ${base}`);
    const day = 1 + Math.floor(offset / 1080000000);
    const time = offset % 1080000000;
    const hour = (6 + Math.floor(time/45000000)) % 24;
    const minute = Math.floor((time % 45000000)*60/45000000);
    return {day, hour, minute};
}

export function generatePredictedValueFromDateTime(day: number, hour: number, minute: number): bigint {
    const minuteTime = BigInt((minute/60)*45000000);
    const hourTime = BigInt((hour - 6)*45000000);
    const time = BigInt(minuteTime + hourTime);
    const resolvedDay = BigInt((day - 1)*1080000000);
    return resolvedDay + time;
}