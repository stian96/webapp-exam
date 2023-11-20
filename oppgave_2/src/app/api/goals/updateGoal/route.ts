import { prisma } from "@/lib/prisma"
import { Goal } from "@/types/classes/goal";
import { NextResponse, type NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
    try {        
        const data = await request.json()
        const goal: Goal = data as Goal;

        const performerGoal = await prisma.performerGoals.findFirst({ 
            where: { goalId: goal.id }
        })

        if (!performerGoal) {
            return NextResponse.json({ status: 404, message: "Goal not linked to any performer..."})
        }

        const existingGoalCount = await prisma.performerGoals.count({
            where: {
                performerId: performerGoal.performerId,
                year: performerGoal.year
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

        console.log("Creating new goal in the database:", newGoal)
        return NextResponse.json({ status: 200, message: "Sucessfully created new goal: ", data: (newGoal).name });
        } 
        catch (error) {
            console.log(error);
            return NextResponse.json({ status: 500, message: "Failed to create new goal.." });
        }
    }