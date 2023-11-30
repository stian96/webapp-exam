import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create Performers
  const performer1 = await prisma.performers.create({
    data: {
      userId: 'Sven3',
      gender: 'Male',
      sport: 'swimming',
      heartRate: 85,
      watt: 190,
      speed: 25,
    },
  });

  const performer2 = await prisma.performers.create({
    data: {
      userId: 'Liv4',
      gender: 'Female',
      sport: 'cycling',
      heartRate: 65,
      watt: 220,
      speed: 35,
    },
  });

  // Create a generic session template (not specifically linked to a performer)
  await prisma.sessions.create({
    data: {
      name: 'Generic Session Template',
      type: 'Generic',
      isTemplate: true,
    },
  });

  const sessionTypes = ['cycling', 'swimming', 'running', 'triathlon'];

  // Define a function to create intervals and interval results
  async function createIntervalsAndResults() {
    const interval = await prisma.intervals.create({
      data: {
        duration: 45,
        intensity: 7,
      },
    });

    const intervalResult = await prisma.intervalResults.create({
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

    return { intervalId: interval.id, intervalResultId: intervalResult.id };
  }

  // Iterate over the session types and create sessions, activities, tags, and questions for each performer
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

      // Create tags and questions for each session
      await prisma.sessionTags.create({
        data: {
          sessionId: session.id,
          tag: type,
        },
      });

      const question = await prisma.questions.create({
        data: {
          question: 'How demanding was the session?',
          type: 'text',
        },
      });

      await prisma.sessionQuestions.create({
        data: {
          sessionId: session.id,
          questionId: question.id,
        },
      });

      // Create intervals and results, then link them to the session
      const { intervalId, intervalResultId } = await createIntervalsAndResults();

      await prisma.sessionIntervals.create({
        data: {
          sessionId: session.id,
          intervalId: intervalId,
        },
      });

      // Create reports for each session activity, excluding the last session type
      if (type !== 'triathlon') {
        const report = await prisma.reports.create({
          data: {
            status: 'Completed',
            comments: `${type} session completed successfully`,
            sessionActivityId: sessionActivity.id,
          },
        });

        // Link the report to the interval results
        await prisma.reportIntervalResults.create({
          data: {
            reportId: report.id,
            intervalResultId: intervalResultId,
          },
        });
      }
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
