import Popup from "reactjs-popup"
import "@/style/popup.scss"

type IntensityProps = {
    isOpen: boolean
    onClose: () => void
}

const IntensityPopup = ({ isOpen, onClose }: IntensityProps) => {

    return (
        <div className={`overlay ${isOpen ? 'overlay-active' : ''}`}>
            <Popup open={isOpen} closeOnDocumentClick={false}>
                <div className="modal h-full overflow-auto">
                    <button className="modal__close float-right" onClick={onClose}>
                        &times;
                    </button>
                    <h1 className="modal__header">{"Intensity Popup"}</h1>
                    <div className="modal__content">
                        <h1>Intensity Popup</h1>
                    </div>
                    <div className="modal__actions">
                        <button className="modal__actions-button">
                            Save
                        </button>
                    </div>
                </div>
            </Popup>
        </div>
    )

}

export default IntensityPopup