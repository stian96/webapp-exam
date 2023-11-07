import type { NextApiRequest, NextApiResponse } from 'next'
import { type Poll, type Result } from '@/types'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result<Poll>>
) {
  switch (req.method?.toLowerCase()) {
    case 'put':
      res.status(204).json({ status: true })
      break
    default: {
      res.status(404).json({ status: false, error: 'METHOD NOT ALLOWED' })
      return
    }
  }
}
