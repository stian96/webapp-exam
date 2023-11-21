import { prisma } from "@/lib/prisma"
import { SessionTemplate } from "@/types/classes/sessionTemplate";
import { type Performer } from "@/types/performer";
import { NextResponse, type NextRequest } from "next/server";

/**
 * @swagger
 * /api/sessions/createSessionTemplate:
 *   post:
 *     summary: Create a new sessionTemplate.
 *     description: Takes a request where the body is a serialised SessionTemplate object and writes it to the database.
 *     requestBody:
 *        description: Serialized SessionTemplate object.
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                name:
 *                  type: string
 *                type:
 *                  type: string
 *                tags:
 *                  type: array
 *                  items:
 *                    type: string
 *                questions:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: string
 *                      question:
 *                        type: string
 *                      type:
 *                        type: string
 *                intervals:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: string
 *                      duration:
 *                        type: number
 *                      intensity:
 *                        type: number
 *                uniqueTo:
 *                  type: string
 *                  nullable: true
 *                slug:
 *                  type: string
 *                intensity:
 *                  type: number
 *                watt:
 *                  type: number
 *                speed:
 *                  type: number
 *                pulse:
 *                  type: number
 *     responses:
 *       200:
 *         description: Successfully written to database.
 *       500:
 *         description: Internal server error when writing to database.
 */
export const POST = async (request: NextRequest) => {

  try {
    await prisma.$transaction(async (prisma) => {
      console.log("Deserialising session template.")
      
      const data = await request.json()
      const sessionTemplate: SessionTemplate = data as SessionTemplate;

      console.log("Deserialised session template.")
      
      const newSession = await prisma.sessions.create({
        data: {
            name: sessionTemplate.name,
            type: sessionTemplate.type,
            isTemplate: true,
            performerId: sessionTemplate.uniqueTo,
            slug: sessionTemplate.slug,
            intensityParam: sessionTemplate.intensity,
            wattParam: sessionTemplate.watt,
            speedParam: sessionTemplate.speed,
            pulseParam: sessionTemplate.pulse,
        }
    });

    for (const tag of sessionTemplate.tags) {
      if (tag != "") {
        const newTag = await prisma.sessionTags.create({
          data: {
            sessionId: newSession.id,
            tag: tag
          }
        });
      }
    }

    if (sessionTemplate.questions.length > 0) {
      for (const question of sessionTemplate.questions) {
        if (typeof question.id === 'string' && question.question == "" && question.id != "") {
          const newSessionQuestion = await prisma.sessionQuestions.create({
            data: {
                sessionId: newSession.id,
                questionId: question.id
            }
          });


        } else if (question.id == "" && question.question != "") {
          
          const newQuestion = await prisma.questions.create({
            data: {
                question: question.question,
                type: question.type
            }
          });

          const newSessionQuestion = await prisma.sessionQuestions.create({
            data: {
                sessionId: newSession.id,
                questionId: newQuestion.id
            }
          });
        }
      }
    }

    if (sessionTemplate.intervals.length > 0) {
      for (const interval of sessionTemplate.intervals) {
        if (!isNaN(interval.duration) && typeof interval.duration === 'number') {

          const newIntervals = await prisma.intervals.create({
            data: {
                duration: interval.duration,
                intensity: interval.intensity
            }
          });

          const newIntervalSessions = await prisma.sessionIntervals.create({
            data: {
                sessionId: newSession.id,
                intervalId: newIntervals.id
            }
          });
        }
      }
    }

    if (sessionTemplate.goalId != "" && sessionTemplate.date != null && sessionTemplate.uniqueTo != null) {
      const newSessionActivity = await prisma.sessionActivity.create({
        data: {
          date: sessionTemplate.date,
          sessionId: newSession.id,
          goalId: sessionTemplate.goalId,
          performerId: sessionTemplate.uniqueTo
        }
      });
    }
  });
  
    console.log("Written session template to database.")
    return NextResponse.json({ status: 200, message: "Success writing session template to database." })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ status: 500, message: "Failed writing session template to database." })
  }
}