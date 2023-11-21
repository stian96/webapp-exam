import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/reports/getReportByActivityId/{activityId}:
 *   get:
 *     summary: Retrieves a report.
 *     description: Retrieves a report object based on an activity id in the API route if it exists in the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved report.
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: {"id":"00e372d4-bb66-4d17-b540-94cbca521ca8","sessionActivityId":"22e372d4-bb66-4d17-b540-94cbca521ca8"}

 *       404:
 *         description: Report not found.
 *       500:
 *         description: Internal server error.
 */
export const GET = async (request: NextRequest, { params }: { params: { activityId: string } }) => {

  const activityId = params.activityId
  console.log(`Checking to see if report for Id '${activityId}' exists`)

  try {
      const report = await prisma.reports.findUnique({
          where: {
            sessionActivityId: activityId,
          },
        });

        if (!report) {

          console.log(`Report for Id '${activityId}' does not exist.`)
          return NextResponse.json({ status: 404, message: `Id '${activityId}' does not exist.` })
        }

        console.log(`Report for Id '${activityId}' exists.`)
        return NextResponse.json({ status: 200, message: JSON.stringify(report) })
    } catch (error) {
      console.log(error)
      return NextResponse.json({ status: 500, message: `Internal server error..` })
    }
}