"use client"
import { Goal } from "@/types/classes/goal"
import GoalsData from "./GoalsData"
import { useState } from "react"

import "@/style/goalsRow.scss"

type GoalsRowProps = {
    performerId: string
    goalsArray: Goal[]
    year: string
    addNewGoals: (newGoal: Goal) => void
}

const GoalsRow = ({ performerId, goalsArray, year, addNewGoals }: GoalsRowProps) => {
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
                 <div className="w-full mx-4">
                    {goalsArray.map((goal, index) => (
                    <GoalsData 
                        key={index}
                        goal={goal}
                        performerId={performerId}
                        updateGoal={addNewGoals}
                    />
                    ))}
                 </div>
             </div>
            )}
        </div>
    )
}
export default GoalsRow