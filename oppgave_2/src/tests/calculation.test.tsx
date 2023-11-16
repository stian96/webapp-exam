import { calculateIntensityZones } from "@/types/performer";
import { IntensityZone } from "@/types/performer"

describe("Calculation Test", () => {
    const maxHeartRate = 200
    const maxWatt = 300
    const maxSpeed = 30

    it("Should calculate intensity zone for heart rate in zone1", () => {
        const zone1 = calculateIntensityZones(maxHeartRate, IntensityZone.Zone1)
        expect(zone1 === (200 * (50 / 100)))
    })

    it("Should calculate intensity zone for heart rate in zone2", () => {
        const zone2 = calculateIntensityZones(maxHeartRate, IntensityZone.Zone2)
        expect(zone2 === (200 * (60 / 100)))
    }) 

    it("Should calculate intensity zone for heart rate in zone3", () => {
        const zone3 = calculateIntensityZones(maxHeartRate, IntensityZone.Zone3)
        expect(zone3 === (200 * (70 / 100)))
    })

    it("Should calculate intensity zone for heart rate in zone4", () => {
        const zone4 = calculateIntensityZones(maxHeartRate, IntensityZone.Zone4)
        expect(zone4 === (200 * (80 / 100)))
    })

    it("Should calculate intensity zone for heart rate in zone5", () => {
        const zone5 = calculateIntensityZones(maxHeartRate, IntensityZone.Zone5)
        expect(zone5 === (200 * (90 / 100)))
    })

    it("Should calculate intensity zone for watt in zone1", () => {
        const zone1 = calculateIntensityZones(maxWatt, IntensityZone.Zone1)
        expect(zone1 === (300 * (IntensityZone.Zone1 / 100)))
    })

    it("Should calculate intensity zone for watt in zone2", () => {
        const zone2 = calculateIntensityZones(maxWatt, IntensityZone.Zone2)
        expect(zone2 === (300 * (IntensityZone.Zone2 / 100)))
    })

    it("Should calculate intensity zone for watt in zone3", () => {
        const zone3 = calculateIntensityZones(maxWatt, IntensityZone.Zone3)
        expect(zone3 === (300 * (IntensityZone.Zone3 / 100)))    
    })

    it("Should calculate intensity zone for watt in zone4", () => {
        const zone4 = calculateIntensityZones(maxWatt, IntensityZone.Zone4)
        expect(zone4 === (300 * (IntensityZone.Zone4 / 100)))
    })

    it("Should calculate intensity zone for watt in zone5", () => {
        const zone5 = calculateIntensityZones(maxWatt, IntensityZone.Zone5)
        expect(zone5 === (300 * (IntensityZone.Zone5 / 100)))  
    })

    it("Should calculate intensity zone for speed in zone1", () => {
        const zone1 = calculateIntensityZones(maxSpeed, IntensityZone.Zone1)
        expect(zone1 === (30 * (IntensityZone.Zone1 / 100)))
    })

    it("Should calculate intensity zone for speed in zone2", () => {
        const zone2 = calculateIntensityZones(maxSpeed, IntensityZone.Zone2)
        expect(zone2 === (30 * (IntensityZone.Zone2 / 100)))
    })

    it("Should calculate intensity zone for speed in zone3", () => {
        const zone3 = calculateIntensityZones(maxSpeed, IntensityZone.Zone3)
        expect(zone3 === (30 * (IntensityZone.Zone3 / 100)))
    })

    it("Should calculate intensity zone for speed in zone4", () => {
        const zone4 = calculateIntensityZones(maxSpeed, IntensityZone.Zone4)
        expect(zone4 === (30 * (IntensityZone.Zone4 / 100)))  
    })

    it("Should calculate intensity zone for speed in zone5", () => {
        const zone5 = calculateIntensityZones(maxSpeed, IntensityZone.Zone5)
        expect(zone5 === (30 * (IntensityZone.Zone5 / 100)))
    })
})