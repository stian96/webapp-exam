import { useState } from "react"
import PopupGoalEdit from "@/components/layout/popups/PopupGoalEdit"
import { Goal } from "@/types/classes/goal"
import { saveGoalsToDb } from "@/lib/dbOperation"
import Popup from "reactjs-popup"

import "@/style/popup.scss"
import { GoalsInput } from "@/types/goalsInput"

type GoalsPopupProps = {
    goalId: string,
    performerId: string
    editClicked: boolean
    setEditClicked: (value: boolean) => void 
    onGoalUpdate: (updatedGoal: GoalsInput) => void
    initialGoalData: Goal
}

const GoalsEditPopup = ( props :GoalsPopupProps) => {
    const [goalInput, setGoalInput] = useState({ ...props.initialGoalData, year: ""})

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGoalInput({...goalInput, [event.target.name]: event.target.value});
    };

    const handleSave = async () => {
        saveGoalsToDb(goalInput, props.performerId, props.goalId, goalInput.year)
        const updatedGoal = { 
            ...goalInput, 
            date: goalInput.date ? new Date(goalInput.date) : null
        }
        props.onGoalUpdate(updatedGoal)
        props.setEditClicked(false)
    }

    const close = () => props.setEditClicked(!props.editClicked)

    const inputFields: string[] = ["Name", "Date", "Goal", "Comment"]
    return (
        <div className={`overlay ${props.editClicked ? 'overlay-active': ''}`}>
            <Popup open={props.editClicked} closeOnDocumentClick onClick={close}>
                <PopupGoalEdit 
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

export default GoalsEditPopup