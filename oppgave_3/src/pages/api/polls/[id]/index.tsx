import { type Poll, type Result } from '@/types'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result<Poll>>
) {
  switch (req.method?.toLowerCase()) {
    case 'get':
      const id =
        req.query.id instanceof Array
          ? req.query.id.find((i) => i.includes('id'))
          : req.query.id

      if (!id) {
        res
          .status(400)
          .json({ status: false, error: 'Id is missing not found' })
        return
      }

      const poll = await prisma.poll.findUnique({ where: { id } })

      if (!poll) {
        res.status(404).json({ status: false, error: 'Poll with id not found' })
        return
      }

      {
        res.status(200).json({ status: true, data: poll })
        return
      }
    case 'put':
      res.status(204).json({ status: true })
      break
    case 'delete':
      res.status(204).json({ status: true })
      break
    default: {
      res.status(404).json({ status: false, error: 'METHOD NOT ALLOWED' })
      return
    }
  }
}
