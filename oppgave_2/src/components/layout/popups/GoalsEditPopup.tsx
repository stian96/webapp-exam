import { useState } from "react"
import PopupCont from "@/components/layout/popups/PopupContent"
import { saveGoalsToDb } from "@/lib/dbOperation"
import { PriorityEnum } from "@/enums/PriorityEnum"
import { GoalsInput } from "@/types/goalsInput"
import Popup from "reactjs-popup"

import "@/style/popup.scss"

type GoalsPopupProps = {
    goalId: string,
    performerId: string
    editClicked: boolean
    setEditClicked: (value: boolean) => void 
    onGoalUpdate: (updatedGoal: GoalsInput) => void
}

const GoalsPopup = ({ goalId, editClicked, setEditClicked, onGoalUpdate }: GoalsPopupProps) => {
    const [goalInput, setGoalInput] = useState({
        id: "",
        name: "",
        date: "",
        year: "",
        goal: "",
        comments: "",
        isCompetition: "",
        priority: PriorityEnum.A
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGoalInput({...goalInput, [event.target.name]: event.target.value});
    };

    const handleSave = async () => {
        saveGoalsToDb(goalInput, goalId)
        onGoalUpdate(goalInput)
        setEditClicked(false)
    }
    const close = () => setEditClicked(!editClicked)

    const inputFields: string[] = ["Name", "Date", "Year", "Goal", "Competition", "Comments"]
    return (
        <div className={`overlay ${editClicked ? 'overlay-active': ''}`}>
            <Popup open={editClicked} closeOnDocumentClick onClick={close}>
                <PopupCont 
                    header={"Edit Goal"} 
                    inputElements={inputFields} 
                    close={close} 
                    handleChange={handleChange}
                    handleSave={handleSave}
                />
            </Popup>
        </div>
    )
}

export default GoalsPopup