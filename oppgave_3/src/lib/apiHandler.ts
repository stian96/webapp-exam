import { type NextApiRequest, type NextApiResponse } from 'next'

import { type Error, type Result } from '@/types'
import { errorHandler } from './errorHandler'

type ApiRequest = NextApiRequest
type ApiResponse<T> = NextApiResponse<T>

export { apiHandler }

type Handler<T> = {
  get: (req: ApiRequest, res: NextApiResponse<Result<T>>) => void
  post: (req: ApiRequest, res: NextApiResponse<Result<T>>) => void
  put: (req: ApiRequest, res: NextApiResponse<Result<T>>) => void
  remove: (req: ApiRequest, res: NextApiResponse<Result<T>>) => void
}

function apiHandler<T>(handler: Partial<Handler<T>>) {
  return async (req: ApiRequest, res: ApiResponse<Result<T>>) => {
    const method = req.method?.toLowerCase() as keyof Handler<T>
    if (method && handler[method]) {
      try {
        await handler[method]?.(req, res)
      } catch (err) {
        errorHandler(err as Error, res)
      }
    } else {
      res.status(405).json({
        status: false,
        error: { message: `Method ${req.method} Not Allowed` },
      })
      return
    }
  }
}
