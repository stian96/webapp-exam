"use client"

import "../style/form.scss"

import React, { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"

import { QuestionTypeEnum } from "@/types/question"

// Code based on React documentation found here:
// https://legacy.reactjs.org/docs/forms.html

const QuestionCreator = () => {
  const [questionText, setQuestion] = useState<string>("")
  const [questionResponseType, setQuestionType] = useState<string>("text")
  const [isQuestionValid, setIsQuestionValid] = useState<boolean>(false)
  const [submitButtonText, setSubmitButtonText] =
    useState<string>("Save Question")

  // Function for validating a string. It mustn't be empty, and must contain at least one unicode character.
  const validateQuestionText = () => {
    const isStringValid =
      questionText.trim() !== "" && /\p{L}/u.test(questionText)

    setIsQuestionValid(isStringValid)
  }

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value)
    validateQuestionText()
  }

  const handleDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setQuestionType(event.target.value)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (!isQuestionValid) {
      setSubmitButtonText("Error - Question Is Not Valid")
      return
    } else if (submitButtonText == "Error - Question Already Exists") {
      return
    }
    //TODO Call API to check if question already exists.
    //setSubmitButtonText("Error - Question Already Exists")

    //TODO Write to database using API
    setSubmitButtonText("Question Saved!")

    console.log(
      `Wrote the question '${questionText}' with the response type '${questionResponseType}' to the database.`,
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="form flex w-full flex-col space-y-4"
    >
      <div className="flex flex-col">
        <label htmlFor="questionText" className="mb-1">
          Question Text:
        </label>
        <input
          id="questionText"
          type="text"
          value={questionText}
          onChange={handleTextChange}
          placeholder="Enter a question!"
          className={`border-2 ${
            isQuestionValid
              ? "border-green-400 text-green-600"
              : "border-red-600 text-red-600"
          } rounded transition-transform focus:scale-105`}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="questionType" className="mb-1">
          Question Type:
        </label>
        <select
          id="questionType"
          value={questionResponseType}
          onChange={handleDropdownChange}
          className="form__select rounded focus:scale-105"
        >
          <option value={QuestionTypeEnum.TEXT}>Text</option>
          <option value={QuestionTypeEnum.RADIO_NUMBER}>1 to 10</option>
          <option value={QuestionTypeEnum.RADIO_EMOJI}>Emojis</option>
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

export default QuestionCreator
