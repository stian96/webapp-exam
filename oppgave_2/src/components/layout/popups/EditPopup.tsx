import React, { useState, useEffect } from "react"
import { mapFieldToKey } from "@/lib/utils"
import Popup from "reactjs-popup"
import PopupEdit from "./PopupEdit"
import { Performer } from "@/types/performer"
import "@/style/popup.scss"

// Reference for Popup: https://react-popup.elazizi.com/react-modal

type EditPopupProps = {
    editPerformer: Performer,
    setEditPerformer: (performer: Performer) => void 
}

const EditPopup = ({ editPerformer, setEditPerformer }: EditPopupProps) => {
    const [localPerformer, setLocalPerformer] = useState(editPerformer);
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [hasMadeChoice, setHasMadeChoice] = useState(false)
    const [editModeType, setEditModeType] = useState(false)
    const [error, setError] = useState<Record<string, string>>({})

    const performerFields = ["User ID", "Gender", "Sport"]
    const performanceFields = ["Heart Rate", "Speed", "Watt"]

    useEffect(() => {
        if (!isPopupOpen) {
            setHasMadeChoice(false)
        }
    }, [isPopupOpen])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalPerformer({...localPerformer, [event.target.name]: event.target.value})
    }

    const handleLocalSave = (fields: string[]) => {
        if (validatePerformerData(fields, localPerformer)) {
            setEditPerformer(localPerformer)
            closePopup()
        } else {
            console.log("Performer data from form is not valid!")
        }
    }

    const validatePerformerData = (fields: string[], performerData: Performer) => {
        let defineErrors: Record<string, string> = {}
        let isValid = true

        fields.forEach(element => {

          const key = mapFieldToKey(element)
          const value = performerData[key]

            if (typeof value === "string" && value.trim() === "") {
                defineErrors[key] = `${element} is required!`
                isValid = false
            } 
            else if (value === null || value === undefined) {
                defineErrors[key] = `${element} is required!`
                isValid = false
            }
    
        })
        console.log("Define Errors: ", defineErrors)
        setError(defineErrors)
        return isValid
    }

    const closePopup = () => setIsPopupOpen(false)
    return(
    <>
        <button className="button float-right" onClick={() => setIsPopupOpen(true)}>
            Edit
        </button>
        <div className={`overlay ${isPopupOpen ? 'overlay-active' : ''}`}>
            <Popup open={isPopupOpen} closeOnDocumentClick={false}>
                { !hasMadeChoice && (
                    <div className="modal modal-create">
                        <button className="modal__close float-right" onClick={closePopup}>
                            &times;
                        </button>
                        <h1 className="modal__header">{"What do you want to edit?"}</h1>
                        <div className="modal__content create__content">
                            <button 
                                className="create__content-btn" 
                                type="button"
                                onClick={() => {
                                    setHasMadeChoice(true)
                                    setEditModeType(true)
                                }}
                            >Performer
                            </button>
                            <button 
                                className="create__content-btn" 
                                type="button" 
                                onClick={() => {
                                    setHasMadeChoice(true)
                                    setEditModeType(false)
                                }}
                            >Performance
                            </button>
                    </div>
                 </div>
                )}
                { hasMadeChoice && (
                    <PopupEdit 
                        header={editModeType ? "Edit Performer" : "Edit Performance"} 
                        inputElements={editModeType ? performerFields : performanceFields}
                        handleChange={handleChange}
                        handleSave={handleLocalSave}
                        close={closePopup}
                        errors={error}
                        currentPerformer={localPerformer}
                    /> 
                )}
            </Popup>
        </div>
    </>
    )
}

export default EditPopup;

