import React, { useState } from "react"
import Popup from "reactjs-popup"
import PopupContent from "./PopupContent"
import { Performer } from "@/types/performer"
import "@/style/popup.scss"

// Reference for Popup: https://react-popup.elazizi.com/react-modal

type EditPopupProps = {
    editPerformer: Performer,
    setEditPerformer: (performer: Performer) => void 
    handleSave: (updatedPerformer: Performer) => void
}

const EditPopup = ({ editPerformer, setEditPerformer, handleSave }: EditPopupProps) => {
    const [localPerformer, setLocalPerformer] = useState(editPerformer);
    const [isPopupOpen, setIsPopupOpen] = useState(false)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(`EVENT TYPE: ${event.target.name}`)
        setLocalPerformer({...localPerformer, [event.target.name]: event.target.value})
    }

    const handleLocalSave = () => {
        setEditPerformer(localPerformer)
        handleSave(localPerformer)
    }

    const closePopup = () => setIsPopupOpen(false)
    const inputFields = ["User ID", "Gender", "Sport"]
    const fieldMapping = {"User ID": "userId", "Gender": "gender", "Sport": "sport"}

    return(
    <>
        <button className="button float-right" onClick={() => setIsPopupOpen(true)}>
            Edit
        </button>
        <div className={`overlay ${isPopupOpen ? 'overlay-active' : ''}`}>
            <Popup open={isPopupOpen} closeOnDocumentClick onClick={closePopup}>
                <PopupContent 
                    header="Edit Performer" 
                    inputElements={inputFields}
                    mapping={fieldMapping}
                    close={closePopup}
                    handleChange={handleChange}
                    handleSave={handleLocalSave}
                /> 
            </Popup>
        </div>
    </>
    )
}

export default EditPopup;

