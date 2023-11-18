import React, { useState } from "react"
import Popup from "reactjs-popup"
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
        console.log("Event target name: ", event.target.name)
        setLocalPerformer({...localPerformer, [event.target.name]: event.target.value})
    }

    const handleLocalSave = () => {
        setEditPerformer(localPerformer)
        handleSave(localPerformer)
    }

    const closePopup = () => setIsPopupOpen(false)

    return(
    <>
        <button className="button float-right" onClick={() => setIsPopupOpen(true)}>Edit</button>
        <div className={`overlay ${isPopupOpen ? 'overlay-active' : ''}`}>
            <Popup open={isPopupOpen} closeOnDocumentClick onClick={closePopup}>
                    <div className="modal">
                        <button className="modal__close float-right" onClick={closePopup}>
                            &times;
                        </button>
                        <h1 className="modal__header">Edit Performer</h1>
                        <div className="modal__content flex flex-col mt-16">
                            <label className="modal__content-label">User ID:</label>
                            <input 
                                className="modal__content-input" 
                                type="text" name="name" 
                                placeholder="..." 
                                onChange={handleChange} 
                            />
                            <label className="modal__content-label">Gender:</label>
                            <input 
                                className="modal__content-input" 
                                type="text" 
                                name="gender" 
                                placeholder="..." 
                                onChange={handleChange} 
                            />
                            <label className="modal__content-label">Sport:</label>
                            <input 
                                className="modal__content-input" 
                                type="text" 
                                name="sport" 
                                placeholder="..." 
                                onChange={handleChange} 
                            /> 
                        </div>
                        <div className="modal__actions">
                            <button 
                                className="modal__actions-button" 
                                onClick={() => {
                                    handleLocalSave()
                                    closePopup()
                                }}>Save
                            </button>
                        </div>
                    </div>
            </Popup>
        </div>
    </>
    )
}

export default EditPopup;

