import { prisma } from "@/lib/prisma"
import { Goal } from "@/types/classes/goal"
import { RequestData } from "../updateGoal/route"
import { NextResponse, type NextRequest } from "next/server"

export const POST = async (request: NextRequest) => {
    try {
        
        const data = await request.json() as RequestData
        const { goal, performerId, year } = data
        
        const operations = await prisma.$transaction(async (prisma) => {
            const newGoal = await prisma.goals.create({
                data: {
                    name: goal.name,
                    date: goal.date,
                    comment: goal.comment,
                    goalNotCompetition: goal.goalNotCompetition,
                    isCompetition: false,
                    priority: goal.priority
                }
            })

            await prisma.performerGoals.create({
                data: {
                    performerId: performerId,
                    goalId: newGoal.id,
                    year: year
                }
            })

            return newGoal
        })

        console.log(`Created new goal in the database: ${operations}`)
        return NextResponse.json({ status: 200, message: `Successfully created new goal: ${operations}`})

    } catch (error) {
        if (error instanceof Error) {
            console.error("Error in the process of creating a new goal:", error);
            return NextResponse.json({ status: 500, message: "Failed to create a new goal.", error: error.message })
        }
    }
}