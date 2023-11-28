"use client"
import React, { useState } from "react" 
import { IntensityZone, Performer, calculateIntensityZones } from "@/types/performer"
import IntensityResult from "@/components/data/IntensityResult"
import CheckBox from "../CheckBox"
import Popup from "reactjs-popup"
import "@/style/popup.scss"
import DropDown from "../DropDown"

type IntensityProps = {
    header: string
    isOpen: boolean
    onClose: () => void
    currentPerformer: Performer
}

export type CalculationResults = {
    heartRate: number | number[];
    speed: number | number[];
    watt: number | number[];
};


const IntensityPopup = ({ header, isOpen, onClose, currentPerformer }: IntensityProps) => {
    const [selectedZone, setSelectedZone] = useState<IntensityZone | "all">("all")
    const [nextClicked, setNextClicked] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState({
        heartRate: false,
        speed: false,
        watt: false
    })
    const [results, setResults] = useState<CalculationResults>({
        heartRate: [],
        speed: [],
        watt: []
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

    const calculateZones = () => {
        let newResults = {
            heartRate: selectedOptions.heartRate ? calculateZoneValues(currentPerformer.heartRate) : [],
            speed: selectedOptions.speed ? calculateZoneValues(currentPerformer.speed) : [],
            watt: selectedOptions.watt ? calculateZoneValues(currentPerformer.watt) : []
        };
    
        setResults(newResults);
    }

    const calculateZoneValues = (threshold: number): number[] => {
        if (selectedZone === "all") {
            const zones = Object.values(IntensityZone).filter(val => typeof val === "number") as IntensityZone[];
            return zones.map(zoneVal => calculateIntensityZones(threshold, zoneVal))
        } 
        else {
            return [calculateIntensityZones(threshold, selectedZone)]
        }
    }

    const handleCalculateClick = () => {
        calculateZones()
        setNextClicked(false)
        setShowResults(true)
    }

    return (
        <div className={`overlay ${isOpen ? 'overlay-active' : ''}`}>
            <Popup open={isOpen} closeOnDocumentClick={false}>
                <div className="modal h-full overflow-auto">
                    <button className="modal__close float-right" onClick={onClose}>
                        &times;
                    </button>
                    { !nextClicked && !showResults && (
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
                                <button className="modal__actions-button calculate-btn" onClick={handleCalculateClick}>
                                    Calculate
                                </button>
                            </div>
                        </>
                    )}
                    { showResults && (
                        <>
                        <h1 className="modal__header">{"Result after calculation"}</h1>
                        <div className="modal__content py-8 flex justify-center">
                            <IntensityResult 
                                results={results} 
                                selectedOptions={selectedOptions} 
                                selectedZone={selectedZone}
                            />
                        </div>
                        <div className="modal__actions">
                            <button className="modal__actions-button calculate-btn" onClick={() => setShowResults(false)}>
                                Back
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