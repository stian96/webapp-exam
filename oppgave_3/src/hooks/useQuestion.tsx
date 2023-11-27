import { useState } from 'react'
import {
  type Option,
  type Question,
  type QuestionCreateInput,
  type VoteCreateInput,
} from '@/types'

const insert = <T,>(data: T[], end: number, updated: Partial<T>) => {
  return [
    ...data.slice(0, end),
    { ...data[end], ...updated },
    ...data.slice(end + 1),
  ]
}

export default function useQuestion(initialState?: Question[]) {
  const [questions, setQuestions] = useState<Question[]>(initialState ?? [])
  const [votes, setVotes] = useState<VoteCreateInput[]>([])

  const addVote = (option: Option, questionId: string) => {
    const data = { questionId, option: option.option }
    const voteIndex = votes.findIndex((vote) => vote.questionId === questionId)
    if (voteIndex >= 0) {
      const updatedVotes = insert(votes, voteIndex, data)
      setVotes(updatedVotes)
    } else {
      setVotes((prev) => [...prev, { questionId, option: option.option }])
    }
  }

  // There's no validation for the import forms, thus anything (also nothing - space or tab)
  // can be entered as a question or alternative. This allows the user to enter anything
  // they want which both results in dirty data, as well as rendering hidden elements of
  // the backend susceptible to cyber attacks (XSRF, injections, etc.). This could be remedied
  // by first checking (client side) whether the forms are valid through regex expressions, before
  // then sending a request to the server side API (which then additionally verifies data is
  // of correct format). Feedback could appear as a change in text colour, or input border colour,
  // as well as text elements informing the user of the missing/incorrect data in the form.
  const handleQuestion = (questionIndex: number, data: QuestionCreateInput) => {
    if (questionIndex >= 0) {
      const updatedQuestions = insert(questions, questionIndex, data)
      setQuestions(updatedQuestions)
    }
  }

  const handleOption = (
    questionIndex: number,
    optionIndex: number,
    data: Option
  ) => {
    if (questionIndex >= 0 && optionIndex >= 0) {
      const updatedOption = insert(
        questions[questionIndex].options,
        optionIndex,
        data
      )
      const updatedQuestion = insert(questions, questionIndex, {
        options: updatedOption,
      })
      setQuestions(updatedQuestion)
    }
  }

  return {
    questions,
    handleQuestion,
    handleOption,
    setQuestions,
    addVote,
    votes,
  }
}
