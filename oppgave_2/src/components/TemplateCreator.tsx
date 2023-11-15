"use client"

import "../style/form.scss"

import React, { useState } from "react"
import type { Question } from "@/types/question"
import type { ChangeEvent, FormEvent } from "react"

import { QuestionTypeEnum } from "@/types/question"

// Code based on React documentation found here:
// https://legacy.reactjs.org/docs/forms.html

const TemplateCreator = () => {
  const [sessionName, setSessionName] = useState<string>("")
  const [sessionIntensity, setSessionIntensity] = useState<string>("")
  const [sessionWatt, setSessionWatt] = useState<string>("")
  const [sessionSpeed, setSessionSpeed] = useState<string>("")
  const [sessionPulse, setSessionPulse] = useState<string>("")
  const [sessionType, setSessionType] = useState<string>("cycling")
  const [performerId, setPerformerId] = useState<string>("")
  const [isQuestionValid, setIsNameValid] = useState<boolean>(false)
  const [isIntensityValid, setIsIntensityValid] = useState<boolean>(false)
  const [isWattValid, setIsWattValid] = useState<boolean>(false)
  const [isSpeedValid, setIsSpeedValid] = useState<boolean>(false)
  const [isPulseValid, setIsPulseValid] = useState<boolean>(false)
  const [isCheckboxSelected, setIsCheckboxSelected] = useState<boolean>(false)
  const [submitButtonText, setSubmitButtonText] =
    useState<string>("Save Template")

  // Function for validating a string. It mustn't be empty, and must contain at least 3 unicode characters.
  const validateString = (string: string) => {
    const isStringValid = string.trim() !== "" && /\p{L}{3,}/u.test(string)

    return isStringValid
  }

  // Function for validating a string to check that it is only composed of integers, is not empty, and is larger than 0.
  const validateStringMeasurement = (stringMeasurement: string) => {
    const isMeasurementValid =
      stringMeasurement.trim() !== "" && /^\d+$/.test(stringMeasurement)

    const integerValue = parseInt(stringMeasurement, 10)
    return isMeasurementValid && integerValue > 0
  }

  const handleNameTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSessionName = event.target.value

    setSessionName(event.target.value)

    setSessionName((prevSessionName) => {
      const isStringValid = validateString(newSessionName)
      setIsNameValid(isStringValid)
      return prevSessionName
    })
  }

  const handleIntensityTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSessionIntensity = event.target.value

    setSessionIntensity(newSessionIntensity)

    setSessionIntensity((prevSessionIntensity) => {
      const isStringValid = validateStringMeasurement(newSessionIntensity)
      setIsIntensityValid(isStringValid)
      return prevSessionIntensity
    })
  }

  const handleWattTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSessionWatt = event.target.value

    setSessionWatt(newSessionWatt)

    setSessionWatt((prevSessionWatt) => {
      const isStringValid = validateStringMeasurement(newSessionWatt)
      setIsWattValid(isStringValid)
      return prevSessionWatt
    })
  }

  const handleSpeedTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSessionSpeed = event.target.value

    setSessionSpeed(newSessionSpeed)

    setSessionSpeed((prevSessionSpeed) => {
      const isStringValid = validateStringMeasurement(newSessionSpeed)
      setIsSpeedValid(isStringValid)
      return prevSessionSpeed
    })
  }

  const handlePulseTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSessionPulse = event.target.value

    setSessionPulse(newSessionPulse)

    setSessionPulse((prevSessionPulse) => {
      const isStringValid = validateStringMeasurement(newSessionPulse)
      setIsPulseValid(isStringValid)
      return prevSessionPulse
    })
  }

  const handleTypeDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSessionType(event.target.value)
  }

  const handlePerformerDropdownChange = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    setPerformerId(event.target.value)
  }

  const handleCheckboxChange = () => {
    setIsCheckboxSelected(!isCheckboxSelected)
  }

  const isQuestionExists = async (
    questionText: string,
    questionType: string,
  ) => {
    try {
      const response = await fetch(
        `/api/questions/getQuestion?questionText=${questionText}&questionType=${questionType}`,
        {
          method: "get",
        },
      )

      const data = await response.json()
      const statusCode = data.status

      if (statusCode == 200) {
        return { success: true, message: `Question exists.` }
      } else {
        return { success: false, message: `Question does not exist.` }
      }
    } catch (error) {
      return { success: false, message: error }
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (!isQuestionValid) {
      setSubmitButtonText("Error - Question Is Not Valid")
      return
    }

    await writeToDatabase()

    console.log(
      `Wrote the question '${sessionName}' with the response type '${questionType}' to the database.`,
    )
  }

  const writeToDatabase = async () => {
    const question: Question = {
      id: "",
      question: sessionName,
      type: questionType,
    }

    try {
      const data = await isQuestionExists(sessionName, questionType)
      const isSuccess = data.success

      if (isSuccess) {
        setSubmitButtonText("Error - Question Already Exists")
        return
      }

      const response = await fetch("/api/questions/createQuestion", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(question),
      })

      setSubmitButtonText("Question Saved!")

      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="form flex w-full flex-col space-y-4"
    >
      <div className="flex flex-col">
        <label htmlFor="sessionName" className="mb-1">
          Template name:
        </label>
        <input
          id="sessionName"
          type="text"
          value={sessionName}
          onChange={handleNameTextChange}
          placeholder="Enter a name for this template..."
          className={`border-2 ${
            isQuestionValid
              ? "border-green-400 text-green-600"
              : "border-red-600 text-red-600"
          } rounded transition-transform focus:scale-105`}
        />
      </div>

      <div className="flex flex-row">
        {/* First row */}
        <div className="flex flex-grow flex-col pr-2">
          <label htmlFor="sessionIntensity" className="mb-1">
            Intensity:
          </label>
          <input
            id="sessionIntensity"
            type="text"
            value={sessionIntensity}
            onChange={handleIntensityTextChange}
            placeholder="Enter a measurement..."
            className={`w-full border-2 ${
              isIntensityValid
                ? "border-green-400 text-green-600"
                : "border-red-600 text-red-600"
            } rounded p-2 transition-transform focus:scale-105`}
          />
        </div>

        <div className="flex flex-grow flex-col px-2">
          <label htmlFor="sessionWatt" className="mb-1">
            Watts:
          </label>
          <input
            id="sessionWatt"
            type="text"
            value={sessionWatt}
            onChange={handleWattTextChange}
            placeholder="Enter a measurement..."
            className={`w-full border-2 ${
              isWattValid
                ? "border-green-400 text-green-600"
                : "border-red-600 text-red-600"
            } rounded p-2 transition-transform focus:scale-105`}
          />
        </div>

        <div className="flex flex-grow flex-col px-2">
          <label htmlFor="sessionSpeed" className="mb-1">
            Speed:
          </label>
          <input
            id="sessionSpeed"
            type="text"
            value={sessionSpeed}
            onChange={handleSpeedTextChange}
            placeholder="Enter a measurement..."
            className={`w-full border-2 ${
              isSpeedValid
                ? "border-green-400 text-green-600"
                : "border-red-600 text-red-600"
            } rounded p-2 transition-transform focus:scale-105`}
          />
        </div>

        <div className="flex flex-grow flex-col pl-2">
          <label htmlFor="sessionPulse" className="mb-1">
            Pulse:
          </label>
          <input
            id="sessionPulse"
            type="text"
            value={sessionPulse}
            onChange={handlePulseTextChange}
            placeholder="Enter a measurement..."
            className={`w-full border-2 ${
              isPulseValid
                ? "border-green-400 text-green-600"
                : "border-red-600 text-red-600"
            } rounded p-2 transition-transform focus:scale-105`}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="sessionType" className="mb-1">
          Type of activity:
        </label>
        <select
          id="sessionType"
          value={sessionType}
          onChange={handleTypeDropdownChange}
          className="form__select rounded focus:scale-105"
        >
          <option value="cycling">Cycling</option>
          <option value="triathlon">Triathlon</option>
          <option value="running">Running</option>
          <option value="swimming">Swimming</option>
          <option value="skiing">Skiing</option>
          <option value="strength">Strength</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className=" flex flex-row items-center space-x-4">
        <input
          id="checkbox"
          type="checkbox"
          className="form__checkbox"
          onChange={handleCheckboxChange}
          checked={isCheckboxSelected}
        />
        <label htmlFor="checkbox">Unique to Performer</label>

        <label htmlFor="performer">Select Performer:</label>
        <select
          id="performer"
          value={performerId}
          onChange={handlePerformerDropdownChange}
          disabled={!isCheckboxSelected}
          className={`form__select ${
            isCheckboxSelected ? "--enabled" : "--disabled"
          } flex-grow rounded focus:scale-105`}
        >
          <option value="user1">User 1</option>
          <option value="user2">User 2</option>
          <option value="user3">User 3</option>
        </select>
      </div>

      <button
        type="submit"
        className={`form__button ${
          submitButtonText === "Question Saved!" ? "--question-saved" : ""
        }
        ${submitButtonText.startsWith("Error") ? "--error" : ""}`}
      >
        {submitButtonText}
      </button>
    </form>
  )
}

export default TemplateCreator
