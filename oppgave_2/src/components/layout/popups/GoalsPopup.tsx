import { useState } from "react"
import { createNewGoalInDatabase } from "../../../lib/api"
import Popup from "reactjs-popup"
import PopupCont from "./PopupContent"

import "../../../style/popup.scss"

type GoalsPopupProps = {
    performerId: string
    editClicked: boolean
    setEditClicked: (value: boolean) => void 
}

const GoalsPopup = ({ performerId, editClicked, setEditClicked }: GoalsPopupProps) => {
    const [goalInput, setGoalInput] = useState({
        name: "",
        date: "",
        year: "",
        goal: "",
        comments: ""
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGoalInput({...goalInput, [event.target.name]: event.target.value});
    };


    // TODO: Talk to the team about what to do with the goals.
    const handleSave = async () => {
        const parsedDate = new Date(goalInput.date)
        const newGoal = {
            name: goalInput.name,
            date: parsedDate,
            goal: goalInput.goal,
            comments: goalInput.comments
        }
        const year = parseInt(goalInput.year)
        const success = await createNewGoalInDatabase(newGoal, performerId, year)
        if (success) {
            console.log("Goal created/updated successfully!")
        }
        else {
            console.error("Failed to create/update goal...")
        }
        setEditClicked(false)
    }

    const inputFields: string[] = ["Name", "Date", "Year", "Goal", "Comment"]
    const fieldMapping = {"Name": "name", "Date": "date", "Year": "year", "Goal": "goal", "Comment": "comment"}


    const close = () => setEditClicked(!editClicked)

    return (
        <div className={`overlay ${editClicked ? 'overlay-active': ''}`}>
            <Popup open={editClicked} closeOnDocumentClick onClick={close}>
                <PopupCont 
                    header={"Edit Goal"} 
                    inputElements={inputFields} 
                    mapping={fieldMapping}
                    close={close} 
                    handleChange={handleChange}
                    handleSave={handleSave}
                />
            </Popup>
        </div>
    )
}

export default GoalsPopup