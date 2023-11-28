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

    return (
        <div className="intensity-results">

        </div>
    )
}

export default IntensityResult