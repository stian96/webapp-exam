import { prisma } from "@/lib/prisma"
import { Goal } from "@/types/classes/goal"
import { NextResponse, type NextRequest } from "next/server"

export type RequestData = {
    goal: Goal
    performerId: string
    year: number
}

/**
 * @swagger
 * /api/goals/updateGoal:
 *   put:
 *     summary: Update an existing goal
 *     description: Updates an existing goal in the database based on the provided data.
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
 *                   - id
 *                   - name
 *                   - date
 *                   - priority
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                   name:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   comment:
 *                     type: string
 *                   goalCompetition:
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
 *     responses:
 *       200:
 *         description: Successfully updated the goal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Goal'
 *       400:
 *         description: Goal not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *       500:
 *         description: Failed to update the goal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *
 * components:
 *   schemas:
 *     Goal:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         date:
 *           type: string
 *           format: date-time
 *         comment:
 *           type: string
 *         goalCompetition:
 *           type: string
 *         goalNotCompetition:
 *           type: string
 *         isCompetition:
 *           type: boolean
 *         priority:
 *           type: integer
 */
export const PUT = async (request: NextRequest) => {
    try {
        
        const data = await request.json() as RequestData
        console.log("DATA: ", data.goal)
        const { goal, performerId } = data

        const existingGoal = await prisma.goals.findUnique({
            where: { id: goal.id }
        })


        if (existingGoal && goal.date) {
            const newDate = new Date(goal.date)
            const newYear = newDate.getFullYear();

            const existingPerformerGoal = await prisma.performerGoals.findFirst({
                where: {
                    performerId: performerId,
                    goalId: goal.id
                }
            });

            if (existingPerformerGoal && existingPerformerGoal.year !== newYear) {
                await prisma.performerGoals.update({
                    where: {
                        performerId_goalId_year: {
                            performerId: performerId,
                            goalId: goal.id,
                            year: existingPerformerGoal.year
                        }
                    },
                    data: {
                        year: newYear
                       }
                }) 
            }
            
            const competition = goal.isCompetition.toString()
            const updatedGoal = await prisma.goals.update({
                where: { id: goal.id },
                data: {
                    name: goal.name,
                    date: newDate.toISOString(),
                    comment: goal.comment,
                    goalCompetition: goal.goalCompetition,
                    goalNotCompetition: goal.goalNotCompetition,
                    isCompetition: competition === "yes" ? true : false,
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
