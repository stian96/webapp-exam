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

type GoalsCreateInput = {
    id: string
    name: string
    date: string
    place: string
    goal: string
    type: string
    priority: PriorityEnum
    isCompetition: boolean
    comment: string
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
    const [isFormValid, setIsFormValid] = useState(false)

    // Needed to reset the values properly when '&times' button is clicked.
    useEffect(() => {
        if (!createClicked) {
            resetDecision()
        }
    }, [createClicked])

    const validateForm = (data: GoalsCreateInput) => {
        const isValid = Object.values(data).every(value => {
            if (typeof value === "string") {
                return value.trim() !== ""
            } else {
                return value !== null && value !== undefined
            }
        })
        setIsFormValid(isValid)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputData(prevData => {
            const newData = { ...prevData, [event.target.name]: event.target.value }
            validateForm(newData)
            return newData
        })
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

    const competitionFields = ["Name", "Date", "Place", "Goal", "Type", "Priority", "Comment"]
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
                        handleChange={handleChange}
                        handleSave={handleSave}
                    />
                )}
            </Popup>
        </div>
    )
}

export default GoalsCreatePopup