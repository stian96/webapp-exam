"use client"
import { useEffect } from "react"
import PopupCont from "@/components/layout/popups/PopupContent"
import { PriorityEnum } from "@/enums/PriorityEnum"
import { Goal } from "@/types/classes/goal"
import { useState } from "react"
import Popup from "reactjs-popup"

import "@/style/popup.scss"

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

    // Needed to reset the values properly when '&times' button is clicked.
    useEffect(() => {
        if (!createClicked) {
            resetDecision()
        }
    }, [createClicked])

    const handleYes = () => {
        setIsCompetition(true)
        setHasMadeChoice(true)
    }

    const handleNo = () => {
        setIsCompetition(false)
        setHasMadeChoice(true)
    }

    const resetDecision = () => {
        setHasMadeChoice(false)
        setIsCompetition(false)
        setInputData({
            id: "",
            name: "",
            date: "",
            place: "",
            goal: "",
            type: "",
            priority: PriorityEnum.A,
            isCompetition: false,
            comment: ""
        })
    }

    const competitionFields = ["Name", "Date", "Place", "Goal", "Type", "Comment"]
    const trainingGoalFields = ["Name", "Date", "Goal", "Comment"]

    return(
        <div className={`overlay ${createClicked ? 'overlay-active': ''}`}>
            <Popup open={createClicked} closeOnDocumentClick onClick={close}>
                { !hasMadeChoice && (
                    <div className="modal modal-create">
                        <button className="modal__close float-right" onClick={close}>
                            &times;
                        </button>
                        <h1 className="modal__header">{"Is the goal a competition?"}</h1>
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
                        inputData={inputData}
                        setInputData={setInputData}
                        onSave={onSave}
                    />
                )}
            </Popup>
        </div>
    )
}

export default GoalsCreatePopup