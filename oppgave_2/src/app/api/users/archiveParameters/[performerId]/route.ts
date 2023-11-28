import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/users/archiveParameters/{performerId}:
 *   post:
 *     summary: Archives a user's parameters.
 *     description: Archives a user's heart rate, watt, and pulse based on a performer's id value in the API route if it exists in the database.
 *     responses:
 *       201:
 *         description: Successfully archived parameters.
 *         content:
 *           application/json:
 *             example:
 *               status: 201
 *               message: {"performerId":"26df3d01-fef6-4a23-b0f3-c765212946cb","date":"2023-11-19T05:59:41.789Z","heartRate":"5","watt":"6","speed":"7"}

 *       404:
 *         description: Performer not found.
 *       500:
 *         description: Internal server error.
 */
export const POST = async (request: NextRequest, { params }: { params: { performerId: string } }) => {

  const performerId = params.performerId
  console.log(`Checking to see if performer for '${performerId}' exist`)

  try {
      const performer = await prisma.performers.findUnique({
          where: {
            id: performerId,
          }
        });

        if (performer == null) {

          console.log(`Performer with the id '${performerId}' does not exist.`)
          return NextResponse.json({ status: 404, message: `Performer with the id '${performerId}' does not exist.` })
        } 

        const archivedPerformer = await prisma.performersParameterHistory.create({
          data: {
            performerId: performer.id,
            heartRate: performer.heartRate,
            watt: performer.watt,
            speed: performer.speed,
          },
        });

        console.log(`Performer with the id '${performerId}' archived.`)
        return NextResponse.json({ status: 201, message: JSON.stringify(archivedPerformer) })
    } catch (error) {
    console.log(error)
    return NextResponse.json({ status: 500, message: `Internal server error..` })
  }
}