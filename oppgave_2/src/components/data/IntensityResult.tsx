import { IntensityZone } from "@/types/performer";
import { CalculationResults } from "../layout/popups/IntensityPopup";

import "@/style/intensityResult.scss"

type IntensityResultProps = {
    results: CalculationResults
    selectedOptions: {
        heartRate: boolean
        speed: boolean
        watt: boolean
    }
    selectedZone: IntensityZone | "all"
}

const IntensityResult = ({ results, selectedOptions, selectedZone }: IntensityResultProps) => {

    const heartRateList = results.heartRate as number[]
    const speedList = results.speed as number[]
    const wattList = results.watt as number[]

    const isAllZone = selectedZone === "all"

    const mapSelectedZone = (zone: IntensityZone | "all") => {
        let result = ""
        switch (Number(zone)) {
            case 50: result = "Zone 1"
                break
            case 60: result = "Zone 2"
                break
            case 70: result = "Zone 3"
                break
            case 80: result = "Zone 4"
                break
            case 90: result = "Zone 5"
                break
            default: result = "Unknown"
        }
        return result
    }

    return (
        <div className="intensity-results flex gap-14">
            { selectedOptions.heartRate && heartRateList.length > 0 && (
                <div className="flex flex-col">
                    <h1 className="mb-4">Result of Pulse</h1>
                    { heartRateList.map((item, index) => (
                        <span className="flex mb-2" key={`hr-zone-${index}`} >
                            {isAllZone ? `Zone: ${index + 1}` : mapSelectedZone(selectedZone)}: {item.toFixed(2)}
                        </span>
                    ))}
                </div>
            )}
            {selectedOptions.speed && speedList.length > 0 && (
                <div className="flex flex-col">
                    <h1 className="mb-4">Result of Speed</h1>
                    { speedList.map((item, index) => (
                        <span className="flex mb-2" key={`speed-zone-${index}`} >
                            {isAllZone ? `Zone: ${index + 1}` : mapSelectedZone(selectedZone)}: {item.toFixed(2)}
                        </span>
                    ))}
                </div>
            )}
            {selectedOptions.watt && wattList.length > 0 && (
                <div className="flex flex-col">
                    <h1 className="mb-4">Result of Watt</h1>
                    { wattList.map((item, index) => (
                        <span className="flex mb-2" key={`watt-zone-${index}`} >
                            {isAllZone ? `Zone: ${index + 1}` : mapSelectedZone(selectedZone)}: {item.toFixed(2)}
                        </span>
                    ))}
                </div>
            )}
        </div>
    )
}

export default IntensityResult