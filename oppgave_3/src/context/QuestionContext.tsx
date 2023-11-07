import React from 'react'
import useQuestion from '../hooks/useQuestion'
import { type Option, type QuestionCreateInput } from '../types'

export type HandleQuestion = (
  questionIndex: number,
  data: QuestionCreateInput
) => void

export type HandleOption = (
  questionIndex: number,
  optionIndex: number,
  data: Option
) => void

export type QuestionContext = {
  questions: QuestionCreateInput[]
  handleQuestion: HandleQuestion
  handleOption: HandleOption
}

const QuestionContext = React.createContext<QuestionContext | undefined>(
  undefined
)

const QuestionProvider = ({ children }: { children: React.ReactNode }) => {
  const { handleQuestion, handleOption, questions } = useQuestion()

  return (
    <QuestionContext.Provider
      value={{
        handleQuestion,
        handleOption,
        questions,
      }}
    >
      {children}
    </QuestionContext.Provider>
  )
}

const useQuestionContext = () => {
  const context = React.useContext(QuestionContext)
  if (!context) throw new Error('WeatherContext must have av PollProvider')
  return context
}

export { useQuestionContext, QuestionProvider }
