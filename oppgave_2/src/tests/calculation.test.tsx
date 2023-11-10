import { calculateIntensityZones } from "@/types/performer";
import { IntensityZone } from "@/types/performer"

describe("Calculation Test", () => {
    const maxHeartRate = 200

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
})