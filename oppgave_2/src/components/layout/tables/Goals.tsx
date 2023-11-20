import "@/style/goals.scss"
import { Compare, GoalsRow } from "@/components"

type GoalsProps = {
    performerId: string
}

const Goals = ({ performerId }: GoalsProps) => {
    

    return(
    <div className="goals w-full">
        <div className="goals__body">
            <div className="goals__body-header flex justify-between">
                <span className="goals__body-header-data">Goals</span>
                <button className="goals__body-header-button">Create</button>
            </div>
            <div className="goals__body-content">
                <div className="flex flex-col w-11/12 mx-auto pb-5">
                    <GoalsRow firstField="2021" buttonText="Show" id={performerId} />
                    <GoalsRow firstField="2022" buttonText="Show" id={performerId} />
                </div>
            </div>
        </div>
        <Compare />
    </div>
    )
}

export default Goals