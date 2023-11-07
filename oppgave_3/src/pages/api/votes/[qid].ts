import { type Result, type Vote } from '@/types'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result<Vote[] | Vote>>
) {
  switch (req.method?.toLowerCase()) {
    case 'get':
      const qid = req.query.qid as string
      const votes = await prisma.vote.findMany({
        where: {
          questionId: qid,
        },
      })

      {
        res.status(200).json({
          status: true,
          data: votes,
        })
        return
      }
    default: {
      res.status(404).json({ status: false, error: 'METHOD NOT ALLOWED' })
      return
    }
  }
}
