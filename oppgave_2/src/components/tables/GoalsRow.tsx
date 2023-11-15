import GoalsData from "./GoalsData"

import "../../style/goalsRow.scss"
import { d } from "msw/lib/glossary-de6278a9"

type GoalsRowProps = {
    firstField: string,
    buttonText: string
}

const GoalsRow = ({ firstField, buttonText }: GoalsRowProps) => {
    const rowData = [
        { id: "A", num: 1 },
        { id: "B", num: 2 },
        { id: "C", num: 3}
    ]

    return (
        <div className="test">
            <tr className="goals__body-row flex justify-between p-4">
                <td className="goals__body-row-data">{ firstField }</td> 
                <td>
                    <button className="goals__body-row-button" type="button">{ buttonText }</button>
                </td>
            </tr>
            <tr className="goals__data-row flex justify-center p-4">
                <td className="w-full mx-4" colSpan={3}>
                    { rowData.map((data) => (
                        <GoalsData id={data.id} goalNumber={data.num}/>
                    ))}
                </td>
            </tr>
        </div>
    )
}
export default GoalsRow