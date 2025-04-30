import { airportType } from "@/types";

export function formatDate(created_at: string) {
    const date = new Date(created_at);
    const formatted = date.toLocaleDateString("en-US", {
        month: "long",
        day:   "numeric",
        year:  "numeric",
    });
    return formatted;
};

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