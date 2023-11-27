"use client"
import { useEffect } from "react"
import { competitionField, trainingGoalField } from "@/types/data/goals"
import PopupContent from "@/components/layout/popups/PopupContent"
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
        isCompetition: false,
        priority: PriorityEnum.A,
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
        setInputData(prevData => ({ 
            ...prevData, 
            isCompetition: true,
            priority: PriorityEnum.A,
        }));
    }

    const handleNo = () => {
        setIsCompetition(false)
        setHasMadeChoice(true)
        setInputData(prevData => ({ 
            ...prevData, 
            isCompetition: false,
            priority: PriorityEnum.A
        }));
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
            isCompetition: false,
            priority: PriorityEnum.A,
            comment: ""
        })
    }

    const competitionFields = competitionField
    const trainingGoalFields = trainingGoalField

    return(
        <div className={`overlay ${createClicked ? 'overlay-active': ''}`}>
            <Popup open={createClicked} closeOnDocumentClick={false}>
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
                     <PopupContent 
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