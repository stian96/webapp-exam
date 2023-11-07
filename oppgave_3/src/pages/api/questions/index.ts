import { type Question, type Result } from '@/types'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/db'

const validate = (data: unknown) => {
  data = data instanceof Array ? data : [data]
  if (
    data &&
    data instanceof Array &&
    data.length > 0 &&
    data.filter(
      (item) =>
        !['pollId', 'options', 'question'].every((key) =>
          Object.keys(item).includes(key)
        )
    ).length === 0
  )
    return data as Question[]
  return null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result<Question[] | Question>>
) {
  switch (req.method?.toLowerCase()) {
    case 'get':
      const questions = await prisma.question.findMany({})
      const parsedQuestions = questions.map((question) => ({
        ...question,
        options: JSON.parse(question.options),
      }))
      {
        res.status(200).json({ status: true, data: parsedQuestions })
        return
      }
    case 'post':
      const data = validate(req.body)

      if (!data) {
        res
          .status(400)
          .json({ status: false, error: { message: 'Invalid data' } })
        return
      }

      const hasValidQuestion = data.every((item) => item.question.length > 0)

      if (!hasValidQuestion) {
        res.status(400).json({
          status: false,
          error: { message: 'Question must be at least 5 chars long' },
        })
        return
      }

      const hasOptions = data.every(
        (item) =>
          item.options.length > 0 &&
          item.options.every((option) => option.option.length)
      )

      if (!hasOptions) {
        res.status(400).json({
          status: false,
          error: { message: 'Must have one option with content' },
        })
        return
      }

      const parsedCreateQuestions = data.map(
        ({ id, pollId, options, question }) => ({
          id,
          question,
          options: JSON.stringify(options),
          poll: {
            connect: {
              id: pollId,
            },
          },
        })
      )

      try {
        for (const { id, poll, options, question } of parsedCreateQuestions) {
          if (!id) {
            await prisma.question.create({
              data: {
                poll,
                options,
                question,
              },
            })
          } else {
            await prisma.question.update({
              where: {
                id: id,
              },
              data: {
                options,
                question,
              },
            })
          }
        }
        res.status(201).json({ status: true, data })
        return
      } catch (error) {
        console.log('ERROR', error)
        res
          .status(500)
          .json({ status: false, error: { message: 'Create Question Failed' } })
        return
      }
    default: {
      res
        .status(405)
        .json({ status: false, error: { message: 'METHOD NOT ALLOWED' } })
      return
    }
  }
}
