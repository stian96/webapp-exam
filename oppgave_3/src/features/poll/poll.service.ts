import { type Poll, type PollCreateInput, type Result } from '@/types'
import * as pollRepo from './poll.repository'

// The logic of this function is pretty solid. If the dev wished to combine both the 
// 'is exists' and 'create' commands they could set a unique constraint on the column 
// in the prisma schema that they wished to preserve, thus making it impossible to 
// overwrite. Alternatively, having two separate API endpoints is also a valid solution 
// as it means that the 'is exists' functionality can be reused, or feedback on whether 
// a username, for example, exists, could be displayed upon an input element being modified.
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
