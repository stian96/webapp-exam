import { Goal } from "@/types/classes/goal"
import "@/style/popup.scss"

type DetailProps = {
    header: string
    onClose: () => void
    goalData: Goal
}


const GoalsDetailModal = ({ header, onClose, goalData }: DetailProps) => {

    return (
        <div className="modal h-full overflow-auto">
            <button className="modal__close float-right" onClick={onClose}>
                &times;
            </button>
            <h1 className="modal__header">{header}</h1>
            <div className="modal__content">
              
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