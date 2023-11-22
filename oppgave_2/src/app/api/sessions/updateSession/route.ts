import { prisma } from "@/lib/prisma"
import { SessionEditDto } from "@/types/DTO/sessionEditDto";
import { SessionTemplate } from "@/types/classes/sessionTemplate";
import { type Performer } from "@/types/performer";
import { SessionActivityDto } from "@/types/sessionActivity";
import { NextResponse, type NextRequest } from "next/server";

/**
 * @swagger
 * /api/sessions/updateSession:
 *   put:
 *     summary: Updates an existing session.
 *     description: Takes a request where the body is a serialised SessionEditDto object and writes it to the database.
 *     requestBody:
 *        description: Serialized SessionEditDto object.
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                sessionId:
 *                  type: Date
 *                sessionActivityId:
 *                  type: Date
 *                date:
 *                  type: Date
 *                name:
 *                  type: string
 *                intensity:
 *                  type: number
 *                watt:
 *                  type: number
 *                speed:
 *                  type: number
 *                pulse:
 *                  type: number
 *                type:
 *                  type: string
 *                goalId:
 *                  type: string
 *     responses:
 *       200:
 *         description: Successfully written to database.
 *       500:
 *         description: Internal server error when writing to database.
 */
export const PUT = async (request: NextRequest) => {

  try {
    let isTemplate = false;

    await prisma.$transaction(async (prisma) => {
      console.log("Deserialising session activity.")
      
      const data = await request.json()
      const sessionActivity: SessionEditDto = data as SessionEditDto;

      console.log("Deserialised session activity.")
      
      const session = await prisma.sessions.findUnique({
        where: {
          id: sessionActivity.sessionId
        }
      });

      if (session != null && session.isTemplate) {
        isTemplate = true
      } else {
      const updatedSession = await prisma.sessions.update({
        where: {
          id: sessionActivity.sessionId
        },
        data: {
          name: sessionActivity.name,
          intensityParam: sessionActivity.intensity,
          wattParam: sessionActivity.watt,
          speedParam: sessionActivity.speed,
          pulseParam: sessionActivity.pulse,
          type: sessionActivity.type
        },
      });

      const updatedSessionActivity = await prisma.sessionActivity.update({
        where: {
          id: sessionActivity.sessionActivityId,
        },
        data: {
          date: sessionActivity.date,
          goalId: sessionActivity.goalId

        },
      });
    }
  });

    if (isTemplate) {
      console.log("Cannot update an activity based on a template.")
      return NextResponse.json({ status: 400, message: "Bad request. Cannot update an activity based on a template." })
    }

    console.log("Updated session in database.")
    return NextResponse.json({ status: 200, message: "Success updating session in database." })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ status: 500, message: "Failed updating session in database." })
  }
}