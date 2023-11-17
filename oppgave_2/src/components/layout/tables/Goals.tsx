import "@/style/goals.scss"
import { Compare, GoalsRow } from "@/components"

const Goals = () => {
    return(
    <table className="goals w-full">
        <tbody className="goals__body">
            <tr className="goals__body-header flex justify-between">
                <td className="goals__body-header-data">Goals</td>
                <button className="goals__body-header-button">Create</button>
            </tr>
            <tr className="goals__body-content">
                <td className="flex flex-col w-11/12 mx-auto pb-5" colSpan={2}>
                    <GoalsRow firstField="2021" buttonText="Show" />
                    <GoalsRow firstField="2022" buttonText="Show" />
                </td>
            </tr>
        </tbody>
        <Compare />
    </table>
    )
}

export default Goals