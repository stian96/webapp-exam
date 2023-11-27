import { type NextApiRequest, type NextApiResponse } from 'next'
import { type Poll, type Result } from '@/types'

import * as pollService from './poll.service'

// The MVC architecture, while tried and tested, isn't the ideal choice for projects that 
// are using Next JS 13. This is because Next JS has its own architecture that should be 
// followed, which allows developers to easily implement pages (including client side 
// rendered pages), API routes, and react components, while decreasing development time.
// In Next JS 13 the API routes inside 'src/app/api' remain serverless and can be used with 
// client side react components that contain useState, useEffect, etc.

// Here we can see that the only validation present is that -something- is sent as a title and 
// slug. This isn't the greatest solution as it is a security risk, as well as making the database 
// susceptible to dirty data (e.g. a title that is just the character '~' is valid in this case).

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
