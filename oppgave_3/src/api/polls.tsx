import { BASE_URL } from '../config'
import fetch from '@/lib/fetch'
import { type Poll, type PollCreateInput, type PollUpdateInput } from '@/types'

const POLLS_URL = `${BASE_URL}/polls`

export const getPolls = (options?: {}) => {
  return fetch<Poll[]>(POLLS_URL, {
    method: 'GET',
    ...options,
  })
}

export const getPoll = (id: string, options?: Record<string, unknown>) => {
  return fetch<Poll>(`${POLLS_URL}/${id}`, {
    method: 'GET',
    ...options,
  })
}

export const getPollQuestions = (
  id: string,
  options?: Record<string, unknown>
) => {
  return fetch<Poll>(`${POLLS_URL}/${id}/questions`, {
    method: 'GET',
    ...options,
  })
}

export const createPoll = (
  data: PollCreateInput,
  options?: Record<string, unknown>
) => {
  return fetch<Poll>(POLLS_URL, {
    method: 'POST',
    ...options,
    body: JSON.stringify(data),
  })
}

export const updatePoll = (id: string, data: PollUpdateInput, options?: {}) => {
  return fetch<Poll>(`${POLLS_URL}/${id}`, {
    method: 'PUT',
    ...options,
    body: JSON.stringify(data),
  })
}

export const publishPoll = (id: string, options?: {}) => {
  return fetch(`${POLLS_URL}/${id}/publish`, {
    method: 'PUT',
    ...options,
  })
}
