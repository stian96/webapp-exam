import Input from "../../data/Input"
import "../../../style/popup.scss"

type PopupProps = {
    header: string
    inputElements: string[]
    mapping: Record<string, string>
    close: () => void
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    handleSave: () => void
}

const PopupContent = ({ header, inputElements, close, handleChange, handleSave, mapping }: PopupProps) => {

    return (
        <div className="modal">
        <button className="modal__close float-right" onClick={close}>
            &times;
        </button>
        <h1 className="modal__header">{header}</h1>
        <div className="modal__content">
            <Input 
                elements={inputElements} 
                handleChange={handleChange}
                fieldMapping={mapping}
            />
        </div>
        <div className="modal__actions">
            <button 
                className="modal__actions-button" 
                onClick={() => {
                    close()
                    handleSave()
                }}>Save
            </button>
        </div>
    </div>
    )
}

export default PopupContent