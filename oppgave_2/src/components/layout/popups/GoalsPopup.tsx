import { useState } from "react"
import { saveGoalsToDb } from "../../../lib/dbOperation"
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

    const handleSave = async () => saveGoalsToDb(goalInput, goalId, setEditClicked)
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