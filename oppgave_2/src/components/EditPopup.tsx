import React, { useState } from "react"
import Popup from "reactjs-popup"
import { Performer } from "../components/tables/Table"
import "../style/popup.scss"

// Reference for Popup: https://react-popup.elazizi.com/react-modal

type EditPopupProps = {
    editPerformer: Performer,
    setEditPerformer: React.Dispatch<React.SetStateAction<Performer>>
    handleSave: () => void
}

const EditPopup = ({ editPerformer, setEditPerformer, handleSave }: EditPopupProps) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditPerformer({...editPerformer, [event.target.name]: event.target.value})
    }

    const closePopup = () => setIsPopupOpen(false)

    return(
    <>
        <button className="button float-right" onClick={() => setIsPopupOpen(true)}>Edit</button>
        <div className={`overlay ${isPopupOpen ? 'overlay--active' : ''}`}>
            <Popup open={isPopupOpen} closeOnDocumentClick onClick={closePopup}>
                    <div className="modal">
                        <button className="modal__close float-right" onClick={closePopup}>
                            &times;
                        </button>
                        <h1 className="modal__header">Edit Performer</h1>
                        <div className="modal__content flex flex-col mt-16">
                            <label className="modal__content-label">Name:</label>
                            <input 
                                className="modal__content-input" 
                                type="text" name="name" 
                                placeholder="..." 
                                value={editPerformer.name}
                                onChange={handleChange} 
                            />
                            <label className="modal__content-label">Gender:</label>
                            <input 
                                className="modal__content-input" 
                                type="text" 
                                name="gender" 
                                placeholder="..." 
                                value={editPerformer.gender}
                                onChange={handleChange} 
                            />
                            <label className="modal__content-label">Sport:</label>
                            <input 
                                className="modal__content-input" 
                                type="text" 
                                name="sport" 
                                placeholder="..." 
                                value={editPerformer.sport}
                                onChange={handleChange} 
                            /> 
                        </div>
                        <div className="modal__actions">
                            <button 
                                className="modal__actions-button" 
                                onClick={() => {
                                    handleSave()
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