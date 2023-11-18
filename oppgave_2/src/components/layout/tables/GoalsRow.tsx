"use client"
import GoalsData from "./GoalsData"
import { useState } from "react"

import "@/style/goalsRow.scss"

type GoalsRowProps = {
    firstField: string
    buttonText: string
    id: string | undefined
}

const GoalsRow = ({ firstField, buttonText, id }: GoalsRowProps) => {
    const [showGoalsData, setShowGoalsData] = useState(false)

    const rowData = [
        { id: "A", num: 1 },
        { id: "B", num: 2 },
        { id: "C", num: 3}
    ]

    const toggleGoalsData = () => {
        setShowGoalsData(!showGoalsData)
    }

    return (
        <div className="test">
            <div className="goals__body-row flex justify-between p-4">
                <div className="goals__body-row-data">{ firstField }</div> 
                <div>
                    <button className="goals__body-row-button" type="button" onClick={toggleGoalsData}>
                        { showGoalsData ? "Hide" : buttonText }
                    </button>
                </div>
            </div>
            {showGoalsData && (
            <div className="goals__data-row flex justify-center p-4">
                 <div className="w-full mx-4">
                     { rowData.map((data, index) => (
                         <GoalsData 
                            key={index} 
                            id={data.id} 
                            goalNumber={data.num}
                            performerId={id}
                        />
                     ))}
                 </div>
             </div>
            )}
        </div>
    )
}
export default GoalsRow