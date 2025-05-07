export type airportType = {
    name: string;
    icao: string;
    lat: number;
    long: number;
};

export type Aircraft = {
    name: string;
    fuel_tank_size: number;
    fuel_reserve_size: number;
    burn_rate: number;
    speed: number;
}