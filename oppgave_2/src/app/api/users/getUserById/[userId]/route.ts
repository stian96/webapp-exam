import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/users/getUserById/{id}:
 *   get:
 *     summary: Retrieves a user.
 *     description: Retrieves a user object based on an id in the API route if it exists in the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved user.
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: {"id":"00e372d4-bb66-4d17-b540-94cbca521ca8","userId":"acer-ater-quos","gender":"male","sport":"triathlon","heartRate":176,"watt":368,"speed":19}

 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
export const GET = async (request: NextRequest, { params }: { params: { userId: string } }) => {

  const userId = params.userId
  console.log(`Checking to see if Id '${userId}' exists`)

  try {
      const performer = await prisma.performers.findUnique({
          where: {
            id: userId,
          },
        });

        if (!performer) {

          console.log(`Id '${userId}' does not exist.`)
          return NextResponse.json({ status: 404, message: `Id '${userId}' does not exist.` })
        }

        console.log(`Id '${userId}' exists.`)
        return NextResponse.json({ status: 200, message: JSON.stringify(performer) })
    } catch (error) {
      console.log(error)
      return NextResponse.json({ status: 500, message: `Internal server error..` })
    }
}