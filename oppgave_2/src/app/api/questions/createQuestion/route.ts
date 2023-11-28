import { prisma } from "@/lib/prisma"
import { type Question } from "@/types/question";
import { NextResponse, type NextRequest } from "next/server";

/**
 * @swagger
 * /api/question/createQuestion:
 *   post:
 *     summary: Create a new question.
 *     description: Takes a request where the body is a serialised Question object and writes it to the database.
 *     requestBody:
 *        description: Serialized Question object.
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                question:
 *                  type: string
 *                type:
 *                  type: string
 *                  enum: ["text", "radio:range", "radio:mood"]
 *     responses:
 *       201:
 *         description: Successfully written to database.
 *       500:
 *         description: Internal server error when writing to database.
 */
export const POST = async (request: NextRequest) => {

  try {
    console.log("Deserialising question.")
    
    const data = await request.json()
    const question: Question = data as Question;

    console.log("Deserialised question.")
    
    const newQuestion = await prisma.questions.create({
      data: {
          question: question.question,
          type: question.type,
      }
    });
  
    console.log("Written question to database.")
    return NextResponse.json({ status: 201, message: "Success writing question to database." })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ status: 500, message: "Failed writing question to database." })
  }
}