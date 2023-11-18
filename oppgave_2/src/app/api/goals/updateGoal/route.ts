import { prisma } from "@/lib/prisma"
import { Goal } from "@/types/classes/goal";
import { NextResponse, type NextRequest } from "next/server";

export const PUT = async (request: NextRequest) => {
    try {
        console.log("Deserialising goal.")
        
        const data = await request.json()
        const goal: Goal = data as Goal;
    
        console.log("Deserialised goal.")

        const existingGoal = prisma.goals.findUnique({
            where: { id: goal.id }
        })

        if (!existingGoal) {
            console.log("Goal was not found in the database.")
            return NextResponse.json({ status: 404, message: "Goal not found" })
        }

        // Update existing goal.
        const updatedGoal = prisma.goals.update({
            where: { id: goal.id },
                data: {
                id: goal.id,
                name: goal.name,
                date: goal.date,
                comments: goal.comments
            }
        })

        console.log("Updated user in database.", updatedGoal)
        return NextResponse.json({ status: 200, message: "Success updating user in database.", data: (await updatedGoal).name });
        } 
        catch (error) {
            console.log(error);
            return NextResponse.json({ status: 500, message: "Failed updating user in database." });
        }
    }