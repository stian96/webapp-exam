import { useState } from "react"
import  GoalsPopup from "../popups/GoalsPopup"
import "@/style/goalsData.scss"

type GoalsDataProps = {
    id: string,
    goalNumber: number,
    performerId: string | undefined
}

const GoalsData = ({ id, goalNumber, performerId }: GoalsDataProps) => {
    const [editClicked, setEditClicked] = useState(false)

    const handleClick = () => {
        setEditClicked(!editClicked)
    }


    return (
        <> 
            <GoalsPopup 
                performerId={performerId}
                editClicked={editClicked} 
                setEditClicked={setEditClicked} 
            />
            <div className="data flex items-center p-4">
                <span className="data__id mr-10">{ id }</span>
                <span className="data__goal">{`Goal ${goalNumber}`}</span>
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