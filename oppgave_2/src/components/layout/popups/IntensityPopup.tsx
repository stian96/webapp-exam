"use client"
import { useState } from "react" 
import CheckBox from "../CheckBox"
import Popup from "reactjs-popup"
import "@/style/popup.scss"

type IntensityProps = {
    header: string
    isOpen: boolean
    onClose: () => void
}

const IntensityPopup = ({ header, isOpen, onClose }: IntensityProps) => {
    const [selectedOptions, setSelectedOptions] = useState({
        heartRate: false,
        speed: false,
        watt: false
    })

    return (
        <div className={`overlay ${isOpen ? 'overlay-active' : ''}`}>
            <Popup open={isOpen} closeOnDocumentClick={false}>
                <div className="modal h-full overflow-auto">
                    <button className="modal__close float-right" onClick={onClose}>
                        &times;
                    </button>
                    <h1 className="modal__header">{header}</h1>
                    <div className="modal__content py-8 flex justify-center">
                        <CheckBox id="heartRate" value="Pulse" />
                        <CheckBox id="speed" value="Speed" />
                        <CheckBox id="watt" value="Watt" />
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