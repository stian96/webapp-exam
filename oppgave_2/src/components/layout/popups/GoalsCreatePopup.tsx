"use client"
import PopupCont from "@/components/layout/popups/PopupContent"
import { useState } from "react"
import Popup from "reactjs-popup"

type GoalsCreateProps = {
    createClicked: boolean
    close: () => void
}

const GoalsCreatePopup = ({ createClicked, close }: GoalsCreateProps) => {
    const [isCompetition, setIsCompetition] = useState(false)
    const [hasMadeChoice, setHasMadeChoice] = useState(false)

    const handleYes = () => {
        setIsCompetition(true)
        setHasMadeChoice(true)
    }

    const handleNo = () => {
        setIsCompetition(false)
        setHasMadeChoice(true)
    }


    return(
        <div className={`overlay ${createClicked ? 'overlay-active': ''}`}>
            <Popup open={createClicked} closeOnDocumentClick onClick={close}>
                { !hasMadeChoice && (
                    <div className="modal">
                        <button className="modal__close float-right" onClick={close}>
                            &times;
                        </button>
                        <h1 className="modal__header">{"Is the goal a competition?"}</h1>
                        <div className="modal__content create__content">
                            <button className="create__content-btn" type="button" onClick={handleYes}>Yes</button>
                            <button className="create__content-btn" type="button" onClick={handleNo}>No</button>
                        </div>
                    </div>
                )}
                { hasMadeChoice && (
                     <PopupCont 
                        header={isCompetition ? "Create Competition Goal" : "Create Training Goal"} 
                        inputElements={isCompetition ? [""] : [""]} 
                        close={close} 
                        handleChange={() => true}
                        handleSave={() => true}
                    />
                )}
            </Popup>
        </div>
    )
}

export default GoalsCreatePopup