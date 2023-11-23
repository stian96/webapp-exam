import { NextRequest,  NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export type AnswerUpdateRequest = {
    taskId: string;
    attempts: number;
  }

export const PUT = async (request: NextRequest) => {
    try {
        const data = await request.json()
        const { taskId, attempts } = data as AnswerUpdateRequest
        
        // Check if answer already exists.
        let answer = await prisma.answer.findFirst({ where: { taskId: taskId }})
        if (!answer) {
            // Create new if no answer is found.
            answer = await prisma.answer.create({
                data: { taskId: taskId, attempts: attempts}
            })
        } else {
            // Update attempts if answer is found.
            answer = await prisma.answer.update({
                where: { id: answer.id },
                data: { attempts: attempts }
            })
        }
        console.log("Current attempt updated in the database.", answer)
        return new NextResponse("Successfully updated answer in the DB.", { status: 200})

    } catch (error) {
        return new NextResponse("Failed to update answer in the DB.", { status: 500})
    }
}