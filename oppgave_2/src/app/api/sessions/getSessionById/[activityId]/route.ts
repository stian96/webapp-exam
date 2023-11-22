import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/sessions/getSessionById/{activityId}:
 *   get:
 *     summary: Retrieves a session activity.
 *     description: Retrieves a session activity based on its id value in the API route if it exists in the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved session activity.
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: {"id":"26df3d01-fef6-4a23-b0f3-c765212946cb","date":"2023-11-19T05:59:41.789Z","sessionId":"c30e8e17-c5ff-4215-ad63-f6ea11b5d9ed","goalId":"bd1ee7a4-7af3-4573-979a-6d5e402ce69d","performerId":"b1e1f9c4-9da3-499e-848c-b427f5606e14","session":{"id":"c30e8e17-c5ff-4215-ad63-f6ea11b5d9ed","name":null,"type":null,"isTemplate":false,"performerId":null,"slug":null,"intensityParam":null,"wattParam":null,"speedParam":null,"pulseParam":null},"goal":{"id":"bd1ee7a4-7af3-4573-979a-6d5e402ce69d","name":null,"date":null,"comments":null,"isCompetition":false,"goalCompetition":null,"goalNotCompetition":null,"location":null,"type":null,"priority":null},"report":null}

 *       404:
 *         description: Session activity not found.
 *       500:
 *         description: Internal server error.
 */
export const GET = async (request: NextRequest, { params }: { params: { activityId: string } }) => {

  const activityId = params.activityId
  console.log(`Checking to see if session activity for '${activityId}' exist`)

  try {
      const sessionActivities = await prisma.sessionActivity.findUnique({
          where: {
            id: activityId,
          },
          include: {
            session: true,
            goal: true,
            report: true,
          }
        });

        console.log(sessionActivities)
        if (sessionActivities == null) {

          console.log(`Session activities for '${activityId}' do not exist.`)
          return NextResponse.json({ status: 404, message: `Session activity for '${activityId}' does not exist.` })
        }

        console.log(`Session activity for '${activityId}' exists.`)
        return NextResponse.json({ status: 200, message: JSON.stringify(sessionActivities) })
    } catch (error) {
      console.log(error)
      return NextResponse.json({ status: 500, message: `Internal server error..` })
    }
}