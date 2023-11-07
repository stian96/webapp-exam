import { BASE_URL } from '../config'
import fetch from '@/lib/fetch'
import {
  type Question,
  type QuestionCreateInput,
  type QuestionUpdateInput,
} from '@/types'

const QUESTION_URL = `${BASE_URL}/questions`

export const getQuestions = (options?: {}) => {
  return fetch<Question[]>(QUESTION_URL, {
    method: 'GET',
    ...options,
  })
}

export const getQuestion = (id: string, options?: {}) => {
  return fetch<Question>(`${QUESTION_URL}/${id}`, {
    method: 'GET',
    ...options,
  })
}

export const createQuestion = (data: QuestionCreateInput, options?: {}) => {
  return fetch<Question>(QUESTION_URL, {
    method: 'POST',
    ...options,
    body: JSON.stringify(data),
  })
}

export const updatePoll = (
  id: string,
  data: QuestionUpdateInput,
  options?: {}
) => {
  return fetch<Question>(`${QUESTION_URL}/${id}`, {
    method: 'PUT',
    ...options,
    body: JSON.stringify(data),
  })
}

export const getVotes = (id: string, options?: {}) => {
  return fetch<Question>(`${QUESTION_URL}/${id}/votes`, {
    method: 'GET',
    ...options,
  })
}
