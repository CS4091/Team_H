const COST_PET_KG = 52.5;

export function calcCost(
    burnRate: number,
    total_distance: number,
    speed: number
) {
    console.log(burnRate, total_distance, speed);
    if (speed > 0) {
        return COST_PET_KG * burnRate * total_distance / speed;
    } else {
        return 0;
    }
};