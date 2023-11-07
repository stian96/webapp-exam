import { type Result, type Poll } from '@/types'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/db'
import { apiHandler } from '@/lib'

const getPolls = async (
  req: NextApiRequest,
  res: NextApiResponse<Result<Poll | Poll[]>>
) => {
  const filter = req.query
  const polls = await prisma.poll.findMany({})
  res.status(200).json({ status: true, data: polls })
}
const createPoll = async (
  req: NextApiRequest,
  res: NextApiResponse<Result<Poll>>
) => {
  const data = req.body
  if (!data?.title || data.title.length < 5)
    throw { message: 'Invalid title', type: 'ValidationError' }
  const poll = await prisma.poll.create({ data })
  res.status(201).json({ status: true, data: poll })
}

export default apiHandler<Poll[] | Poll>({
  get: getPolls,
  post: createPoll,
})
