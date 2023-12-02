import { prisma } from "@/lib/prisma"
import { NextResponse, type NextRequest } from "next/server"


/**
 * @swagger
* /api/sessions/getSessionIntervals:
*   get:
*     summary: Retrieve session intervals
*     description: Retrieves intervals associated with a given session ID from the database.
*     parameters:
*       - in: query
*         name: sessionId
*         required: true
*         schema:
*           type: string
*           format: uuid
*         description: The unique identifier for the session.
*     responses:
*       200:
*         description: Successfully retrieved session intervals
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 status:
*                   type: integer
*                 message:
*                   type: string
*       404:
*         description: Session ID parameter is missing in the request
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 status:
*                   type: integer
*                 message:
*                   type: string
*       500:
*         description: Internal server error
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 status:
*                   type: integer
*                 message:
*                   type: string
*/
export const GET = async (request : NextRequest) => {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId');

  if (!sessionId) {
    return NextResponse.json({ status: 404, message: 'Missing sessionId parameter in the request.' });
  }

  try {
    const sessionIntervals = await prisma.sessionIntervals.findMany({
      where: { sessionId: sessionId },
      include: {
        interval: true,
      },
    });

    return NextResponse.json({ status: 200, message: JSON.stringify(sessionIntervals) });
  } catch (error) {
    console.error(error); 
    return NextResponse.json({ status: 500, message: 'Internal server error.' });
  }
}
