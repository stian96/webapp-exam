import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create Performers
  const performer1 = await prisma.performers.create({
    data: {
      userId: 'Lars1',
      gender: 'Male',
      sport: 'swimming',
      heartRate: 85,
      watt: 190,
      speed: 25,
    },
  });

  const performer2 = await prisma.performers.create({
    data: {
      userId: 'Mona2',
      gender: 'Female',
      sport: 'cycling',
      heartRate: 65,
      watt: 220,
      speed: 35,
    },
  });

  const sessionTypes = ['cycling', 'swimming', 'running', 'triathlon'];

  // Define a function to create intervals and interval results
  async function createIntervalsAndResults(sessionId: string) {
    const interval = await prisma.intervals.create({
      data: {
        duration: 45,
        intensity: 7,
      },
    });

    await prisma.intervalResults.create({
      data: {
        intervalId: interval.id,
        duration: interval.duration,
        intensityMin: 5,
        intensityMax: 9,
        intensityAvg: 7,
        pulseMin: 60,
        pulseMax: 160,
        pulseAvg: 110,
        speedMin: 2,
        speedMax: 5,
        speedAvg: 3.5,
        wattMin: 100,
        wattMax: 400,
        wattAvg: 250,
      },
    });

    return interval.id;
  }

  for (const type of sessionTypes) {
    for (const performer of [performer1, performer2]) {
      const session = await prisma.sessions.create({
        data: {
          name: `${type} Session`,
          type: type,
          isTemplate: false,
          performerId: performer.id,
        },
      });

      const sessionActivity = await prisma.sessionActivity.create({
        data: {
          date: new Date(),
          sessionId: session.id,
          performerId: performer.id,
        },
      });

      await prisma.sessionTags.create({
        data: {
          sessionId: session.id,
          tag: type.toLowerCase(),
        },
      });

      const question = await prisma.questions.create({
        data: {
          question: 'How demanding was the session',
          type: 'text',
        },
      });

      await prisma.sessionQuestions.create({
        data: {
          sessionId: session.id,
          questionId: question.id,
        },
      });

      const intervalId = await createIntervalsAndResults(session.id);
      await prisma.sessionIntervals.create({
        data: {
          sessionId: session.id,
          intervalId: intervalId,
        },
      });


      // Create 3 Reports for each performer, skipping the last session
      if (type !== 'triathlon') {
        await prisma.reports.create({
          data: {
            status: 'Completed',
            comments: `${type} session completed successfully`,
            sessionActivityId: sessionActivity.id,
          },
        });


      }

      await prisma.reportIntervalResults.create({
        data: {
          reportId: Report.id,
          intervalResultId: intervalResultId, // Replace this with the actual interval result ID
        },
      });

    }
  }

  console.log("Seed data created successfully");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
