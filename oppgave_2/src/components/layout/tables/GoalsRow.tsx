"use client"
import { type Goal } from "@/types/classes/goal"
import GoalsData from "./GoalsData"
import { useState } from "react"


import "@/style/goalsRow.scss"
import { GoalsCreateInput } from "../popups/GoalsEditPopup"

type GoalsRowProps = {
    performerId: string
    goalsArray: GoalsCreateInput[]
    onGoalDelete: (goalId: string) => void;
    year: string
    addNewGoals: (newGoal: Goal) => void
}

const GoalsRow = ({ performerId, goalsArray, onGoalDelete, year }: GoalsRowProps) => {
    const [showGoalsData, setShowGoalsData] = useState(false)

    const toggleGoalsData = () => {
        setShowGoalsData(!showGoalsData)

    }

    return (
        <div className="test">
            <div className="goals__body-row flex justify-between p-4">
                <div className="goals__body-row-data">{year}</div> 
                <div>
                    <button className="goals__body-row-button" type="button" onClick={toggleGoalsData}>
                        { showGoalsData ? "Hide" : "Show" }
                    </button>
                </div>
            </div>
            {showGoalsData && (
            <div className="goals__data-row flex justify-center p-4">
                 <div className="w-full mx-2 mb-2">
                    {goalsArray.map((goal, index) => (
                    <GoalsData 
                        key={index}
                        goal={goal}
                        performerId={performerId}
                        onGoalDelete={onGoalDelete}
                    />
                    ))}
                 </div>
             </div>
            )}
        </div>
    )
}
export default GoalsRow