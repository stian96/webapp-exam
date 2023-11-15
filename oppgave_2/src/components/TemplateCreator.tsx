"use client"

import "../style/form.scss"

import React, { useState } from "react"
import type { Question } from "@/types/question"
import type { ChangeEvent, FormEvent } from "react"

import { QuestionTypeEnum } from "@/types/question"
import SessionTagCreator from "./SessionTagCreator"

// Code based on React documentation found here:
// https://legacy.reactjs.org/docs/forms.html

// Reference: I also used ChatGPT V3.5 quite a bit when creating the subforms.
// I've written comments where I've used it. The code it produced was heavily edited,
// but it gave me a good starting point.

//TODO Add validation to all inputs
//TODO Connect getUsers to the user dropdown.
//TODO Create get all questions request in API and assign to a state.
//TODO Connect it to the question dropdown.
//TODO Create API PUT to create session, along with intervals, questions (and sessionTags, sessionIntervals, sessionQuestions many to many)
//TODO Create feedback in button.
const TemplateCreator = () => {
  const [sessionName, setSessionName] = useState<string>("")
  const [sessionIntensity, setSessionIntensity] = useState<string>("")
  const [sessionWatt, setSessionWatt] = useState<string>("")
  const [sessionSpeed, setSessionSpeed] = useState<string>("")
  const [sessionPulse, setSessionPulse] = useState<string>("")
  const [sessionType, setSessionType] = useState<string>("cycling")
  const [performerId, setPerformerId] = useState<string>("")
  const [tags, setTags] = useState([""])
  const [intervals, setIntervals] = useState([{ duration: "", intensity: "" }])
  const [questions, setQuestions] = useState([{ question: "", type: "text" }])
  const [existingQuestions, setExistingQuestions] = useState([
    { question: "", type: "" },
  ])
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

  // Reference: ChatGPT V3.5
  const handleTagChange = (index: number, value: string) => {
    const newTags = [...tags]
    newTags[index] = value
    setTags(newTags)
  }

  // Reference: ChatGPT V3.5
  const handleAddAdditionalTag = () => {
    setTags([...tags, ""])
  }

  // Reference: ChatGPT V3.5
  const handleRemoveTag = (index: number) => {
    const newTags = [...tags]
    newTags.splice(index, 1)
    setTags(newTags)
  }

  // Reference: ChatGPT V3.5
  const handleIntervalChange = (
    index: number,
    field: string,
    value: string,
  ) => {
    const newIntervals = intervals.map((interval, i) =>
      i === index ? { ...interval, [field]: value } : interval,
    )
    setIntervals(newIntervals)
  }

  // Reference: ChatGPT V3.5
  const handleAddInterval = () => {
    setIntervals([...intervals, { duration: "", intensity: "" }])
  }

  // Reference: ChatGPT V3.5
  const handleRemoveInterval = (index: number) => {
    const newIntervals = [...intervals]
    newIntervals.splice(index, 1)
    setIntervals(newIntervals)
  }

  // Reference: ChatGPT V3.5
  const handleQuestionChange = (
    index: number,
    field: string,
    value: string,
  ) => {
    const newQuestions = questions.map((question, i) =>
      i === index ? { ...question, [field]: value } : question,
    )
    setQuestions(newQuestions)
  }

  // Reference: ChatGPT V3.5
  const handleAddQuestion = () => {
    setQuestions([...questions, { question: "", type: "text" }])
  }

  // Reference: ChatGPT V3.5
  const handleRemoveQuestion = (index: number) => {
    const newQuestions = [...questions]
    newQuestions.splice(index, 1)
    setQuestions(newQuestions)
  }

  // Reference: ChatGPT V3.5
  const handleExistingQuestionChange = (
    index: number,
    selectedQuestion: { question: string; type: string },
  ) => {
    const newExistingQuestions = [...existingQuestions]
    newExistingQuestions[index] = selectedQuestion
    setExistingQuestions(newExistingQuestions)
  }

  // Reference: ChatGPT V3.5
  const handleAddExistingQuestion = () => {
    setExistingQuestions([...existingQuestions, { question: "", type: "text" }])
  }

  // Reference: ChatGPT V3.5
  const handleRemoveExistingQuestion = (index: number) => {
    const newExistingQuestions = [...existingQuestions]
    newExistingQuestions.splice(index, 1)
    setExistingQuestions(newExistingQuestions)
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

  // Reference: ChatGPT V3.5. I can't comment directly into the following but the subforms but
  // I used it to create starting points for me to use to implement the tags, intervals, questions,
  // and existing questions sections near the bottom.
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
          className={`form__input ${
            isQuestionValid
              ? "border-green-400 text-green-600"
              : "border-red-600 text-red-600"
          }`}
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
            className={`form__input ${
              isIntensityValid
                ? "border-green-400 text-green-600"
                : "border-red-600 text-red-600"
            }`}
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
            className={`form__input ${
              isWattValid
                ? "border-green-400 text-green-600"
                : "border-red-600 text-red-600"
            }`}
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
            className={`form__input ${
              isSpeedValid
                ? "border-green-400 text-green-600"
                : "border-red-600 text-red-600"
            }`}
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
            className={`form__input ${
              isPulseValid
                ? "border-green-400 text-green-600"
                : "border-red-600 text-red-600"
            }`}
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

      <div className="subform">
        <span>Tags:</span>
        {tags.map((tag, index) => (
          <div key={index} className="flex items-center space-x-4">
            <label htmlFor={`tag-${index + 1}`} className="flex-shrink-0">
              Tag {index + 1}:
            </label>
            <input
              type="text"
              id={`tag-${index + 1}`}
              value={tag}
              className="form__input"
              onChange={(e) => {
                handleTagChange(index, e.target.value)
              }}
              placeholder="Enter a tag..."
            />
            {index == 0 && (
              <button
                type="button"
                onClick={handleAddAdditionalTag}
                className="subform__button --add w-1/5 flex-shrink-0"
              >
                Add Additional Tag
              </button>
            )}
            {index > 0 && (
              <button
                type="button"
                onClick={() => {
                  handleRemoveTag(index)
                }}
                className="subform__button w-1/5 flex-shrink-0"
              >
                Remove Tag
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="subform">
        <span>Intervals:</span>
        {intervals.map((interval, index) => (
          <div key={index} className="flex items-center space-x-4">
            <label htmlFor={`duration-${index + 1}`}>Duration:</label>
            <input
              type="text"
              id={`duration-${index + 1}`}
              value={interval.duration}
              className="form__input"
              onChange={(e) => {
                handleIntervalChange(index, "duration", e.target.value)
              }}
              placeholder="Enter duration..."
            />

            <label htmlFor={`intensity-${index + 1}`}>Intensity:</label>
            <input
              type="text"
              id={`intensity-${index + 1}`}
              value={interval.intensity}
              className="form__input"
              onChange={(e) => {
                handleIntervalChange(index, "intensity", e.target.value)
              }}
              placeholder="Enter intensity..."
            />

            {index === 0 && (
              <button
                type="button"
                onClick={handleAddInterval}
                className="subform__button --add w-1/5 flex-shrink-0"
              >
                Add Interval
              </button>
            )}

            {index > 0 && (
              <button
                type="button"
                onClick={() => handleRemoveInterval(index)}
                className="subform__button w-1/5 flex-shrink-0"
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="subform">
        <span>Questions:</span>
        {questions.map((question, index) => (
          <div key={index} className="flex items-center space-x-4">
            <label htmlFor={`text-${index + 1}`}>Question:</label>
            <input
              type="text"
              id={`text-${index + 1}`}
              value={question.text}
              className="form__input"
              onChange={(e) => {
                handleQuestionChange(index, "text", e.target.value)
              }}
              placeholder="Enter a question..."
            />

            <label htmlFor={`type-${index + 1}`}>Type:</label>
            <select
              id={`type-${index + 1}`}
              value={question.type}
              onChange={(e) => {
                handleQuestionChange(index, "type", e.target.value)
              }}
              className="form__select rounded focus:scale-105"
            >
              <option value="text">Text</option>
              <option value="radio:range">Radio: Range</option>
              <option value="radio:mood">Radio: Mood</option>
            </select>

            {index === 0 && (
              <button
                type="button"
                onClick={handleAddQuestion}
                className="subform__button --add w-1/5 flex-shrink-0"
              >
                Add Question
              </button>
            )}

            {index > 0 && (
              <button
                type="button"
                onClick={() => {
                  handleRemoveQuestion(index)
                }}
                className="subform__button w-1/5 flex-shrink-0"
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="subform">
        <span>Existing Questions:</span>
        {existingQuestions.map((existingQuestion, index) => (
          <div key={index} className="flex items-center space-x-4">
            <label htmlFor={`existing-question-${index + 1}`}>Question:</label>
            <select
              id={`existing-question-${index + 1}`}
              value={existingQuestion.question}
              className="form__input"
              onChange={(e) => {
                handleExistingQuestionChange(index, {
                  question: e.target.value,
                  type: existingQuestion.type,
                })
              }}
            >
              <option value="Option 1">Do you like eggs?</option>
              <option value="Option 2">What about sawdust?</option>
              <option value="Option 3">Have you heard?</option>
            </select>

            <label htmlFor={`type-${index + 1}`}>Type:</label>
            <select
              id={`type-${index + 1}`}
              value={existingQuestion.type}
              onChange={(e) => {
                handleExistingQuestionChange(index, {
                  question: existingQuestion.question,
                  type: e.target.value,
                })
              }}
              className="form__select rounded focus:scale-105"
            >
              <option value={QuestionTypeEnum.TEXT}>Text</option>
              <option value={QuestionTypeEnum.RADIO_NUMBER}>1 to 10</option>
              <option value={QuestionTypeEnum.RADIO_EMOJI}>Emojis</option>
            </select>

            {index === 0 && (
              <button
                type="button"
                onClick={handleAddExistingQuestion}
                className="subform__button --add w-1/5 flex-shrink-0"
              >
                Add Existing Question
              </button>
            )}

            {index > 0 && (
              <button
                type="button"
                onClick={() => {
                  handleRemoveExistingQuestion(index)
                }}
                className="subform__button w-1/5 flex-shrink-0"
              >
                Remove
              </button>
            )}
          </div>
        ))}
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
