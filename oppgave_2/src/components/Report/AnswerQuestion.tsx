"use client"

import "@/style/report.scss"

import React, { useEffect, useState } from "react"

import { EmojiEnum } from "@/enums/emojiEnum"
import { QuestionTypeEnum } from "@/enums/questionTypeEnum"
import { type Answer } from "@/types/answer"
import { type Question } from "@/types/question"

type AnswerProps = {
  reportId: string
  onAnswerChange: (
    questionId: string,
    answerValue: string | number,
    questionType: string,
  ) => void
  questions: Question[]
}

const AnswerQuestion = ({
  reportId,
  onAnswerChange,
  questions,
}: AnswerProps) => {
  console.log("Questions received in AnswerQuestion:", questions)

  const [answers, setAnswers] = useState<Answer[]>([])

  useEffect(() => {
    const initialAnswers = questions.map((question) => ({
      questionId: question.id ?? "",
      answerText: null,
      answerNumber: null,
      answerEmoji: null,
    }))

    setAnswers(initialAnswers)
    console.log("initital answers", initialAnswers)
  }, [questions])

  const handleAnswerChange = (
    questionId: string,
    value: string | number,
    questionType: string,
  ) => {
    onAnswerChange(questionId, value, questionType)
  }

  const emojiMapping = {
    [EmojiEnum.POOR]: "Poor",
    [EmojiEnum.NORMAL]: "Normal",
    [EmojiEnum.BETTER]: "Better",
  }

  //SRC: https://www.freecodecamp.org/news/build-dynamic-forms-in-react/
  // also used chatGPT to clean up things that were't completely optimal

  const renderInputField = (question: Question) => {
    console.log("Rendering input for question:", question)
    const inputId = `question-${question.id}-${reportId}`
    const currentAnswer = answers.find((a) => a.questionId === question.id)

    switch (question.type) {
      case QuestionTypeEnum.TEXT:
        return (
          <input
            id={inputId}
            type="text"
            value={
              answers.find((a) => a.questionId === question.id)?.answerText
            }
            onChange={(e) => {
              handleAnswerChange(
                question.id ?? "",
                e.target.value,
                QuestionTypeEnum.TEXT,
              )
            }}
            className="answer__input"
          />
        )

      case QuestionTypeEnum.RADIO_EMOJI:
        return (
          <div className="radio__group">
            {Object.entries(emojiMapping).map(([key, text]) => (
              <label
                key={key}
                className="radio__label flex flex-col items-center"
              >
                <input
                  type="radio"
                  name={inputId}
                  value={text}
                  checked={currentAnswer?.answerEmoji === key}
                  onChange={() => {
                    handleAnswerChange(
                      question.id ?? "",
                      key,
                      QuestionTypeEnum.RADIO_EMOJI,
                    )
                  }}
                  className="radio__input"
                />
                {text}
              </label>
            ))}
          </div>
        )

      case QuestionTypeEnum.RADIO_NUMBER: {
        const numberOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        return (
          <div className="radio__group">
            {numberOptions.map((num) => (
              <label
                key={num}
                className="radio__label flex flex-col items-center"
              >
                <input
                  type="radio"
                  name={inputId}
                  value={num}
                  checked={currentAnswer?.answerNumber === num}
                  onChange={() => {
                    handleAnswerChange(
                      question.id ?? "",
                      num,
                      QuestionTypeEnum.RADIO_NUMBER,
                    )
                  }}
                  className="radio__input"
                />
                {num}
              </label>
            ))}
          </div>
        )
      }

      default:
        return <div>Unsupported question type</div>
    }
  }

  return (
    <div className="mx-auto flex max-w-md flex-col">
      <h3 className="mb-6 text-center font-semibold">Session Questions</h3>
      <form className="mb-1 flex w-full flex-col">
        {questions.map((item) => {
          const question = item.question
          return question.id ? (
            <div key={question.id} className="mb-4">
              <div className="mb-1">{question.question}</div>
              {renderInputField(question)}
            </div>
          ) : null
        })}
      </form>
    </div>
  )
}

export default AnswerQuestion
