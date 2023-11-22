import { NextRequest,  NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client';
import { type } from "os";
const prisma = new PrismaClient();

type AnswerUpdateRequest = {
    taskId: string;
    attempts: number;
  }

export const PUT = async (request: NextRequest) => {
    try {
        const data = await request.json()
        const { taskId, attempts } = data as AnswerUpdateRequest

        const answer = await prisma.answer.findFirst({ where: { taskId: taskId }})
        if (!answer) {
            return new NextResponse("Answer not found", { status: 404 })
        }

        const updatedAnswer = await prisma.answer.update({
            where: { id: answer.id },
            data: { attempts: attempts }
        })

        console.log("Answer updated in the database.", updatedAnswer)
        return new NextResponse("Successfully updated answer in the DB.", { status: 200})
    } catch (error) {
        if (error instanceof Error) {
            return new NextResponse("Failed to update answer in the DB.", { status: 500})
        }
        return new NextResponse("Failed to update answer in the DB.", { status: 500})
    }
}