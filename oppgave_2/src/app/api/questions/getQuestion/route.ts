import { prisma } from "@/lib/prisma"
import { NextResponse, type NextRequest } from "next/server"

/**
 * @swagger
 * /api/users/getQuestion:
 *   get:
 *     summary: Retrieves a question.
 *     description: Retrieves a question object based on a question text and question type in the API route if it exists in the database.
 *     parameters:
 *       - in: query
 *         name: questionText
 *         schema:
 *           type: string
 *         required: true
 *         description: The question text.
 *       - in: query
 *         name: questionType
 *         schema:
 *           type: string
 *           enum: ["text", "radio:range", "radio:mood"]
 *         required: true
 *         description: The type of the question.
 *     responses:
 *       200:
 *         description: Successfully retrieved user.
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: {"id":"00e372d4-bb66-4d17-b540-94cbca521ca8","question":"Am I sane?","type":"text"}
 *       400:
 *         description: No valid 'questionText' and/or 'questionType' parameter could be found.
 *       404:
 *         description: Question not found.
 *       500:
 *         description: Internal server error.
 */
export const GET = async (req: NextRequest) => {

    try {
        const searchParams = req.nextUrl.searchParams
        const questionText = searchParams.get('questionText')
        const questionType = searchParams.get('questionType')

        
        if (!questionText || questionText === '') { 
            console.log("No valid 'questionText' parameter could be found.")
            return NextResponse.json({ status: 400, message: "No valid 'questionText' parameter could be found" })
        }
        if (!questionType || questionType === '') { 
            console.log("No valid 'questionType' parameter could be found.")
            return NextResponse.json({ status: 400, message: "No valid 'questionType' parameter could be found" })
        }

        console.log("Question parameters successfully retrieved.")

        const result = await prisma.questions.findFirst({
            where: {
              question: questionText,
              type: questionType,
            },
          });
  
          if (!result) {
            console.log("Question not found")
            return NextResponse.json({ status: 404, message: "Question not found." })
          }

          console.log(`Question with id ${result.id} found.`)
        return NextResponse.json({ status: 200, message: result })
    } catch (error) {
        console.log(error)
    return NextResponse.json({ status: 500, message: `Internal server error..` })
    }
  }