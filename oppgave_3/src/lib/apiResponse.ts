import { type NextApiResponse } from 'next'
import { type Error, type Result } from '@/types'

type ApiResponseResult<T> = {
  ok(data: T): void
  created(data: T): void
  badRequest(error?: Error): void
  notFound(error?: Error): void
  unauthorized(error?: Error): void
  conflict(error?: Error): void
  serverError(error?: Error): void
}

type ApiResult = {
  success<T>(data?: T): Result<T>
  failure(error: Error): Result<never>
}

export const ApiResult: ApiResult = {
  success(data) {
    if (data) {
      return { status: true, data }
    }
    return { status: true }
  },
  failure(error) {
    return { status: false, error }
  },
}

export const ApiResponse = <T>(
  res: NextApiResponse<Result<T>>
): ApiResponseResult<T> => ({
  ok(data: T) {
    res.status(200).json(ApiResult.success(data))
  },
  created: (data: T) => {
    res.status(201).json(ApiResult.success(data))
  },
  badRequest: (error = { message: 'Dataen du har fylt ut innholder feil' }) => {
    res.status(400).json(ApiResult.failure(error))
  },
  unauthorized: (error = { message: 'Du har ikke tilgang' }) => {
    res.status(401).json(ApiResult.failure(error))
  },
  notFound: (error = { message: 'Fant ikke ressuren' }) => {
    res.status(404).json(ApiResult.failure(error))
  },
  conflict: (error = { message: 'Ressursen finnes allerede' }) => {
    res.status(409).json(ApiResult.failure(error))
  },
  serverError: (error = { message: 'Forespørselen feilet' }) => {
    res.status(500).json(ApiResult.failure(error))
  },
})
