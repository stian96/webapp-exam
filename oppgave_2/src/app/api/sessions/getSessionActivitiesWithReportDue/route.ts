import { SessionActivity } from './../../../../types/sessionActivity';
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/sessions/getSessionActivitiesWithReportDue:
 *   get:
 *     summary: Retrieves all session activities that require a report filling.
 *     description: Retrieves all session activity objects where the date has passed and no report is present.
 *     responses:
 *       200:
 *         description: Successfully retrieved session activities.
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: [{"id":"00e372d4-bb66-4d17-b540-94cbca521ca8","date":"2023-11-01T00:00:00.000Z","sessionId":"43965871-bc3a-42c6-873e-5e0b997966b9","goalId":"f0db3647-62b6-4a3f-8309-100a3eaf106e","performerId":"64637519-dd2c-4a88-9638-7338f89e4234"}, { sessionActivityTwo... }]

 *       404:
 *         description: Session activities not found.
 *       500:
 *         description: Internal server error.
 */
export const GET = async () => {

  try {
    const currentDate = new Date();

    const sessionActivities = await prisma.sessionActivity.findMany({
      where: {
        date: {
          lte: currentDate,
        },
        report: null,
      },
    });

    if (sessionActivities.length == 0) {

      console.log(`No session activities exist.`)
      return NextResponse.json({ status: 404, message: `No session activities exist.` })
    }

    console.log(`Session templates exist.`)
    return NextResponse.json({ status: 200, message: JSON.stringify(sessionActivities) })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ status: 500, message: `Internal server error..` })
  }
}