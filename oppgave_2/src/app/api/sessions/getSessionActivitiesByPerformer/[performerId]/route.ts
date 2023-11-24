import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/sessions/getSessionActivitiesByPerformer/{performerId}:
 *   get:
 *     summary: Retrieves a performer's sessions.
 *     description: Retrieves all session objects based on a performer's id value in the API route if it exists in the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved sessions.
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: [{"id":"26df3d01-fef6-4a23-b0f3-c765212946cb","date":"2023-11-19T05:59:41.789Z","sessionId":"c30e8e17-c5ff-4215-ad63-f6ea11b5d9ed","goalId":"bd1ee7a4-7af3-4573-979a-6d5e402ce69d","performerId":"b1e1f9c4-9da3-499e-848c-b427f5606e14","session":{"id":"c30e8e17-c5ff-4215-ad63-f6ea11b5d9ed","name":null,"type":null,"isTemplate":false,"performerId":null,"slug":null,"intensityParam":null,"wattParam":null,"speedParam":null,"pulseParam":null},"goal":{"id":"bd1ee7a4-7af3-4573-979a-6d5e402ce69d","name":null,"date":null,"comments":null,"isCompetition":false,"goalCompetition":null,"goalNotCompetition":null,"location":null,"type":null,"priority":null},"report":null}, { activityTwo...}]

 *       404:
 *         description: Sessions not found.
 *       500:
 *         description: Internal server error.
 */
export const GET = async (request: NextRequest, { params }: { params: { performerId: string } }) => {

  const performerId = params.performerId
  console.log(`Checking to see if session activities for '${performerId}' exist`)

  try {
      const sessionActivities = await prisma.sessionActivity.findMany({
          where: {
            performerId: performerId,
          },
          include: {
            session: {
              include: {
                sessionTags: true,
              },
            },
            goal: true,
            report: true,
          }
        });

        if (sessionActivities.length === 0) {

          console.log(`Session activities for '${performerId}' do not exist.`)
          return NextResponse.json({ status: 404, message: `Session activities for '${performerId}' do not exist.` })
        }

        console.log(`Session activities for '${performerId}' exist.`)
        return NextResponse.json({ status: 200, message: JSON.stringify(sessionActivities) })
    } catch (error) {
      console.log(error)
      return NextResponse.json({ status: 500, message: `Internal server error..` })
    }
}