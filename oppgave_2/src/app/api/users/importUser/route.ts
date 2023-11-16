import { prisma } from "@/lib/prisma"
import { type PerformerDto } from "@/types/DTO/importUsers";
import { NextResponse, type NextRequest } from "next/server";

/**
 * @swagger
 * /api/users/importUser:
 *   put:
 *     summary: Saves an imported user to the database.
 *     description: Imports user from a DTO retrieved from /api/users/getImportedUsers and writes it to the database, as well as all activities, goals, etc are connected to said user. The write is a transaction.
 *     requestBody:
 *       description: Serialized Performer object.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               userId:
 *                 type: string
 *               gender:
 *                 type: string
 *               sport:
 *                 type: string
 *               meta:
 *                 type: object
 *                 properties:
 *                   heartrate:
 *                     type: number
 *                   watt:
 *                     type: number
 *                   speed:
 *                     type: number
 *               activities:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     date:
 *                       type: string
 *                     name:
 *                       type: string
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                     goalId:
 *                       type: string
 *                     questions:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           question:
 *                             type: string
 *                           type:
 *                             type: string
 *                     intervals:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           duration:
 *                             type: number
 *                           intensity:
 *                             type: number
 *     responses:
 *       200:
 *         description: Successfully wrote users.
  *       500:
 *         description: Internal server error.
 */
export const PUT = async (request: NextRequest) => {

  try {
    await prisma.$transaction(async (prisma) => {
      console.log("Deserialising user.")
      const data = await request.json()
      const performer: PerformerDto = data as PerformerDto;
      console.log("Deserialised user.")

      console.log("Attempting to write user to database.")
      
      const newPerformer = await prisma.performers.create({
        data: {
            id: performer.id,
            userId: performer.userId,
            gender: performer.gender,
            sport: performer.sport,
            heartRate: performer.meta.heartrate,
            watt: performer.meta.watt,
            speed: performer.meta.speed
        }
      });

      for (const activity of performer.activities) {

        const newSession = await prisma.sessions.create({
          data: {
            name: activity.name,
            isTemplate: false
          }
        });

        if (activity.tags != null) {
          for (const tag of activity.tags) {
            const newTag = await prisma.sessionTags.create({
              data: {
                sessionId: newSession.id,
                tag: tag
              }
            });

          }
        }
        
        if (activity.goalId && activity.goalId.length > 0) {
          const newGoal = await prisma.goals.create({
            data: {
              id: activity.goalId,
              isCompetition: false
            }
          });

          const performerGoal = await prisma.performerGoals.create({
            data: {
              performerId: performer.id,
              goalId: newGoal.id,
              year: 2023
            }
          });

          const newActivity = await prisma.sessionActivity.create({
            data: {
              date: activity.date,
              sessionId: newSession.id,
              goalId: activity.goalId,
              performerId: performer.id
            }
          });

        } else {
          const newActivity = await prisma.sessionActivity.create({
            data: {
              date: activity.date,
              sessionId: newSession.id,
              performerId: performer.id
            }
          });

        }

        if (activity.questions && activity.questions.length > 0) {
          for (const question of activity.questions) {
            const newQuestion = await prisma.questions.create({
              data: {
                  id: question.id,
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

        if (activity.intervals && activity.intervals.length > 0) {
          for (const interval of activity.intervals) {
            const newIntervals = await prisma.intervals.create({
              data: {
                  id: interval.id,
                  duration: interval.duration,
                  intensity: interval.intensity
              }
            });


            const newIntervalSessions = await prisma.sessionIntervals.create({
              data: {
                  sessionId: newSession.id,
                  intervalId: interval.id
              }
            });

          }
        }
      
      console.log("Successfully wrote user to database.")
    }
  });
  
  console.log("Successfully wrote all users to database.")
  return NextResponse.json({ status: 200, message: "Success writing user to database." })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ status: 500, message: "Failed writing user to database." })
  }
}