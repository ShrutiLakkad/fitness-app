export interface Activity {
    id: string;
    name: string;
    date: string;
    duration: number;
    distance?: number | null;
    calories_burned: number;
    heart_rate: HeartRateOrSpeed;
    steps?: number | null;
    pace?: Pace | null;
    elevation_gain?: number | null;
    speed?: HeartRateOrSpeed1 | null;
    reps?: Reps | null;
    weight_lifted?: WeightLifted | null;
    laps?: number | null;
    pool_length?: number | null;
    strides?: number | null;
    strokes?: number | null;
}
export interface HeartRateOrSpeed {
    average: number;
    max: number;
}
export interface Pace {
    average: number;
    best: number;
}
export interface HeartRateOrSpeed1 {
    average: number;
    max: number;
}
export interface Reps {
    total: number;
    sets: number;
    average_per_set: number;
}
export interface WeightLifted {
    total: number;
    average_per_rep: number;
}