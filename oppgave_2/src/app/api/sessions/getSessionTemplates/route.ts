import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/sessions/getSessionTemplates}:
 *   get:
 *     summary: Retrieves all session templates.
 *     description: Retrieves all session template objects based on a slug value in the API route if it exists in the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved session templates.
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: {"id":"00e372d4-bb66-4d17-b540-94cbca521ca8","name":"acer-ater-quos","type":"cycling","isTemplate":true,"uniqueToPerformer":"2023592-2342023-2340234-2342","slug":"slug-name","intensityParam":19,"wattParam":29,"speedParam":16,"pulseParam":33}

 *       404:
 *         description: Session not found.
 *       500:
 *         description: Internal server error.
 */
export const GET = async () => {

  try {
      const sessionTemplates = await prisma.sessions.findMany({
          where: {
            isTemplate: true,
          },
        });

        console.log(sessionTemplates)

        if (sessionTemplates.length == 0) {

          console.log(`No session templates exist.`)
          return NextResponse.json({ status: 404, message: `No session templates exist.` })
        }

        console.log(`Session templates exist.`)
        return NextResponse.json({ status: 200, message: JSON.stringify(sessionTemplates) })
    } catch (error) {
      console.log(error)
      return NextResponse.json({ status: 500, message: `Internal server error..` })
    }
}