import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/questions/getQuestions:
 *   get:
 *     summary: Retrieves all questions.
 *     description: Retrieves all question objects if they exist in the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved questions.
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: [{"id":"be721f94-0021-4cbb-94a7-2314088a4549","question":"Hvordan var kvaliteten og varigheten på søvnen før dagens økt?","type":"text"}, {question2}]

 *       404:
 *         description: Questions not found.
 *       500:
 *         description: Internal server error.
 */
export const GET = async () => {

  console.log(`Checking to see if questions exists`)

  try {
      const questions = await prisma.questions.findMany();

      if (questions.length === 0) {

        console.log(`No questions exist.`)
        return NextResponse.json({ status: 404, message: `No questions exist.` })
      }

      console.log(`${questions.length} questions exist.`)
      return NextResponse.json({ status: 200, message: JSON.stringify(questions) })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ status: 500, message: `Internal server error..` })
  }
}