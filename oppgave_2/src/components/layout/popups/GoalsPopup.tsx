import { useState } from "react"
import { createNewGoalInDatabase } from "../../../lib/api"
import { PriorityEnum } from "@/enums/PriorityEnum"
import Popup from "reactjs-popup"
import PopupCont from "./PopupContent"

import "../../../style/popup.scss"

type GoalsPopupProps = {
    goalId: string,
    performerId: string
    editClicked: boolean
    setEditClicked: (value: boolean) => void 
}

const GoalsPopup = ({ goalId, performerId, editClicked, setEditClicked }: GoalsPopupProps) => {
    const [goalInput, setGoalInput] = useState({
        name: "",
        date: "",
        year: "",
        goal: "",
        comments: "",
        competition: "",
        priority: PriorityEnum.A
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGoalInput({...goalInput, [event.target.name]: event.target.value});
    };


    const handleSave = async () => {
        const parsedDate = new Date(goalInput.date)

        const newGoal = {
            id: goalId,
            name: goalInput.name,
            date: parsedDate,
            goal: goalInput.goal,
            comments: goalInput.comments,
            isCompetition: goalInput.competition === "yes" ? true : false,
            priority: PriorityEnum.A
        }
        const success = await createNewGoalInDatabase(newGoal, performerId, parseInt(goalInput.year))
        if (success) {
            console.log("Goal created/updated successfully!")
        }
        else {
            console.error("Failed to create/update goal...")
        }
        setEditClicked(false)
    }

    const inputFields: string[] = ["Name", "Date", "Year", "Goal", "Competition", "Comments"]

    const close = () => setEditClicked(!editClicked)

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