import "../../style/goals.scss"
import GoalsRow from "./GoalsRow"

const Goals = () => {
    return(
    <table className="goals w-full">
        <tbody className="goals-body">
            <GoalsRow firstField="Goals" buttonText="Create"/>
            <GoalsRow firstField="2021" buttonText="Show" />
            <GoalsRow firstField="2022" buttonText="Show" />
        </tbody>
    </table>
    )
}

export default Goals