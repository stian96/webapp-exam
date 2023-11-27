import { useState } from "react"
import  GoalsEditPopup, { GoalsCreateInput } from "../popups/GoalsEditPopup"
import GoalsDetailModal from "../popups/GoalsDetailsModal"
import { type Goal } from "@/types/classes/goal"
import { deleteGoalFromDB } from "@/lib/api"
import Popup from "reactjs-popup"

import "@/style/goalsData.scss"


type GoalsDataProps = {
    goal: Goal
    performerId: string,
    onGoalDelete: (goalId: string) => void
    updateData: (updateValue: Goal) => void
}

const GoalsData = ({ performerId, goal, onGoalDelete, updateData }: GoalsDataProps) => {
    const [editClicked, setEditClicked] = useState(false)
    const [currentGoal, setCurrentGoal] = useState(goal)
    const [modalOpen, setModalOpen] = useState(false)

    const handleClick = () => {
        setEditClicked(!editClicked)
    }

    const handleGoalUpdate = (updatedGoal: GoalsCreateInput) => {
        const convertedGoal = { 
            ...updatedGoal, 
            date: updatedGoal.date
        }
        setCurrentGoal(convertedGoal)
        updateData(convertedGoal)
    }

    const handleGoalDelete = async () => {
        const result = await deleteGoalFromDB(goal)
        if (result) {
            onGoalDelete(goal.id)
        } else {
            console.log(`Failed to delete goal with ID: ${goal.id}`)
        }
    }

    const closeModal = () => setModalOpen(false)
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
                <div className={`overlay ${modalOpen ? 'overlay-active': ''}`}>
                    <Popup open={modalOpen} closeOnDocumentClick={false}>
                        <GoalsDetailModal 
                            header={"Competition Information"}
                            onClose={closeModal}
                            goalData={currentGoal}
                        />
                    </Popup>
                </div>
                <div className="data__inner ml-auto">
                    <button className="data__inner-button mr-2" onClick={() => setModalOpen(true)}>
                        Show
                    </button>
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
