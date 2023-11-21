import { prisma } from "@/lib/prisma"
import { Goal } from "@/types/classes/goal"
import { NextResponse, type NextRequest } from "next/server"

type RequestData = {
    goal: Goal
    performerId: string
    year: number
}

export const POST = async (request: NextRequest) => {
    try {
        const data = await request.json() as RequestData
        const { goal } = data

        const existingGoal = await prisma.goals.findUnique({
            where: { id: goal.id }
        })

        console.log("Goal comment: ", goal.comments)

        if (existingGoal && goal.date) {
            const updatedGoal = await prisma.goals.update({
                where: { id: goal.id },
                data: {
                    name: goal.name,
                    date: goal.date,
                    goal: goal.goal,
                    comments: goal.comments,
                    isCompetition: goal.isCompetition,
                    priority: goal.priority
                }
            })

            console.log("Updated goal in the database: ", updatedGoal)
            return NextResponse.json({ status: 200, message: "Successfully updated goal", data: updatedGoal})
        }
        else {
            return NextResponse.json({ status: 400, message: "Goal not found..." })

        }
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error in the process of updating goal:", error);
            return NextResponse.json({ status: 500, message: "Failed to update new goal.", error: error.message })
        }
    }
}