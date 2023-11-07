import { ApiResponse } from './apiResponse'
import { type NextApiResponse } from 'next'
import { type Error } from '@/types'

const getError = (error: Error) => {
  const err = { ...error }
  const message = err.message.toLowerCase()
  if (err.type) return err
  message.includes('not found') ? (err.type = 'NotFound') : false
  message.includes('invalid') ? (err.type = 'ValidationError') : false
  message.includes('already exist') ? (err.type = 'Conflict') : false
  return err
}

function errorHandler(err: Error, res: NextApiResponse) {
  const error = getError(err)

  switch (error.type) {
    case 'NotFound': {
      ApiResponse(res).notFound(error)
      return
    }
    case 'Conflict': {
      ApiResponse(res).conflict(error)
      return
    }
    case 'ValidationError': {
      ApiResponse(res).badRequest(error)
      return
    }
    default: {
      ApiResponse(res).serverError(error)
      return
    }
  }
}

export { errorHandler }
