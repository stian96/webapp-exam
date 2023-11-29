import { prisma } from "@/lib/prisma"
import { type Performer } from "@/types/performer";
import { NextResponse, type NextRequest } from "next/server";

/**
 * @swagger
 * /api/users/updateUser:
 *   put:
 *     summary: Updates an existing user.
 *     description: Updates a user's details in the database if the user exists and any of the provided fields are different from the existing ones.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: Unique identifier of the user
 *               userId:
 *                 type: string
 *                 description: Identifier for the user
 *               gender:
 *                 type: string
 *                 description: Gender of the user
 *               sport:
 *                 type: string
 *                 description: Sport type of the user
 *               heartRate:
 *                 type: integer
 *                 description: Heart rate of the user
 *               watt:
 *                 type: integer
 *                 description: Watt performance of the user
 *               speed:
 *                 type: integer
 *                 description: Speed of the user
 *     responses:
 *       200:
 *         description: Success updating user in database.
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: User updated successfully.
 *               data: 
 *                 id: 00e372d4-bb66-4d17-b540-94cbca521ca8
 *                 userId: acer-ater-quos
 *                 gender: male
 *                 sport: triathlon
 *                 heartRate: 176
 *                 watt: 368
 *                 speed: 19
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
export const PUT = async (request: NextRequest) => {
    try {       
        const data = await request.json()
        const performer: Performer = data as Performer;
        const requestPerformer = JSON.stringify(performer)

        const updatedPerformer = await prisma.$transaction(async (prisma) => {
            const existingPerformer = await prisma.performers.findUnique({
                where: { id: performer.id }
            })

            const responsePerformer = JSON.stringify(existingPerformer)

            if (!existingPerformer) {
                throw new Error("Performer not found")
            } 
            else if (requestPerformer === responsePerformer) {
                console.log("Performers are the same, no need to update.")
                return
            } 

            // Update existing user.
            const updated = await prisma.performers.update({
                where: { id: performer.id },
                    data: {
                    userId: performer.userId,
                    gender: performer.gender,
                    sport: performer.sport,
                    heartRate: Number(performer.heartRate),
                    watt: Number(performer.watt),
                    speed: Number(performer.speed)
                }
            })
            return updated
        })

        console.log("Updated user in database.", updatedPerformer)
        return NextResponse.json({ status: 200, message: "Success updating user in database.", data: updatedPerformer });
    } 
    catch (error) {
        console.log(error);
        return NextResponse.json({ status: 500, message: "Failed updating user in database.", error: error });
    }
}
