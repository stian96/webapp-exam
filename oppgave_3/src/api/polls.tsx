import { BASE_URL } from '../config'
import fetch from '@/lib/fetch'
import { type Poll, type PollCreateInput, type PollUpdateInput } from '@/types'


// Considering this project blends Next JS 12 and 13 together I would move the API endpoints 
// to the src/app/api folder (would need to be created) and convert components to use V13
// architecture. This file uses the fetch library which is compatible with Next JS 13, but 
// I would include these fetch functions in the client-side React components (or custom 
// hooks depending on size and reusability). By doing this the API endpoints and database 
// remain server-side components, improving performance and decreasing the amount of requests 
// required. Right now it appears that these API routes are spread over many different files, 
// making it difficult for developers unfamiliar with the code to readily understand exactly 
// where data is located. Having all API endpoints in the src/app/api folders also allow 
// devs to create a file structure with folders such as 'getPolls', and 
// 'getPollQuestions/[questionId]' which is much easier to understand at a glance, and can 
// implement Swagger or Postman to document exactly what routes are available, and how to 
// use them.
const POLLS_URL = `${BASE_URL}/polls`

export const getPolls = (options?: {}) => {
  return fetch<Poll[]>(POLLS_URL, {
    method: 'GET',
    ...options,
  })
}

// This API route could make use of dynamic routes in Next JS 13 (api/getPoll/[pollId]).
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
