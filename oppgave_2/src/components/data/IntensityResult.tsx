import { IntensityZone } from "@/types/performer";
import ZoneResultList from "./ZoneResultList";
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

    return (
        <div className="intensity-results flex gap-14">
            <ZoneResultList 
                option={selectedOptions.heartRate}
                array={heartRateList}
                all={isAllZone}
                key={"hr-zone"}
                title={"Result for Pulse"}
                selectedZone={selectedZone}
            />
            <ZoneResultList 
                option={selectedOptions.speed}
                array={speedList}
                all={isAllZone}
                key={"speed-zone"}
                title={"Result for Speed"}
                selectedZone={selectedZone}
            />
            <ZoneResultList 
                option={selectedOptions.watt}
                array={wattList}
                all={isAllZone}
                key={"watt-zone"}
                title={"Result for Watt"}
                selectedZone={selectedZone}
            />
        </div>
    )
}

export default IntensityResult