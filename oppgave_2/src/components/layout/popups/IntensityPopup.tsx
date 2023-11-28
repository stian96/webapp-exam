"use client"
import React, { useState } from "react" 
import CheckBox from "../CheckBox"
import Popup from "reactjs-popup"
import "@/style/popup.scss"
import { IntensityZone, Performer } from "@/types/performer"
import DropDown from "../DropDown"

type IntensityProps = {
    header: string
    isOpen: boolean
    onClose: () => void
    currentPerformer: Performer
}

const IntensityPopup = ({ header, isOpen, onClose, currentPerformer }: IntensityProps) => {
    const [selectedZone, setSelectedZone] = useState<IntensityZone | "all">("all")
    const [nextClicked, setNextClicked] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState({
        heartRate: false,
        speed: false,
        watt: false
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target
        setSelectedOptions({ ...selectedOptions, [name.id]: name.checked })
    }

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value as unknown as IntensityZone
        setSelectedZone(value)
    }

    const handleClick = () => setNextClicked(!nextClicked)

    return (
        <div className={`overlay ${isOpen ? 'overlay-active' : ''}`}>
            <Popup open={isOpen} closeOnDocumentClick={false}>
                <div className="modal h-full overflow-auto">
                    <button className="modal__close float-right" onClick={onClose}>
                        &times;
                    </button>
                    { !nextClicked && (
                        <>
                            <h1 className="modal__header">{header}</h1>
                            <div className="modal__content py-8 flex justify-center">
                                <CheckBox id="heartRate" value="Pulse" onChange={handleChange} checked={selectedOptions.heartRate} />
                                <CheckBox id="speed" value="Speed" onChange={handleChange} checked={selectedOptions.speed} />
                                <CheckBox id="watt" value="Watt" onChange={handleChange} checked={selectedOptions.watt} />
                            </div>
                            <div className="modal__actions">
                                <button className="modal__actions-button" onClick={handleClick}>
                                    Next
                                </button>
                            </div>
                        </>
                    )} 
                    { nextClicked && (
                        <>
                            <h1 className="modal__header">{"Choose intensity zone for the calculation"}</h1>
                            <div className="modal__content py-8 flex justify-center">
                                <DropDown selectedZone={selectedZone} handleSelectChange={handleSelectChange}/>
                            </div>
                            <div className="modal__actions">
                                <button className="modal__actions-button calculate-btn" onClick={handleClick}>
                                    Calculate
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </Popup>
        </div>
    )
}

export default IntensityPopup