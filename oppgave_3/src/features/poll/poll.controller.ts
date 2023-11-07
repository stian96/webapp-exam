import { type NextApiRequest, type NextApiResponse } from 'next'
import { type Poll, type Result } from '@/types'

import * as pollService from './poll.service'

export const createPoll = async (
  req: NextApiRequest,
  res: NextApiResponse<Result<Poll>>
) => {
  const { title, slug } = req.body

  if (!title || !slug) {
    res.status(400).json({
      status: false,
      error: { message: 'Missing required fields' },
    })
    return
  }

  const createdPoll = await pollService.create({
    title,
    slug,
  })

  if (!createdPoll.status) {
    res.status(500).json({
      status: false,
      error: createdPoll.error,
    })
    return
  }

  res.status(201).json({
    status: true,
    data: createdPoll.data,
  })
}
