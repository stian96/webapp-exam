import { type Result, type Vote, type VoteCreateInput } from '@/types'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result<Vote[] | Vote>>
) {
  switch (req.method?.toLowerCase()) {
    case 'get':
      const votes = await prisma.vote.findMany()
      {
        res.status(200).json({ status: true, data: votes })
        return
      }
    case 'post':
      try {
        const data = req.body as VoteCreateInput[]
        let qid = ''
        for (const vote of data) {
          qid = vote.questionId
          await prisma.vote.create({
            data: {
              option: vote.option,
              question: {
                connect: {
                  id: vote.questionId,
                },
              },
            },
          })
        }
        const vote = await prisma.vote.findMany({
          where: {
            questionId: qid,
          },
        })
        res.status(201).json({ status: true, data: vote })
        return
      } catch (error) {
        console.log('ERROR', error)
        res.status(500).json({ status: false, error: 'Create Question Failed' })
        return
      }
    default: {
      res.status(404).json({ status: false, error: 'METHOD NOT ALLOWED' })
      return
    }
  }
}
