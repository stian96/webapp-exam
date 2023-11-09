export type Performer = {
    id: string,
    userId: string,
    gender: string,
    sport: string,
    heartRate: number,
    watt: number,
    speed: number,
}

// Intensity zones in percentages. 
const intensityZones = [50, 60, 70, 80, 90]

// Can be used to calculate intensisty zones for heartrate, watt and speed. 
export const calculateIntensityZones = (threshold: number): number[] => {
    return intensityZones.map(zone => threshold * (zone / 100))
}


