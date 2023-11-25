"use client"
import PopupCont from "@/components/layout/popups/PopupContent"
import { PriorityEnum } from "@/enums/PriorityEnum"
import { Goal } from "@/types/classes/goal"
import { useState } from "react"
import Popup from "reactjs-popup"

type GoalsCreateProps = {
    createClicked: boolean
    close: () => void
    onSave: (sendGoal: Goal) => void
}

const GoalsCreatePopup = ({ createClicked, close, onSave }: GoalsCreateProps) => {
    const [isCompetition, setIsCompetition] = useState(false)
    const [hasMadeChoice, setHasMadeChoice] = useState(false)
    const [inputData, setInputData] = useState({
        id: "",
        name: "",
        date: "",
        place: "",
        goal: "",
        type: "",
        priority: PriorityEnum.A,
        isCompetition: false,
        comment: "",
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputData({...inputData, [event.target.name]: event.target.value})

    }

    const handleSave = () => {
        const newGoal = { ...inputData, date: new Date(inputData.date)}
        console.log("Date: ", inputData.date)
        onSave(newGoal)
    }

    const handleYes = () => {
        setIsCompetition(true)
        setHasMadeChoice(true)
    }

    const handleNo = () => {
        setIsCompetition(false)
        setHasMadeChoice(true)
    }

    const competitionFields = ["Name", "Date", "Place", "Goal", "Type", "Priority", "Comment"]
    const trainingGoalFields = ["Name", "Date", "Goal", "Comment"]

    return(
        <div className={`overlay ${createClicked ? 'overlay-active': ''}`}>
            <Popup open={createClicked} closeOnDocumentClick onClick={{ }}>
                { !hasMadeChoice && (
                    <div className="modal">
                        <button className="modal__close float-right" onClick={close}>
                            &times;
                        </button>
                        <h1 className="modal__header">{"Is the goal a competition?"}</h1>
                        <input 
                            type="text" 
                            id="year" 
                            name="year" 
                            placeholder="Enter the year for the goal" 
                            onChange={handleChange}
                        />
                        <div className="modal__content create__content">
                            <button className="create__content-btn" type="button" onClick={handleYes}>Yes</button>
                            <button className="create__content-btn" type="button" onClick={handleNo}>No</button>
                        </div>
                    </div>
                )}
                { hasMadeChoice && (
                     <PopupCont 
                        header={isCompetition ? "Create Competition Goal" : "Create Training Goal"} 
                        inputElements={isCompetition ? competitionFields : trainingGoalFields} 
                        close={close} 
                        handleChange={handleChange}
                        handleSave={handleSave}
                    />
                )}
            </Popup>
        </div>
    )
}

export default GoalsCreatePopup