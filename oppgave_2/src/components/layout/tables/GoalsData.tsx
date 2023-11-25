import { useState } from "react"
import { type Goal } from "../../../types/classes/goal"
import  GoalsEditPopup from "../popups/GoalsEditPopup"
import "@/style/goalsData.scss"
import { type GoalsInput } from "@/types/goalsInput"


type GoalsDataProps = {
    goal: Goal
    performerId: string,
    updateGoal: (update: Goal) => void
    onGoalDelete: (goalId: string) => void;
}

const GoalsData = ({ performerId, goal, onGoalDelete, updateGoal }: GoalsDataProps) => {
    const [editClicked, setEditClicked] = useState(false)
    const [currentGoal, setCurrentGoal] = useState(goal)


    const handleClick = () => {
        setEditClicked(!editClicked)
    }

    const handleGoalUpdate = (updatedGoal: GoalsInput) => {
        const convertedGoal = { 
            ...updatedGoal, 
            date: updatedGoal.date
        }
        setCurrentGoal(convertedGoal)
        updateGoal(convertedGoal)
    }

    const handleDeleteGoal = async () => {
      try {
          const response = await fetch(`/api/goals/deleteGoal?goalId=${currentGoal.id}`, {
              method: 'DELETE',
          });
  
          const result = await response.json();
          if (response.ok) {
              
              console.log(result.message);
              onGoalDelete(currentGoal.id)
              
          } else {
              
              console.error(result.message);
          }
      } catch (error) {
          console.error('Error deleting goal:', error);
      }
  };

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
                <span className="data__goal mr-6">{`${ currentGoal.name ? `${currentGoal.name}` : ''}`}</span>
                <span className="data__id mx-6">{`${currentGoal.priority ? `Priority: ${currentGoal.priority}` : ''} `}</span>
                <span className="data__goal mx-6">
                    {`${currentGoal.date ? `Date: ${currentGoal.date.toString().split('T')[0]}` : ''}`}
                </span>
                <div className="data__inner ml-auto">
                    <button 
                        className="data__inner-button mr-5"
                        onClick={handleClick}
                    >
                            Edit
                    </button>
                    <button 
                    className="data__inner-button"
                    onClick={handleDeleteGoal}
                     >Delete</button>
                </div>
            </div>
        </>
    )
}

export default GoalsData