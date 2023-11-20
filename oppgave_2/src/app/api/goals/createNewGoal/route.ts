import { prisma } from "@/lib/prisma"
import { Goal } from "@/types/classes/goal";
import { NextResponse, type NextRequest } from "next/server";

type RequestData = {
    goal: Goal
    performerId: string
    year: number
}

export const POST = async (request: NextRequest) => {
    try {        
        const data = await request.json() as RequestData
        const { goal, performerId, year} = data

        const existingGoalCount = await prisma.performerGoals.count({
            where: {
                performerId: performerId,
                year: year
            }
        })

        if (existingGoalCount >= 3) {
            return NextResponse.json({ status: 400, message: "Maximum number of goals reached." })

        }

        // Create new goal
        const newGoal = await prisma.goals.create({
            data: {
                name: goal.name,
                date: goal.date,
                comments: goal.comments,
                isCompetition: false,
            }
        })

        // Link the new goal to the performer and year.
        await prisma.performerGoals.create({
            data: {
                performerId: performerId,
                goalId: newGoal.id,
                year: year
            }
        })

        console.log("Creating new goal in the database:", newGoal)
        return NextResponse.json({ status: 200, message: "Sucessfully created new goal: ", data: (newGoal).name });
        } 
        catch (error) {
            console.log(error);
            return NextResponse.json({ status: 500, message: "Failed to create new goal.." });
        }
    }