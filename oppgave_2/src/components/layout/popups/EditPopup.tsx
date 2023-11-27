import React, { useState, useEffect } from "react"
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
    const [error, setError] = useState<Record<string, string>>({})

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalPerformer({...localPerformer, [event.target.name]: event.target.value})
    }

    const handleLocalSave = () => {
        if (validatePerformerData(localPerformer)) {
            setEditPerformer(localPerformer)
            handleSave(localPerformer)
            closePopup()
        } else {
            console.log("Performer data from form is not valid!")
        }
    }

    const closePopup = () => setIsPopupOpen(false)
    const inputFields = ["User ID", "Gender", "Sport"]

    const validatePerformerData = (performerData: Performer) => {
        let defineErrors: Record<string, string> = {}
        let isValid = true

        inputFields.forEach(element => {
          const field = element.toLocaleLowerCase()
          const key = field === "user id" ? "userId" as keyof Performer : field as keyof Performer
          console.log("KEY: ", key)
          const value = performerData[key]
          console.log("VALUE: ", value)

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
    
    return(
    <>
        <button className="button float-right" onClick={() => setIsPopupOpen(true)}>
            Edit
        </button>
        <div className={`overlay ${isPopupOpen ? 'overlay-active' : ''}`}>
            <Popup open={isPopupOpen} closeOnDocumentClick={false}>
                <PopupEdit 
                    header="Edit Performer" 
                    inputElements={inputFields}
                    handleChange={handleChange}
                    handleSave={handleLocalSave}
                    close={closePopup}
                    errors={error}
                    currentPerformer={localPerformer}
                /> 
            </Popup>
        </div>
    </>
    )
}

export default EditPopup;

