"use client"
import React, { Dispatch, SetStateAction, useState } from "react"
import Input from "../../data/Input"
import { validDateFormat } from "@/lib/utils"
import "@/style/popup.scss"
import { Goal } from "@/types/classes/goal"

type GoalsCreateInput = {
  id: string
  name: string
  date: string
  place: string
  goal: string
  type: string
  isCompetition: boolean
  comment: string
}

type PopupProps = {
  header: string
  inputElements: {
    name: string
    type: string
  }[]
  close: () => void
  inputData: GoalsCreateInput
  setInputData: Dispatch<SetStateAction<GoalsCreateInput>>
  onSave: (sendGoal: Goal) => void
}

const PopupContent = ({header, inputElements, close, inputData, setInputData, onSave }: PopupProps) => {
  const [isFormValid, setIsFormValid] = useState(false)
  const [error, setError] = useState<Record<string, string>>({})

  const validateForm = (data: GoalsCreateInput) => {
    let defineError: Record<string, string> = {}
    let isValid = true

    inputElements.forEach(element => {
      const key = element.name.toLocaleLowerCase() as keyof GoalsCreateInput
      const value = data[key]

        if (typeof value === "string" && key === "date" && !validDateFormat(value)) {
          defineError[key] = "Invalid date format, expected yyyy-mm-dd"
          isValid = false
        }
        else if (typeof value === "string" && value.trim() === "") {
            defineError[key] = `${key} is required!`
            isValid = false
        } 
        else if (value === null || value === undefined) {
            defineError[key] = `${key} is required!`
            isValid = false
        }
    })
    setError(defineError)
    setIsFormValid(isValid)
    return isValid
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
      setInputData(prevData => ({ ...prevData, [event.target.name]: event.target.value }))
  }

  const handleSave = () => {
      if (validateForm(inputData)) {
        const goalData = {
          ...inputData,
          date: new Date(inputData.date),
          goalNotCompetition: inputData.isCompetition ? null : inputData.goal,
          goalCompetition: inputData.isCompetition ? parseInt(inputData.goal) : null
        }
        onSave(goalData)
        close()
      } else {
          console.log("Form values are not valid!")
      }
  }

  return (
    <div className="modal h-full overflow-auto">
      <button className="modal__close float-right" onClick={close}>
        &times;
      </button>
      <h1 className="modal__header">{header}</h1>
      <div className="modal__content">
        <Input 
          elements={inputElements} 
          handleChange={handleChange} 
          errors={error}
        />
      </div>
      <div className="modal__actions">
        <button
          className="modal__actions-button"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default PopupContent
