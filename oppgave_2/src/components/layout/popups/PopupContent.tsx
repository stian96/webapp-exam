import Input from "../../data/Input"
import "../../../style/popup.scss"

type PopupProps = {
    header: string
    inputElements: string[]
    close: () => void
}

const PopupContent = ({ header, inputElements, close }: PopupProps) => {

    return (
        <div className="modal">
        <button className="modal__close float-right" onClick={close}>
            &times;
        </button>
        <h1 className="modal__header">{header}</h1>
        <div className="modal__content">
            <Input elements={inputElements}/>
        </div>
        <div className="modal__actions">
            <button 
                className="modal__actions-button" 
                onClick={() => {
                    close()
                }}>Save
            </button>
        </div>
    </div>
    )
}

export default PopupContent