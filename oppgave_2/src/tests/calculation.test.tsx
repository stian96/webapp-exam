import { calculateIntensityZones } from "@/types/performer";
import { IntensityZone } from "@/types/performer"

describe("Calculation Test", () => {
    it("Should calculate intensity zone for heartrate", () => {

        const maxHeartRate = 200
        const zone1 = calculateIntensityZones(maxHeartRate, IntensityZone.Zone1)
        const zone2 = calculateIntensityZones(maxHeartRate, IntensityZone.Zone2)
        const zone3 = calculateIntensityZones(maxHeartRate, IntensityZone.Zone3)
        const zone4 = calculateIntensityZones(maxHeartRate, IntensityZone.Zone4)
        const zone5 = calculateIntensityZones(maxHeartRate, IntensityZone.Zone5)

        expect(zone1 === (200 * (50 / 100)))
        expect(zone2 === (200 * (60 / 100)))
        expect(zone3 === (200 * (70 / 100)))
        expect(zone4 === (200 * (80 / 100)))
        expect(zone5 === (200 * (90 / 100)))
    })
})