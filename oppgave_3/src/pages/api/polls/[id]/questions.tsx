import { type Poll, type Result } from '@/types'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result<Poll>>
) {
  switch (req.method?.toLowerCase()) {
    case 'get':
      const poll = await prisma.poll.findUnique({
        where: { id: req.query.id as string },
        include: { questions: true },
      })

      if (!poll) {
        res.status(404).json({
          status: false,
          error: { message: 'Could not find poll with id' },
        })
        return
      }

      const parsedPoll = {
        ...poll,
        questions: poll.questions.map((question) => ({
          ...question,
          options: JSON.parse(question.options),
        })),
      }

      {
        res.status(200).json({ status: true, data: parsedPoll })
        return
      }
    default: {
      res
        .status(405)
        .json({ status: false, error: { message: 'METHOD NOT ALLOWED' } })
      return
    }
  }
}
