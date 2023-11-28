"use client"
import React, { useState } from "react" 
import CheckBox from "../CheckBox"
import Popup from "reactjs-popup"
import "@/style/popup.scss"
import { IntensityZone } from "@/types/performer"

type IntensityProps = {
    header: string
    isOpen: boolean
    onClose: () => void
}

const IntensityPopup = ({ header, isOpen, onClose }: IntensityProps) => {
    const [selectedZone, setSelectedZone] = useState<IntensityZone | "all">(IntensityZone.Zone1)
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
                    <h1 className="modal__header">{header}</h1>
                    { !nextClicked && (
                        <div className="modal__content py-8 flex justify-center">
                            <CheckBox id="heartRate" value="Pulse" onChange={handleChange} checked={selectedOptions.heartRate} />
                            <CheckBox id="speed" value="Speed" onChange={handleChange} checked={selectedOptions.speed} />
                            <CheckBox id="watt" value="Watt" onChange={handleChange} checked={selectedOptions.watt} />
                        </div>
                    )} 
                    { nextClicked && (
                        <div className="modal__content py-8 flex justify-center">
                            <select value={selectedZone} onChange={handleSelectChange}>
                                <option value="all">All Zones</option>
                                <option value={IntensityZone.Zone1}>Zone 1</option>
                                <option value={IntensityZone.Zone2}>Zone 2</option>
                                <option value={IntensityZone.Zone3}>Zone 3</option>
                                <option value={IntensityZone.Zone4}>Zone 4</option>
                                <option value={IntensityZone.Zone5}>Zone 5</option>
                            </select>
                        </div>
                    )}
                    <div className="modal__actions">
                        <button className="modal__actions-button" onClick={handleClick}>
                            Next
                        </button>
                    </div>
                </div>
            </Popup>
        </div>
    )
}

export default IntensityPopup