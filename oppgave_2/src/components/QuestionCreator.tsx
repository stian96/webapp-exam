"use client"

import "../style/form.scss"

import { randomUUID } from "crypto"
import React, { useState } from "react"
import type { Question } from "@/types/question"
import type { ChangeEvent, FormEvent } from "react"

import { getQuestionTypeEnum } from "@/types/question"
import { QuestionTypeEnum } from "../enums/questionTypeEnum"

// Code based on React documentation found here:
// https://legacy.reactjs.org/docs/forms.html

const QuestionCreator = () => {
  const [questionText, setQuestion] = useState<string>("")
  const [questionType, setQuestionType] = useState<string>("text")
  const [isQuestionValid, setIsQuestionValid] = useState<boolean>(false)
  const [submitButtonText, setSubmitButtonText] =
    useState<string>("Save Question")

  // Function for validating a string. It mustn't be empty, and must contain at least 3 unicode characters.
  const validateString = (string: string) => {
    const isStringValid = string.trim() !== "" && /\p{L}{3,}/u.test(string)

    return isStringValid
  }

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuestionText = event.target.value

    setQuestion(event.target.value)

    setQuestion((prevQuestionText) => {
      const isStringValid = validateString(newQuestionText)
      setIsQuestionValid(isStringValid)
      return prevQuestionText
    })
  }

  const handleDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setQuestionType(event.target.value)
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
      `Wrote the question '${questionText}' with the response type '${questionType}' to the database.`,
    )
  }

  const writeToDatabase = async () => {
    const questionTypeEnum = getQuestionTypeEnum(questionType)

    if (questionTypeEnum == undefined) {
      console.log("Question type could not be deserialised.")
      return
    }

    const question: Question = {
      id: "",
      question: questionText,
      type: questionTypeEnum,
    }

    try {
      const data = await isQuestionExists(questionText, questionType)
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
        <label htmlFor="questionText" className="mb-1">
          Question Text:
        </label>
        <input
          id="questionText"
          type="text"
          value={questionText}
          onChange={handleTextChange}
          placeholder="Enter a question!"
          className={`form__input ${
            isQuestionValid
              ? "border-green-400 text-green-600"
              : "border-red-600 text-red-600"
          }`}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="questionType" className="mb-1">
          Question Type:
        </label>
        <select
          id="questionType"
          value={questionType}
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
