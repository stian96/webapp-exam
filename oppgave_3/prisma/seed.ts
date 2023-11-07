import { Option, PollCreateInput, QuestionCreateInput } from '@/types/index'
import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

const pollFactory = (count: number) => {
  return Array(count)
    .fill(null)
    .map(() => {
      const poll: PollCreateInput = {
        title: faker.lorem.word(10),
        slug: faker.lorem.slug(),
      }
      return poll
    })
}

const questionFactory = (count: number, pollId: string, optionCount = 4) => {
  return Array(count)
    .fill(null)
    .map(() => {
      const question: QuestionCreateInput = {
        question: faker.lorem.sentence(5),
        pollId,
        options: optionFactory(
          optionCount !== 4
            ? Math.floor(Math.random() * optionCount) + 1
            : optionCount
        ),
      }
      return question
    })
}

const optionFactory = (count: number) => {
  return Array(count)
    .fill(null)
    .map(() => {
      const option: Option = {
        option: faker.lorem.word(15),
      }
      return option
    })
}

const createPolls = async (count: number) => {
  try {
    for (const poll of pollFactory(count)) {
      await prisma.poll.create({ data: poll })
    }
  } catch (error) {
    throw error
  }
}

const getRandomPoll = async () => {
  const polls = await prisma.poll.findMany()
  const random = Math.floor(Math.random() * polls.length)
  if (polls.length > 0) {
    return polls[random]?.id
  }
  return null
}

const createQuestion = async (count: number) => {
  try {
    const poll = await getRandomPoll()
    if (poll) {
      for (const { question, options, pollId } of questionFactory(
        count,
        poll
      )) {
        await prisma.question.create({
          data: {
            question,
            options: JSON.stringify(options),
            poll: {
              connect: {
                id: pollId,
              },
            },
          },
        })
      }
    } else {
      throw new Error('Poll not available')
    }
  } catch (error) {
    console.log('ERROR', error)
    throw error
  }
}

async function main() {
  await prisma.question.deleteMany({})
  await prisma.poll.deleteMany({})
  await prisma.vote.deleteMany({})
  console.log(`Start seeding ...`)

  await createPolls(3)
  await createQuestion(2)
  await createQuestion(2)
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
