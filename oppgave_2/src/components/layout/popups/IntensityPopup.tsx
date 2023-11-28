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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target
        setSelectedOptions({ ...selectedOptions, [name.id]: name.checked })
    }

    return (
        <div className={`overlay ${isOpen ? 'overlay-active' : ''}`}>
            <Popup open={isOpen} closeOnDocumentClick={false}>
                <div className="modal h-full overflow-auto">
                    <button className="modal__close float-right" onClick={onClose}>
                        &times;
                    </button>
                    <h1 className="modal__header">{header}</h1>
                    <div className="modal__content py-8 flex justify-center">
                        <CheckBox id="heartRate" value="Pulse" onChange={handleChange} checked={selectedOptions.heartRate} />
                        <CheckBox id="speed" value="Speed" onChange={handleChange} checked={selectedOptions.speed} />
                        <CheckBox id="watt" value="Watt" onChange={handleChange} checked={selectedOptions.watt} />
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