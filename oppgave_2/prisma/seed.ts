import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {


  await prisma.performers.deleteMany({
    where: {
      OR: [
        { userId: 'Sven3' },
        { userId: 'Liv4' }
      ]
    }
  });

  const relatedSessionIds = await prisma.sessions.findMany({
    where: {
      performerId: {
        in: ['Sven3', 'Liv4']
      }
    },
    select: { id: true }
  }).then(sessions => sessions.map(session => session.id));
  //SRC: OpenAI.(2023).ChatGPT(GPT-4).[Large language model]. https://chat.openai.com/chat



  await prisma.sessionActivity.deleteMany({
    where: {
      sessionId: {
        in: relatedSessionIds
      }
    }
  });

  await prisma.sessionIntervals.deleteMany({
    where: {
      sessionId: {
        in: relatedSessionIds
      }
    }
  });

  const relatedSessionActivityIds = await prisma.sessionActivity.findMany({
    where: {
      sessionId: {
        in: relatedSessionIds
      }
    },
    select: { id: true }
  }).then(activities => activities.map(activity => activity.id));
  //SRC: OpenAI.(2023).ChatGPT(GPT-4).[Large language model]. https://chat.openai.com/chat


  await prisma.reports.deleteMany({
    where: {
      sessionActivityId: {
        in: relatedSessionActivityIds
      }
    }
  });

  let performer1 = await prisma.performers.findUnique({
    where: {
      userId: 'Sven3',
    },
  });

  if (!performer1) {
    performer1 = await prisma.performers.create({
      data: {
        userId: 'Sven3',
        gender: 'Male',
        sport: 'swimming',
        heartRate: 85,
        watt: 190,
        speed: 25,
      },
    });
  }

  let performer2 = await prisma.performers.findUnique({
    where: {
      userId: 'Liv4',
    },
  });
  //SRC: PRISMA.(2023).Prisma Client API reference. 
  //https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#findunique

  if (!performer2) {
    performer2 = await prisma.performers.create({
      data: {
        userId: 'Liv4',
        gender: 'Female',
        sport: 'cycling',
        heartRate: 65,
        watt: 220,
        speed: 35,
      },
    });
  }


  await prisma.sessions.create({
    data: {
      name: 'cycling Session Template',
      type: 'cycling',
      isTemplate: true,
    },
  });

  const sessionTypes = ['cycling', 'cycling', 'swimming', 'running', 'triathlon'];
  const sessionTags = ['cardio', 'cooldown', 'strength'];

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
        intensityMin: getRandomInt(5, 8),
        intensityMax: getRandomInt(8, 10),
        intensityAvg: getRandomInt(6, 9),
        pulseMin: getRandomInt(60, 80),
        pulseMax: getRandomInt(140, 170),
        pulseAvg: getRandomInt(90, 120),
        speedMin: getRandomFloat(2, 4),
        speedMax: getRandomFloat(4, 6),
        speedAvg: getRandomFloat(3, 5),
        wattMin: getRandomInt(100, 300),
        wattMax: getRandomInt(300, 500),
        wattAvg: getRandomInt(200, 400),
      },
    });

    return { intervalId: interval.id, intervalResultId: intervalResult.id };
  }

  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomFloat(min: number, max: number) {
    return Math.random() * (max - min) + min;
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

      for (const tag of sessionTags) {
        await prisma.sessionTags.create({
          data: {
            sessionId: session.id,
            tag: tag,
          },
        });
      }

      const question = await prisma.questions.create({
        data: {
          question: 'How demanding was the session?',
          type: 'text',
        },
      });

      const questionTwo = await prisma.questions.create({
        data: {
          question: 'How satisfied are you with your performance?',
          type: 'radio:range',
        },
      });

      await prisma.sessionQuestions.create({
        data: {
          sessionId: session.id,
          questionId: question.id,
        },
      });

      await prisma.sessionQuestions.create({
        data: {
          sessionId: session.id,
          questionId: questionTwo.id,
        },
      });

      const { intervalId, intervalResultId } = await createIntervalsAndResults();

      await prisma.sessionIntervals.create({
        data: {
          sessionId: session.id,
          intervalId: intervalId,
        },
      });

      if (type !== 'triathlon') {
        const report = await prisma.reports.create({
          data: {
            status: 'Completed',
            comments: `${type} session completed successfully`,
            sessionActivityId: sessionActivity.id,
          },
        });

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

//SRC: PRISMA.(2023). CRUD. https://www.prisma.io/docs/concepts/components/prisma-client/crud
//SRC: PRISMA.(2023).Prisma Client. https://www.prisma.io/docs/concepts/components/prisma-client


main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

//SRC: PRISMA.(2023).Seeding your database. https://www.prisma.io/docs/guides/migrate/seed-database