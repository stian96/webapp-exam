import "../../style/goals.scss"
import GoalsRow from "./GoalsRow"

const Goals = () => {
    return(
    <table className="goals w-full">
        <tbody className="goals__body">
            <tr className="goals__body-header flex justify-between p-4 mb-2">
                <td className="goals__body-header-data">Goals</td>
                <button className="goals__body-header-button">Create</button>
            </tr>
            <tr className="goals__body-content">
                <td colSpan={2}>
                    <div className="flex flex-col w-11/12 mx-auto">
                        <GoalsRow firstField="2021" buttonText="Show" />
                        <GoalsRow firstField="2022" buttonText="Show" />
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    )
}

export default Goals