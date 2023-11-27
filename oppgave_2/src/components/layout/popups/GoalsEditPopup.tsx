import { useState } from "react"
import { competitionField, trainingGoalField } from "@/types/data/goals"
import PopupContent from "@/components/layout/popups/PopupContent"
import { saveGoalsToDb } from "@/lib/dbOperation"
import { PriorityEnum } from "@/enums/PriorityEnum"
import { Goal } from "@/types/classes/goal"
import Popup from "reactjs-popup"

import "@/style/popup.scss"

type GoalsPopupProps = {
    goalId: string,
    performerId: string
    editClicked: boolean
    setEditClicked: (value: boolean) => void 
    onGoalUpdate: (updatedGoal: GoalsCreateInput) => void
    initialGoalData: Goal
}

export type GoalsCreateInput = {
    id: string
    name: string
    date: string
    place: string
    goal: string
    type: string
    isCompetition: boolean
    priority: PriorityEnum
    comment: string
  }
  

const GoalsEditPopup = ( props :GoalsPopupProps) => {
    const [goalInput, setGoalInput] = useState({ ...props.initialGoalData} as GoalsCreateInput ) 
    const competitionFields = competitionField
    const trainingGoalFields = trainingGoalField

    const handleSave = async () => {
        const year = new Date(goalInput.date).getFullYear().toString()
        const updatedGoal = { 
            ...goalInput, 
            goal: goalInput.goal,
            type: goalInput.type,
            location: goalInput.place,
            date: goalInput.date
        }
        saveGoalsToDb(updatedGoal, props.performerId, props.goalId, year, goalInput.goal)
        props.onGoalUpdate(updatedGoal)
        props.setEditClicked(false)
    }

    return (
        <div className={`overlay ${props.editClicked ? 'overlay-active': ''}`}>
            <Popup open={props.editClicked} closeOnDocumentClick onClick={close}>
                <PopupContent 
                    header={goalInput.isCompetition ? "Create Competition Goal" : "Create Training Goal"} 
                    inputElements={goalInput.isCompetition ? competitionFields : trainingGoalFields} 
                    close={() => props.setEditClicked(false)}
                    inputData={goalInput}
                    setInputData={setGoalInput}
                    onSave={handleSave}
                />
            </Popup>
        </div>
    )
}

export default GoalsEditPopup