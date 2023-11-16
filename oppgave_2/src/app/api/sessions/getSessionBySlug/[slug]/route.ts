import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/sessions/getSessionBySlug/{slug}:
 *   get:
 *     summary: Retrieves a session.
 *     description: Retrieves a session object based on a slug value in the API route if it exists in the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved session.
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: {"id":"00e372d4-bb66-4d17-b540-94cbca521ca8","userId":"acer-ater-quos","gender":"male","sport":"triathlon","heartRate":176,"watt":368,"speed":19}

 *       404:
 *         description: Session not found.
 *       500:
 *         description: Internal server error.
 */
export const GET = async (request: NextRequest, { params }: { params: { slug: string } }) => {

  const slug = params.slug
  console.log(`Checking to see if Slug '${slug}' exists`)

  try {
      const session = await prisma.sessions.findUnique({
          where: {
            slug: slug,
          },
        });

        if (!session) {

          console.log(`Slug '${slug}' does not exist.`)
          return NextResponse.json({ status: 404, message: `Slug '${slug}' does not exist.` })
        }

        console.log(`Slug '${slug}' exists.`)
        return NextResponse.json({ status: 200, message: JSON.stringify(session) })
    } catch (error) {
      console.log(error)
      return NextResponse.json({ status: 500, message: `Internal server error..` })
    }
}