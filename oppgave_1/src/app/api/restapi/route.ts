import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { type Task } from "@/types"

const tasks: Task[] = [
  {
    id: "124", text: "Skriv resultatet av regneoperasjonen", type: "add", data: "9|4",
  },
  {
    id: "125", text: "Skriv resultatet av regneoperasjonen", type: "divide", data: "10|2",
  },
  {
    id: "126", text: "Skriv resultatet av regneoperasjonen", type: "multiply", data: "8|7",
  },
  {
    id: "127", text: "Skriv resultatet av regneoperasjonen", type: "subtract", data: "9|5",
  },
  {
    id: "128", text: "Skriv resultatet av regneoperasjonen", type: "add", data: "5|9",
  },
  {
    id: "129", text: "Skriv resultatet av regneoperasjonen", type: "divide", data: "12|3",
  },
  {
    id: "130", text: "Skriv resultatet av regneoperasjonen", type: "multiply", data: "5|5",
  },
  {
    id: "131", text: "Skriv resultatet av regneoperasjonen", type: "subtract", data: "10|8",
  },
  {
    id: "132", text: "Skriv resultatet av regneoperasjonen", type: "add", data: "4|6",
  },
  {
    id: "133", text: "Skriv resultatet av regneoperasjonen", type: "divide", data: "9|3",
  },
  {
    id: "134", text: "Skriv resultatet av regneoperasjonen", type: "multiply", data: "4|2",
  },
  {
    id: "135", text: "Skriv resultatet av regneoperasjonen", type: "subtract", data: "50|8",
  },
  {
    id: "136", text: "Skriv resultatet av regneoperasjonen", type: "add", data: "4|6",
  },
  {
    id: "134", text: "Skriv resultatet av regneoperasjonen", type: "divide", data: "9|3",
  },
  {
    id: "135", text: "Skriv resultatet av regneoperasjonen", type: "multiply", data: "4|2",
  },
  {
    id: "136", text: "Skriv resultatet av regneoperasjonen", type: "subtract", data: "50|8",
  },
  {
    id: "137", text: "Skriv resultatet av regneoperasjonen", type: "add", data: "3|6",
  },
  {
    id: "138", text: "Skriv resultatet av regneoperasjonen", type: "divide", data: "4|3",
  },
  {
    id: "139", text: "Skriv resultatet av regneoperasjonen", type: "multiply", data: "5|2",
  },
  {
    id: "140", text: "Skriv resultatet av regneoperasjonen", type: "subtract", data: "56|8",
  },
  {
    id: "141", text: "Skriv resultatet av regneoperasjonen", type: "add", data: "43|6",
  },
  {
    id: "142", text: "Skriv resultatet av regneoperasjonen", type: "divide", data: "40|4",
  },
  {
    id: "143", text: "Skriv resultatet av regneoperasjonen", type: "multiply", data: "44|2",
  },
  {
    id: "144", text: "Skriv resultatet av regneoperasjonen", type: "subtract", data: "6|8",
  },
  {
    id: "145", text: "Skriv resultatet av regneoperasjonen", type: "add", data: "6|6",
  },
  {
    id: "146", text: "Skriv resultatet av regneoperasjonen", type: "divide", data: "70|3",
  },
  {
    id: "147", text: "Skriv resultatet av regneoperasjonen", type: "multiply", data: "7|2",
  },
  {
    id: "148", text: "Skriv resultatet av regneoperasjonen", type: "subtract", data: "8|8",
  },
  {
    id: "149", text: "Skriv resultatet av regneoperasjonen", type: "add", data: "9|6",
  },
  {
    id: "150", text: "Skriv resultatet av regneoperasjonen", type: "divide", data: "3|3",
  },
  {
    id: "151", text: "Skriv resultatet av regneoperasjonen", type: "multiply", data: "23|2",
  },
  {
    id: "152", text: "Skriv resultatet av regneoperasjonen", type: "subtract", data: "45|8",
  },
  {
    id: "153", text: "Skriv resultatet av regneoperasjonen", type: "add", data: "45|6",
  },
  {
    id: "154", text: "Skriv resultatet av regneoperasjonen", type: "divide", data: "55|3",
  },
  {
    id: "155", text: "Skriv resultatet av regneoperasjonen", type: "multiply", data: "46|2",
  },
  {
    id: "156", text: "Skriv resultatet av regneoperasjonen", type: "subtract", data: "65|8",
  },
  {
    id: "158", text: "Skriv resultatet av regneoperasjonen", type: "add", data: "67|6",
  },
  {
    id: "159", text: "Skriv resultatet av regneoperasjonen", type: "divide", data: "67|3",
  },
  {
    id: "160", text: "Skriv resultatet av regneoperasjonen", type: "multiply", data: "6|2",
  },
  {
    id: "161", text: "Skriv resultatet av regneoperasjonen", type: "subtract", data: "90|8",
  },
]

// TODO: Denne skal brukes til å "samle" svarene (om du ikke bruker database)
const answers = new Map<Task["id"], { attempts: number }>()

export function PUT(request: NextRequest) {
  const count = request.nextUrl.searchParams.get("count")
  if (!count)
    return NextResponse.json({ success: false, error: "Invalid count" })
  return NextResponse.json({ success: true, data: tasks }, { status: 207 })
}


export function GET(request: NextRequest) {
  const taskType = request.nextUrl.searchParams.get("type");
  if (!taskType) {
    return NextResponse.json({ success: false, error: "Task type is not specified" }, { status: 400 });
  }
  const filteredTasks = tasks.filter(task => task.type === taskType);

  return NextResponse.json({ success: true, data: filteredTasks });
}
