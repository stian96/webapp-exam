import { useState } from "react"
import { Goals, EditPopup } from "@/components"
import { Performer } from "@/types/performer"
import { updatePerformerInDatabase } from "@/lib/api"
import "@/style/performer.scss"
import IntensityPopup from "../layout/popups/IntensityPopup"

export type PerformerProps = {
    performer: Performer
    performers: Performer[]
    setPerformers: React.Dispatch<React.SetStateAction<Performer[]>>
}

const Performer = ({ performer, performers, setPerformers }: PerformerProps) => {
    const [showPopup, setShowPoup] = useState(false)

    const updatePerformer = async (updatedPerformer: Performer) => {
        const success = await updatePerformerInDatabase(updatedPerformer)
        if (success) {
            const updatedPerformers = performers.map(p => p.id === updatedPerformer.id ? updatedPerformer : p)
            setPerformers(updatedPerformers)
        } else {
            console.error(`Failed to update performer with ID: ${updatedPerformer.userId}`)
        }
    }

    const handlePopup = () => setShowPoup(!showPopup)

    return (
        <tr>
            <td>
                <EditPopup 
                    editPerformer={performer} 
                    setEditPerformer={updatePerformer}
                />
                <button className="button intensity-btn float-right" onClick={handlePopup}>
                    Calculate Intensity
                </button>
                { showPopup && 
                    <IntensityPopup
                        header={"What fields do you want to calculate for?"} 
                        isOpen={showPopup} 
                        onClose={handlePopup}
                        currentPerformer={performer}
                    /> 
                }
                <div className="performer w-full">
                    <div className="performer__outer mb-4">
                        <div className="performer__outer__inner">
                            <p className="performer__outer__inner-name">ID: {performer.userId}</p>
                            <p className="performer__outer__inner-gender">Gender: {performer.gender}</p>
                            <p className="performer__outer__inner-sport">Sport: {performer.sport}</p>
                        </div>
                        <div className="performer__outer__inner">
                            <p className="performer__outer__inner-pulse">Pulse: {performer.heartRate}</p>
                            <p className="performer__outer__inner-speed">Speed: {performer.speed}</p>
                            <p className="performer__outer__inner-watt">Watt: {performer.watt}</p>
                        </div>
                    </div>
                    <Goals performerId={performer.id} />
                </div>
            </td>
        </tr>
    );
}

export default Performer