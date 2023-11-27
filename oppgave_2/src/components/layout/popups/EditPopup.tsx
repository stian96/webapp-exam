import React, { useState } from "react"
import Popup from "reactjs-popup"
import PopupEdit from "./PopupEdit"
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
        setLocalPerformer({...localPerformer, [event.target.name]: event.target.value})
    }

    const handleLocalSave = () => {
        setEditPerformer(localPerformer)
        handleSave(localPerformer)
    }

    const closePopup = () => setIsPopupOpen(false)
    const inputFields = ["User ID", "Gender", "Sport"]
    
    return(
    <>
        <button className="button float-right" onClick={() => setIsPopupOpen(true)}>
            Edit
        </button>
        <div className={`overlay ${isPopupOpen ? 'overlay-active' : ''}`}>
            <Popup open={isPopupOpen} closeOnDocumentClick onClick={closePopup}>
                <PopupEdit 
                    header="Edit Performer" 
                    inputElements={inputFields}
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

