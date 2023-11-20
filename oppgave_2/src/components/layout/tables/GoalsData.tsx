import { useState } from "react"
import { PriorityEnum    } from "@/enums/PriorityEnum"
import  GoalsPopup from "../popups/GoalsPopup"
import "@/style/goalsData.scss"

type GoalsDataProps = {
    goalId: string,
    priority: PriorityEnum,
    goalName: string,
    performerId: string
}

const GoalsData = ({ goalId, priority, goalName, performerId }: GoalsDataProps) => {
    const [editClicked, setEditClicked] = useState(false)

    const handleClick = () => {
        setEditClicked(!editClicked)
    }


    return (
        <> 
            <GoalsPopup 
                goalId={goalId}
                performerId={performerId}
                editClicked={editClicked} 
                setEditClicked={setEditClicked} 
            />
            <div className="data flex items-center p-4">
                <span className="data__id mr-10">{ priority ? priority : "No priority" }</span>
                <span className="data__goal mr-10">{`Goal: ${ goalName ? goalName : "No name"}`}</span>
                <span className="data__goal">{`Performer: ${ performerId ? performerId : "No name"}`}</span>
                <div className="data__inner ml-auto">
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