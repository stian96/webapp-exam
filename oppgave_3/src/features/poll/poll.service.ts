import { type Poll, type PollCreateInput, type Result } from '@/types'
import * as pollRepo from './poll.repository'

export const create = async ({
  title,
  slug,
}: PollCreateInput): Promise<Result<Poll>> => {
  const poll = await pollRepo.exist({ slug })

  if (!poll.status) return { status: false, error: poll.error }

  if (poll.data)
    return { status: false, error: { message: 'Poll already exist' } }

  const createdPoll = await pollRepo.create({ title, slug })

  if (!createdPoll.status) return { status: false, error: createdPoll.error }

  return { status: true, data: createdPoll.data }
}
