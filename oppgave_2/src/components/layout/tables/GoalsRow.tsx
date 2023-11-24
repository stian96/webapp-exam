"use client"
import { type Goal } from "@/types/classes/goal"
import GoalsData from "./GoalsData"
import { useState, useMemo } from "react"


import "@/style/goalsRow.scss"

type GoalsRowProps = {
    performerId: string
    goalsArray: Goal[]
    onGoalDelete: (goalId: string) => void;
    year: string
    addNewGoals: (newGoal: Goal) => void
}

const GoalsRow = ({ performerId, goalsArray, onGoalDelete, year, addNewGoals }: GoalsRowProps) => {
    const [showGoalsData, setShowGoalsData] = useState(false)

    const toggleGoalsData = () => {
        setShowGoalsData(!showGoalsData)

    }

    //SRC:React. (n.d.). useMemo. React. Retrieved November 24, 2023, from https://react.dev/reference/react/useMemo
    const combinedGoals = useMemo(() => {
      const competitionGoals = goalsArray.filter(goal => goal.isCompetition).slice(0, 3);
      const nonCompetitionGoals = goalsArray.filter(goal => !goal.isCompetition).slice(0, 3);
      return [...competitionGoals, ...nonCompetitionGoals];
  }, [goalsArray]); 

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
                    {combinedGoals.map((goal, index) => (
                    <GoalsData 
                        key={index}
                        goal={goal}
                        performerId={performerId}
                        onGoalDelete={onGoalDelete}
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