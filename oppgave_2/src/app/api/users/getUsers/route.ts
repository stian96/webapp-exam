import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/users/getUsers:
 *   get:
 *     summary: Retrieves all users.
 *     description: Retrieves all user objects if they exist in the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved users.
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: [{"id":"00e372d4-bb66-4d17-b540-94cbca521ca8","userId":"acer-ater-quos","gender":"male","sport":"triathlon","heartRate":176,"watt":368,"speed":19}, {user2}]

 *       404:
 *         description: Users not found.
 *       500:
 *         description: Internal server error.
 */
export const GET = async () => {

  console.log(`Checking to see if users exists`)

  try {
      const performers = await prisma.performers.findMany();

      if (performers.length === 0) {

        console.log(`No users exist.`)
        return NextResponse.json({ status: 404, message: `No users exist.` })
      }

      console.log(`${performers.length} users exist.`)
      return NextResponse.json({ status: 200, message: JSON.stringify(performers) })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ status: 500, message: `Internal server error..` })
  }
}