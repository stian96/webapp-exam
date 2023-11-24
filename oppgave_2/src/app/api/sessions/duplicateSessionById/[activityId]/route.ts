import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/sessions/duplicateSessionById/{activityId}:
 *   post:
 *     summary: Duplicates a session activity.
 *     description: Duplicates a session activity based on its id value in the API route if it exists in the database, including duplicating the session, questions, intervals, and tags.
 *     responses:
 *       200:
 *         description: Successfully duplicated session activity.
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: {"id":"26df3d01-fef6-4a23-b0f3-c765212946cb","date":"2023-11-19T05:59:41.789Z","sessionId":"c30e8e17-c5ff-4215-ad63-f6ea11b5d9ed","goalId":"bd1ee7a4-7af3-4573-979a-6d5e402ce69d","performerId":"b1e1f9c4-9da3-499e-848c-b427f5606e14","session":{"id":"c30e8e17-c5ff-4215-ad63-f6ea11b5d9ed","name":null,"type":null,"isTemplate":false,"performerId":null,"slug":null,"intensityParam":null,"wattParam":null,"speedParam":null,"pulseParam":null},"goal":{"id":"bd1ee7a4-7af3-4573-979a-6d5e402ce69d","name":null,"date":null,"comments":null,"isCompetition":false,"goalCompetition":null,"goalNotCompetition":null,"location":null,"type":null,"priority":null},"report":null}

 *       404:
 *         description: Session activity not found.
 *       500:
 *         description: Internal server error.
 */
export const POST = async (request: NextRequest, { params }: { params: { activityId: string } }) => {

  const activityId = params.activityId
  console.log(`Checking to see if session activity for '${activityId}' exist`)

  try {

    let sessionActivityToReturn
    await prisma.$transaction(async (prisma) => {
      const sessionActivity = await prisma.sessionActivity.findUnique({
          where: {
            id: activityId,
          },
          include: {
            session: true,
            goal: true,
            performer: true
          }
        });

        if (sessionActivity == null) {

          console.log(`Session activities for '${activityId}' do not exist.`)
          return NextResponse.json({ status: 404, message: `Session activity for '${activityId}' does not exist.` })
        } 

        const duplicatedSession = await prisma.sessions.create({
          data: {
            name: sessionActivity.session.name,
            type: sessionActivity.session.type,
            isTemplate: false,
            performerId: sessionActivity.session.performerId,
            slug: null,
            intensityParam: sessionActivity.session.intensityParam,
            wattParam: sessionActivity.session.wattParam,
            speedParam: sessionActivity.session.speedParam,
            pulseParam: sessionActivity.session.pulseParam,
          },
        });

        const duplicatedSessionActivity = await prisma.sessionActivity.create({
          data: {
            date: sessionActivity.date,
            sessionId: duplicatedSession.id,
            goalId: sessionActivity.goalId,
            performerId: sessionActivity.performerId
          },
        });

        sessionActivityToReturn = duplicatedSessionActivity

        const sessionQuestions = await prisma.sessionQuestions.findMany({
          where: {
            sessionId: sessionActivity.sessionId,
          }
        });

        if (sessionQuestions.length > 0) {
          for (const question of sessionQuestions) {
            const questionOriginal = await prisma.questions.findUnique({
              where: {
                id: question.questionId
              },
            });

            if (questionOriginal != null) {
              const questionCreate = await prisma.questions.create({
                data: {
                  question: questionOriginal.question,
                  type: questionOriginal.type
                },
              });
  
              const duplicatedQuestion = await prisma.sessionQuestions.create({
                data: {
                  sessionId: duplicatedSession.id,
                  questionId: questionCreate.id
                },
              });
            }
          }
        }

        const sessionIntervals = await prisma.sessionIntervals.findMany({
          where: {
            sessionId: sessionActivity.sessionId,
          }
        });

        if (sessionIntervals.length > 0) {
          for (const interval of sessionIntervals) {
            const intervalOriginal = await prisma.intervals.findUnique({
              where: {
                id: interval.intervalId
              },
            });

            if (intervalOriginal != null) {
              const intervalCreate = await prisma.intervals.create({
                data: {
                  duration: intervalOriginal.duration,
                  intensity: intervalOriginal.intensity
                },
              });
  
              const duplicatedInterval = await prisma.sessionIntervals.create({
                data: {
                  sessionId: duplicatedSession.id,
                  intervalId: intervalCreate.id
                },
              });
            }
          }
        }

        const sessionTags = await prisma.sessionTags.findMany({
          where: {
            sessionId: sessionActivity.sessionId,
          }
        });

        if (sessionTags.length > 0) {
          for (const tag of sessionTags) { 
              const duplicatedTag = await prisma.sessionTags.create({
                data: {
                  sessionId: duplicatedSession.id,
                  tag: tag.tag
                },
              });
          }
        }

        console.log(`Session activity for '${activityId}' duplicated.`)
        return NextResponse.json({ status: 200, message: JSON.stringify(duplicatedSessionActivity) })
      });
      return NextResponse.json({ status: 200, message: JSON.stringify(sessionActivityToReturn) })
    } catch (error) {
    console.log(error)
    return NextResponse.json({ status: 500, message: `Internal server error..` })
  }
}