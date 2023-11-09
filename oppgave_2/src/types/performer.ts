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

// Returns an overview of the number of heartbeats per minute for the 5 intensity zones.
export const calculateHeartRateZone = (maxHeartRate: number) => {
    return intensityZones.map(zone => maxHeartRate * (zone / 100))
}


