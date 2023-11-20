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
        const { goal, performerId, year } = data
        console.log(`Got Data: goal name: ${goal.name}, performerId: ${performerId}, year: ${year}`)

        if (!goal.id) {
            return NextResponse.json({ status: 400, message: "Missing goal ID." })
        }

        const existingGoalCount = await prisma.performerGoals.count({
            where: {
                performerId: performerId,
                year: year
            }
        })

        if (existingGoalCount >= 3) {
            return NextResponse.json({ status: 400, message: `Maximum number of goals reached for this performer for the year: ${year}`})
        }

        const existingPerformerGoal = await prisma.performerGoals.findUnique({
            where: {
                performerId_goalId_year: {
                    performerId: performerId,
                    goalId: goal.id,
                    year: year
                }
            }
        })
        
        if (existingPerformerGoal) {
            await prisma.performerGoals.update({
                where: {
                    performerId_goalId_year: {
                        performerId: performerId,
                        goalId: goal.id,
                        year: year
                    }
                },
                data: {
                    performerId: performerId,
                        goalId: goal.id,
                        year: year
                }
            })
        }
        else {
            // Create new goal
            const newGoal = await prisma.goals.create({
                data: {
                    name: goal.name,
                    date: goal.date,
                    comments: goal.comments,
                    isCompetition: false,
                }
            })

            // Link the new goal to the performer and year
            const linkedGoal = await prisma.performerGoals.create({
                data: {
                    performerId: performerId,
                    goalId: newGoal.id,
                    year: year
                }
            })

            console.log("Created and linked goal in the database:", linkedGoal);
            return NextResponse.json({ status: 200, message: "Successfully created new goal: ", data: newGoal.name })
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error in creating goal:", error);
            return NextResponse.json({ status: 500, message: "Failed to create new goal.", error: error.message })
        }
    }
}