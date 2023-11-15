import { prisma } from "@/lib/prisma"
import { NextResponse, type NextRequest } from "next/server"

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