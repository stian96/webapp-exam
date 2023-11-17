import "@/style/goalsData.scss"

type GoalsDataProps = {
    id: string,
    goalNumber: number,
}

const GoalsData = ({ id, goalNumber}: GoalsDataProps) => {
    return (
        <div className="data flex items-center p-4">
            <span className="data__id mr-10">{ id }</span>
            <span className="data__goal">{`Goal ${goalNumber}`}</span>
            <div className="data__inner ml-auto">
                <button className="data__inner-button mr-5">Edit</button>
                <button className="data__inner-button">Delete</button>
            </div>
        </div>
    )
}

export default GoalsData