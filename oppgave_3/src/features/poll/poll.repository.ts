import { type Poll, type PollCreateInput, type Result } from '@/types'
import prisma from '@/lib/db'

// These Prisma functions could be easily condensed by combining the logic in the service 
// and controller classes and returning a NextResponse/Response class with an actual http 
// status code (e.g. 404 for if an entry doesn't exist, 200 if it exists, 201 if a poll 
// was successfully created, 500 for internal server error, etc.).

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
