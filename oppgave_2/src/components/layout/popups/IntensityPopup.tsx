import Popup from "reactjs-popup"
import "@/style/popup.scss"

type IntensityProps = {
    header: string
    isOpen: boolean
    onClose: () => void
}

const IntensityPopup = ({ header, isOpen, onClose }: IntensityProps) => {

    return (
        <div className={`overlay ${isOpen ? 'overlay-active' : ''}`}>
            <Popup open={isOpen} closeOnDocumentClick={false}>
                <div className="modal h-full overflow-auto">
                    <button className="modal__close float-right" onClick={onClose}>
                        &times;
                    </button>
                    <h1 className="modal__header">{header}</h1>
                    <div className="modal__content">
                        <input type="checkbox" id="heartRate" name="heartRate" value="undfined" />
                        <label htmlFor="heartRate">Pulse</label>
                        <input type="checkbox" id="speed" name="speed" value="undfined" />
                        <label htmlFor="speed">Speed</label>
                        <input type="checkbox" id="watt" name="watt" value="undfined" />
                        <label htmlFor="watt">Watt</label>
                    </div>
                    <div className="modal__actions">
                        <button className="modal__actions-button">
                            Next
                        </button>
                    </div>
                </div>
            </Popup>
        </div>
    )

}

export default IntensityPopup