import type { NextApiRequest, NextApiResponse } from 'next'
import { type Poll, type Result } from '@/types'

const isValidPoll = (poll: Poll) => {
  return (
    !poll.endedAt &&
    poll.questions &&
    poll.questions.length > 0 &&
    poll.questions.every((question) => question.options.length > 0)
  )
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result<Poll>>
) {
  switch (req.method?.toLowerCase()) {
    case 'put':
      const poll = await prisma.poll.findUnique({
        where: { id: req.query.id as string },
        include: { questions: true },
      })
      if (!poll) {
        res.status(404).json({ status: false, error: 'Poll not found' })
        return
      }
      if (!isValidPoll(poll as unknown as Poll)) {
        res.status(404).json({ status: false, error: 'Poll is not valid' })
        return
      }

      const time = new Date()

      const now = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Europe/Oslo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZoneName: 'long',
      }).format(time)

      await prisma.poll.update({
        where: {
          id: poll.id,
        },
        data: {
          publishedAt: time.toISOString(),
        },
      })
      res.status(204).json({ status: true })
      break
    default: {
      res.status(404).json({ status: false, error: 'METHOD NOT ALLOWED' })
      return
    }
  }
}
