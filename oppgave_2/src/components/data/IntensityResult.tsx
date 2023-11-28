import { CalculationResults } from "../layout/popups/IntensityPopup";

type IntensityResultProps = {
    results: CalculationResults
    selectedOptions: {
        heartRate: boolean
        speed: boolean
        watt: boolean
    }
}

const IntensityResult = ({ results, selectedOptions }: IntensityResultProps) => {

    const heartRateList = results.heartRate as number[]
    const speedList = results.speed as number[]
    const wattList = results.watt as number[]

    return (
        <div className="intensity-results">
            { selectedOptions.heartRate && heartRateList.length > 0 && (
                <>
                    <h1>Result of Pulse Zones</h1>
                    { heartRateList.map((item, index) => (
                        <span key={`hr-zone-${index}`} >
                            Zone {index + 1}: {item.toFixed(2)}
                        </span>
                    ))}
                </>
            )}
            {selectedOptions.speed && speedList.length > 0 && (
                <>
                    <h1>Result of Speed Zones</h1>
                    { speedList.map((item, index) => (
                        <span key={`speed-zone-${index}`} >
                            Zone {index + 1}: {item.toFixed(2)}
                        </span>
                    ))}
                </>
            )}
            {selectedOptions.watt && wattList.length > 0 && (
                <>
                    <h1>Result of Watt Zones</h1>
                    { wattList.map((item, index) => (
                        <span key={`watt-zone-${index}`} >
                            Zone {index + 1}: {item.toFixed(2)}
                        </span>
                    ))}
                </>
            )}
        </div>
    )
}

export default IntensityResult