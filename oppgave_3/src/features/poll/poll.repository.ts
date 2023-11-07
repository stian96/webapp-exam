import { type Poll, type PollCreateInput, type Result } from '@/types'
import prisma from '@/lib/db'

export const create = async (data: PollCreateInput): Promise<Result<Poll>> => {
  try {
    const poll = await prisma.poll.create({ data })

    return { status: true, data: poll }
  } catch (error) {
    return { status: false, error: { message: 'Failed creating user' } }
  }
}

export const exist = async ({
  slug,
}: Pick<PollCreateInput, 'slug'>): Promise<Result<Poll | null>> => {
  try {
    const poll = await prisma.poll.findUnique({
      where: {
        slug,
      },
    })

    return { status: true, data: poll }
  } catch (error) {
    return { status: false, error: { message: 'Failed finding user' } }
  }
}
