import { Goal } from "@/types/classes/goal"
import "@/style/popup.scss"

type DetailProps = {
    header: string
    isOpen: boolean
    onClose: () => void
    goalData: Goal
}


const GoalsDetailModal = ({ header, isOpen, onClose, goalData }: DetailProps) => {

    return (
        <div className="modal h-full overflow-auto">
            <button className="modal__close float-right" onClick={close}>
                &times;
            </button>
            <h1 className="modal__header">{header}</h1>
            <div className="modal__content">
              
            </div>
            <div className="modal__actions">
                {/* Close button here */}
            </div>
        </div>
    )
}

export default GoalsDetailModal