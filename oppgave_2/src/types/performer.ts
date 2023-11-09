export type Performer = {
    id: string,
    userId: string,
    gender: string,
    sport: string,
    heartRate: number,
    watt: number,
    speed: number,
    activity: Array<SessionActivity?>
}

// Intensity zones in percentages. 
export enum IntensityZone {
    Zone1 = 50,
    Zone2 = 60,
    Zone3 = 70,
    Zone4 = 80,
    Zone5 = 90
}

// Can be used to calculate intensity zones for heartrate, watt and speed. 
export const calculateIntensityZones = (threshold: number, zone: IntensityZone): number => {
    return threshold * (zone / 100)
}


