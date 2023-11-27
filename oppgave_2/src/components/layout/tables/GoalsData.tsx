import { useState } from "react"
import { type Goal } from "../../../types/classes/goal"
import  GoalsEditPopup, { GoalsCreateInput } from "../popups/GoalsEditPopup"
import "@/style/goalsData.scss"
import { deleteGoalFromDB } from "@/lib/api"


type GoalsDataProps = {
    goal: GoalsCreateInput
    performerId: string,
    onGoalDelete: (goalId: string) => void;
}

const GoalsData = ({ performerId, goal, onGoalDelete }: GoalsDataProps) => {
    const [editClicked, setEditClicked] = useState(false)
    const [currentGoal, setCurrentGoal] = useState(goal)

    const handleClick = () => {
        setEditClicked(!editClicked)
    }

    const handleGoalUpdate = (updatedGoal: GoalsCreateInput) => {
        const convertedGoal = { 
            ...updatedGoal, 
            date: updatedGoal.date
        }
        setCurrentGoal(convertedGoal)
    }

    const handleGoalDelete = async () => {
        const result = await deleteGoalFromDB(goal)
        if (result) {
            onGoalDelete(goal.id)
        } else {
            console.log(`Failed to delete goal with ID: ${goal.id}`)
        }
  }

    return (
        <> 
            <GoalsEditPopup 
                goalId={goal.id}
                performerId={performerId}
                editClicked={editClicked} 
                setEditClicked={setEditClicked} 
                onGoalUpdate={handleGoalUpdate}
                initialGoalData={currentGoal}
            />
            <div className="data flex items-center justify-between p-4">
                <span className="data__competition mr-5">
                    Competition: {currentGoal.isCompetition ? `Yes` : `No`}
                </span>
                <span className="data__goal mx-5">
                    Name: {`${ currentGoal.name ? `${currentGoal.name}` : ''}`}
                </span>
                <span className="data__goal mx-5">
                    {`${currentGoal.date ? `Date: ${currentGoal.date.toString().split('T')[0]}` : ''}`}
                </span>
                { currentGoal.isCompetition && (
                    <span className="data__priority mx-5">
                        {currentGoal.priority ? `Priority: ${currentGoal.priority}` : ''}
                    </span>
                )}
                <div className="data__inner ml-auto">
                    <button className="data__inner-button mr-2" onClick={handleClick}>
                        Edit
                    </button>
                    <button className="data__inner-button"onClick={handleGoalDelete}>
                        Delete
                     </button>
                </div>
            </div>
        </>
    )
}

export default GoalsData