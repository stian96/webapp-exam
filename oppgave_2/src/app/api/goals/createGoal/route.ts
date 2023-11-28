import { prisma } from "@/lib/prisma"
import { RequestData } from "../updateGoal/route"
import { NextResponse, type NextRequest } from "next/server"
import { PriorityEnum } from "@/enums/PriorityEnum"

/**
 * @swagger
 * /api/goals/createGoal:
 *   post:
 *     summary: Create a new goal
 *     description: Creates a new goal in the database based on the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               goal:
 *                 type: object
 *                 required:
 *                   - name
 *                   - date
 *                   - priority
 *                 properties:
 *                   name:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   comment:
 *                     type: string
 *                   goalNotCompetition:
 *                     type: string
 *                   isCompetition:
 *                     type: boolean
 *                   priority:
 *                     type: integer
 *               performerId:
 *                 type: string
 *                 format: uuid
 *               year:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully created a new goal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *       500:
 *         description: Failed to create a new goal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 */
export const POST = async (request: NextRequest) => {
    try {
        
        const data = await request.json() as RequestData
        console.log("Data object in POST API: ", data)
        
        const operations = await prisma.$transaction(async (prisma) => {
            const { goal, performerId, year } = data

            const newGoal = await prisma.goals.create({
                data: {
                    name: goal.name,
                    date: goal.date,
                    comment: goal.comment,
                    goalNotCompetition: goal.goalNotCompetition,
                    goalCompetition: goal.goalCompetition,
                    isCompetition: goal.isCompetition,
                    type: goal.type,
                    location: goal.location,
                    priority: goal.priority ? goal.priority : null
                }
            })

            await prisma.performerGoals.create({
                data: {
                    performerId: performerId,
                    goalId: newGoal.id,
                    year: Number(year)
                }
            })

            return newGoal
        })

        console.log(`Created new goal in the database: ${operations}`)
        return NextResponse.json({ status: 201, message: `Successfully created new goal: ${operations}`})

    } catch (error) {
        if (error instanceof Error) {
            console.error("Error in the process of creating a new goal:", error);
            return NextResponse.json({ status: 500, message: "Failed to create a new goal.", error: error.message })
        }
    }
}