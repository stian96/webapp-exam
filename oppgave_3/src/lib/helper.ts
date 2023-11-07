import prisma from './db'

export const getQuestions = async (pollId: string) => {
  const data = await prisma.question.findMany({
    where: {
      pollId,
    },
    select: {
      question: true,
      options: true,
      pollId: true,
      vote: true,
    },
  })
  return data.map((item) => ({
    ...item,
    options: JSON.parse(item.options),
    vote: item.vote.map((v) => ({
      ...v,
      createdAt: JSON.stringify(v.createdAt),
    })),
  }))
}

export const getPollData = async (pollId: string) => {
  const data = await prisma.question.findMany({
    where: {
      pollId,
    },
    select: {
      id: true,
      question: true,
      options: true,
      pollId: true,
      vote: true,
    },
  })
  const voteResults = []
  const voteCounts = []
  for (const question of data) {
    const voteResult = await prisma.vote.groupBy({
      where: {
        questionId: question.id,
      },
      by: ['option'],
      _count: {
        option: true,
      },
    })
    const voteCount = await prisma.vote.count({
      where: {
        questionId: question.id,
      },
    })
    voteResults.push({ [question.id]: voteResult })
    voteCounts.push({ [question.id]: voteCount })
  }
  const questions = data.map((item) => ({
    ...item,
    options: JSON.parse(item.options),
    vote: item.vote.map((v) => ({
      ...v,
      createdAt: JSON.stringify(v.createdAt),
    })),
  }))

  return { questions, voteResults, voteCounts }
}
