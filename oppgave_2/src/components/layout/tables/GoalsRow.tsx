"use client"
import GoalsData from "./GoalsData"
import { useState } from "react"
import { Goal } from "../../../types/classes/goal"

import "@/style/goalsRow.scss"

type GoalsRowProps = {
    performerId: string
    goalsArray: Goal[]
}

const GoalsRow = ({ performerId, goalsArray }: GoalsRowProps) => {
    const [showGoalsData, setShowGoalsData] = useState(false)

    const toggleGoalsData = () => {
        setShowGoalsData(!showGoalsData)
    }

    return (
        <div className="test">
            <div className="goals__body-row flex justify-between p-4">
                <div className="goals__body-row-data">2023</div> 
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
                        goalId={goal.id}
                        priority={goal.priority}
                        goalName={goal.name}
                        performerId={performerId}
                    />
                    ))}
                 </div>
             </div>
            )}
        </div>
    )
}
export default GoalsRow