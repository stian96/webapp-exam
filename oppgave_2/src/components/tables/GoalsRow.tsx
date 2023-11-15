"use client"
import GoalsData from "./GoalsData"
import { useState } from "react"

import "../../style/goalsRow.scss"

type GoalsRowProps = {
    firstField: string,
    buttonText: string
}

const GoalsRow = ({ firstField, buttonText }: GoalsRowProps) => {
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
            <tr className="goals__body-row flex justify-between p-4">
                <td className="goals__body-row-data">{ firstField }</td> 
                <td>
                    <button className="goals__body-row-button" type="button" onClick={toggleGoalsData}>
                        { buttonText }
                    </button>
                </td>
            </tr>
            {showGoalsData && (
                 <tr className="goals__data-row flex justify-center p-4">
                 <td className="w-full mx-4" colSpan={3}>
                     { rowData.map((data, index) => (
                         <GoalsData key={index} id={data.id} goalNumber={data.num}/>
                     ))}
                 </td>
             </tr>
            )}
        </div>
    )
}
export default GoalsRow