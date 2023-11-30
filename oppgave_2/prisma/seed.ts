import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const performer1 = await prisma.performers.create({
    data: {
      userId: 'unique-idte2st1',
      gender: 'Male',
      sport: 'Swimming',
      heartRate: 85,
      watt: 190,
      speed: 25,
    },
  });
  const performer2 = await prisma.performers.create({
    data: {
      userId: 'unique-idt3est2',
      gender: 'Female',
      sport: 'Cycling',
      heartRate: 65,
      watt: 220,
      speed: 35,
    },
  });

  const sessionTemplate = await prisma.sessions.create({
    data: {
      name: 'cyclingTemplate',
      type: 'cycling',
      isTemplate: true,
    },
  });

  const sessionIdsForPerformer1 = [];
  const sessionIdsForPerformer2 = [];
  const sessionTypes = ['cycling', 'running', 'swimming', 'triathlon'];

  for (const type of sessionTypes) {
    const session1 = await prisma.sessions.create({
      data: {
        name: `${type} Session`,
        type: type,
        isTemplate: false,
        uniqueToPerformer: { connect: { id: performer1.id } },
      },
    });
    sessionIdsForPerformer1.push(session1.id);

    const session2 = await prisma.sessions.create({
      data: {
        name: `${type} Session`,
        type: type,
        isTemplate: false,
        uniqueToPerformer: { connect: { id: performer2.id } },
      },
    });
    sessionIdsForPerformer2.push(session2.id);
  }


  const questionCreated = await prisma.questions.create({
    data: {
      question: 'How did you feel?',
      type: 'text',

    },
  });

  const questionId = questionCreated.id;

  const tag1 = 'hard';
  const tag2 = 'cycling';


  // Koble tags og questions til sessions for hver performer
  for (const sessionId of sessionIdsForPerformer1) {
    // Koble tag til session
    await prisma.sessionTags.create({
      data: {
        session: { connect: { id: sessionId } },
        tag: tag1,
      },
    });

    // Koble question til session
    await prisma.sessionQuestions.create({
      data: {
        session: { connect: { id: sessionId } },
        question: { connect: { id: questionId } },
      },
    });
  }

  // Performer 2
  for (const sessionId of sessionIdsForPerformer2) {
    await prisma.sessionTags.create({
      data: {
        session: { connect: { id: sessionId } },
        tag: tag2,
      },
    });

    await prisma.sessionQuestions.create({
      data: {
        session: { connect: { id: sessionId } },
        question: { connect: { id: questionId } },
      },
    });
  }




  // Legger til SessionActivities for hver Performer
  const sessionActivityIdsForPerformer1 = [];
  const sessionActivityIdsForPerformer2 = [];

  for (const sessionId of sessionIdsForPerformer1) {
    const sessionActivity = await prisma.sessionActivity.create({
      data: {
        date: new Date(),
        session: { connect: { id: sessionId } },
        performer: { connect: { id: performer1.id } },
      },
    });
    sessionActivityIdsForPerformer1.push(sessionActivity.id);
  }

  for (const sessionId of sessionIdsForPerformer2) {
    const sessionActivity = await prisma.sessionActivity.create({
      data: {
        date: new Date(),
        session: { connect: { id: sessionId } },
        performer: { connect: { id: performer2.id } },
      },
    });
    sessionActivityIdsForPerformer2.push(sessionActivity.id);
  }


  // Opprette Reports
  for (let i = 0; i < 3; i++) {
    await prisma.reports.create({
      data: {
        status: 'Completed',
        comments: 'Great performance',
        sessionActivity: { connect: { id: sessionActivityIdsForPerformer1[i] } },
      },
    });

    await prisma.reports.create({
      data: {
        status: 'Completed',
        comments: 'Excellent performance',
        sessionActivity: { connect: { id: sessionActivityIdsForPerformer2[i] } },
      },
    });
  }

  console.log("Seed data created successfully");
}



main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })