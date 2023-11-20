import { useState } from "react"
import { Goal } from "../../../types/classes/goal"
import  GoalsPopup from "../popups/GoalsPopup"
import "@/style/goalsData.scss"

type GoalsDataProps = {
    goal: Goal
    performerId: string
}

const GoalsData = ({ performerId, goal }: GoalsDataProps) => {
    const [editClicked, setEditClicked] = useState(false)
    const dateObject = new Date(goal.date)
    const dateString = dateObject.toISOString().split('T')[0]

    const handleClick = () => {
        setEditClicked(!editClicked)
    }


    return (
        <> 
            <GoalsPopup 
                goalId={goal.id}
                performerId={performerId}
                editClicked={editClicked} 
                setEditClicked={setEditClicked} 
            />
            <div className="data flex items-center justify-between p-4">
                <span className="data__goal">{`${ goal.name ? `Name: ${goal.name}` : ''}`}</span>
                <span className="data__id">{`${goal.priority ? `Priority: ${goal.priority}` : ''} `}</span>
                <span className="data__goal">{`${goal.date ? `Date: ${dateString}` : ''}`}</span>
                <span className="data__goal">{`${goal.isCompetition ? `Competition: ${goal.isCompetition}` : ''}`}</span>
                <div className="data__inner">
                    <button 
                        className="data__inner-button mr-5"
                        onClick={handleClick}
                    >
                            Edit
                    </button>
                    <button className="data__inner-button">Delete</button>
                </div>
            </div>
        </>
    )
}

export default GoalsData