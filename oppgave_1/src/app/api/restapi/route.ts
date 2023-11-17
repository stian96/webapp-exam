import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getRandomTaskType = () => {
  const taskTypes = ["add", "subtract", "multiply", "divide"];
  return taskTypes[Math.floor(Math.random() * taskTypes.length)];
};

export async function GET(request: NextRequest) {
  let taskType = request.nextUrl.searchParams.get("type");
  const count = parseInt(request.nextUrl.searchParams.get("count") ?? '0', 10)
  if (!taskType) {
    return NextResponse.json({ success: false, error: "Task type is not specified" }, { status: 400 });
  }
  if (isNaN(count) || count < 1) {
    return NextResponse.json({ success: false, error: "Count value is not specified" }, { status: 400 });

  }
  if (!taskType) {
    taskType = getRandomTaskType(); // Velger en tilfeldig oppgavetype hvis ingen er spesifisert
  }

  const tasks = await prisma.task.findMany({
    where: {
      type: taskType
    },
    take: count
  })


  return NextResponse.json({ success: true, data: tasks });
}

// TODO: Denne fungerer ikke som tiltenkt for å lagre antall forsøk til db

/*

type AnswerUpdate = {
  taskId: string;
  attempts: number;
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json() as AnswerUpdate;
    const { taskId, attempts } = body;

    if (!taskId) {
      return NextResponse.json({ success: false, error: "Id not found" }, { status: 400 });
    }
    const answer = await prisma.answer.findFirst({
      where: { taskId: taskId },
    });
    if (!answer) {
      return NextResponse.json({ success: false, error: "Answer not found" }, { status: 404 });
    }

    const updatedAnswer = await prisma.answer.update({
      where: { id: answer.id },
      data: { attempts: attempts },
    });

    return NextResponse.json({ success: true, data: updatedAnswer }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}*/


// TODO: Denne skal brukes til å "samle" svarene (om du ikke bruker database)
/*const answers = new Map<Task["id"], { attempts: number }>()

export function PUT(request: NextRequest) {
  const count = request.nextUrl.searchParams.get("count")
  if (!count)
    return NextResponse.json({ success: false, error: "Invalid count" })
  return NextResponse.json({ success: true, data: tasks }, { status: 207 })
}*/