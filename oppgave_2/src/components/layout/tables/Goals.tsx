import { useState, useEffect } from "react"
import "@/style/goals.scss"
import { Compare, GoalsRow } from "@/components"
import { fetchGoals } from "../../../lib/api"
import { type Goal } from "../../../types/classes/goal"

type GoalsProps = {
    performerId: string
}

const Goals = ({ performerId }: GoalsProps) => {
    const [allGoals, setAllGoals] = useState<Goal[]>([])

    useEffect(() => {
        const getGoalsData = async () => {
            const goalsResponse = (await fetchGoals(performerId))!
            console.log("Goals response:", goalsResponse);
            setAllGoals(goalsResponse)
        }
        getGoalsData()
    }, [])

    const handleGoalDelete = (deletedGoalId: string) => {
      setAllGoals(allGoals.filter(goal => goal.id !== deletedGoalId));
    };

    return(
    <div className="goals w-full">
        <div className="goals__body">
            <div className="goals__body-header flex justify-between">
                <span className="goals__body-header-data">Goals</span>
                <button className="goals__body-header-button">Create</button>
            </div>
            <div className="goals__body-content">
                <div className="flex flex-col w-11/12 mx-auto pb-5">
                    <GoalsRow 
                        performerId={performerId}
                        goalsArray={allGoals}
                        onGoalDelete={handleGoalDelete}
                    />
                </div>
            </div>
        </div>
        <Compare />
    </div>
    )
}

export default Goals