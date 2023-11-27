import { Goal } from "@/types/classes/goal"
import CompetitionInfo from "@/components/data/CompetitionInfo"
import "@/style/popup.scss"

type DetailProps = {
    header: string
    onClose: () => void
    goalData: Goal
}


const GoalsDetailModal = ({ header, onClose, goalData }: DetailProps) => {

    const firstRow = [
        { label: "Name", value: goalData.name },
        { label: "Date", value: goalData.date?.toString().split('T')[0] },
        { label: "Place", value: goalData.location }
    ]

    const secondRow = [
        { label: "Type", value: goalData.type },
        { label: "Priority", value: goalData.priority },
        { label: "Goal", value: goalData.goalCompetition },
        { label: "Comment", value: goalData.comment }
    ]

    return (
        <div className="modal h-full overflow-auto">
            <button className="modal__close float-right" onClick={onClose}>
                &times;
            </button>
            <h1 className="modal__header">{header}</h1>
            <div className="modal__content competition-info">
                <CompetitionInfo data={firstRow}/>
                <CompetitionInfo data={secondRow} />
            </div>
            <div className="modal__actions">
                <button className="modal__actions-button" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    )
}

export default GoalsDetailModal