import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export async function GET(request: NextRequest) {
  const taskType = request.nextUrl.searchParams.get("type");
  const count = parseInt(request.nextUrl.searchParams.get("count") ?? '0', 10)
  if (!taskType) {
    return NextResponse.json({ success: false, error: "Task type is not specified" }, { status: 400 });
  }
  if (isNaN(count) || count < 1) {
    return NextResponse.json({ success: false, error: "Count value is not specified" }, { status: 400 });

  }

  const tasks = await prisma.task.findMany({
    where: {
      type: taskType
    },
    take: count
  })


  return NextResponse.json({ success: true, data: tasks });
}


// Denne skal brukes til å "samle" svarene (om du ikke bruker database)-Vi bruker db!
/*
const answers = new Map<Task["id"], { attempts: number }>()

export function PUT(request: NextRequest) {
  const count = request.nextUrl.searchParams.get("count")
  if (!count)
    return NextResponse.json({ success: false, error: "Invalid count" })
  return NextResponse.json({ success: true, data: tasks }, { status: 207 })
}
*/