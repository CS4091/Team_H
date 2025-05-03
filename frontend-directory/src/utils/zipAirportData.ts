import { airportType } from "@/types";

export function zipAirportData(
    names: string[],
    icao: string[],
    lats: number[],
    longs: number[]
): airportType[] {
    const count = Math.min(names.length, lats.length, longs.length);
    const result: airportType[] = [];

    for (let i = 0; i < count; i++) {
        result.push({
            name: names[i],
            icao: icao[i],
            lat: lats[i],
            long: longs[i],
        });
    }

    return result;
}