import { SessionActivity } from '@/types/sessionActivity';
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/sessions/deleteSessionById/{activityId}:
 *   delete:
 *     summary: Deletes a session activity.
 *     description: Deletes a session activity based on its id value in the API route if it exists in the database, along with the connected session and report.
 *     responses:
 *       200:
 *         description: Successfully deleted session activity.
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: Success

 *       404:
 *         description: Session activity not found.
 */
export const DELETE = async (request: NextRequest, { params }: { params: { activityId: string } }) => {

  const activityId = params.activityId
  console.log(`Checking to see if session activity for '${activityId}' exist`)

  try {

    const sessionActivityToDelete = await prisma.sessionActivity.findUnique({
      where: {
        id: activityId,
      },
      include: {
        session: true,
        report: true,
      }
    });

    if (sessionActivityToDelete != null) {
      if (sessionActivityToDelete.report != null) {
        const report = await prisma.sessions.delete({
          where: {
            id: sessionActivityToDelete.report.id,
          }
        });
      }

      const sessionActivity = await prisma.sessionActivity.delete({
        where: {
          id: activityId,
        }
      });

      const session = await prisma.sessions.delete({
        where: {
          id: sessionActivityToDelete.sessionId,
        }
      });
    }

    console.log(`Session activity with id '${activityId}' was deleted.`)
    return NextResponse.json({ status: 200, message: `Session activity with id '${activityId}' was deleted.` })
  } catch (error) {
    console.log(error)
    console.log(`Session activities for '${activityId}' do not exist.`)
    return NextResponse.json({ status: 404, message: `Session activity with id '${activityId}' does not exist.` })
  }
}