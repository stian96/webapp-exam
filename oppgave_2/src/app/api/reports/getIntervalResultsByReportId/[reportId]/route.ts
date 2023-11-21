import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/reports/getIntervalResultsByReportId/{reportId}:
 *   get:
 *     summary: Retrieves all interval results for a single report.
 *     description: Retrieves a report object based on an activity id in the API route if it exists in the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved report.
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: [ { id: '13456186-b916-4348-a2f0-dc5b45b09ad1', intervalId: 'e6d5ee58-693f-4a9b-85de-cce15a8eea03', duration: 8, intensityMin: 8, intensityMax: 8, intensityAvg: 8, pulseMin: 8, pulseMax: 8, pulseAvg: 8, speedMin: 8, speedMax: 8, speedAvg: 8, wattMin: 8, wattMax: 8, wattAvg: 8 }, { intervalTwo... }]

 *       404:
 *         description: Report not found.
 *       500:
 *         description: Internal server error.
 */
export const GET = async (request: NextRequest, { params }: { params: { reportId: string } }) => {

  const reportId = params.reportId
  console.log(`Checking to see if results for report Id '${reportId}' exist`)

  try {
      const intervalResults = await prisma.reportIntervalResults.findMany({
          where: {
            reportId: reportId,
          },
        });

        if (intervalResults.length === 0) {

          console.log(`Results for report Id '${reportId}' do not exist.`)
          return NextResponse.json({ status: 404, message: `Results for report Id '${reportId}' do not exist.` })
        }

        console.log(`Results for report Id '${reportId}' exist.`)

        const detailedIntervalResults = [];

        for (const result of intervalResults) {

          const detailedIntervalResult = await prisma.intervalResults.findUnique({
            where: {
              id: result.intervalResultId,
            },
          });

          detailedIntervalResults.push(detailedIntervalResult)
        }

        console.log(`Retrieved ${detailedIntervalResults.length} interval results for report Id '${reportId}'.`)
        return NextResponse.json({ status: 200, message: JSON.stringify(detailedIntervalResults) })
    } catch (error) {
      console.log(error)
      return NextResponse.json({ status: 500, message: `Internal server error..` })
    }
}