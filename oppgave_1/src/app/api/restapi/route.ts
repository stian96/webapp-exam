import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { type Task } from "@/types"

const tasks: Task[] = [
  {
    id: "124",
    text: "Skriv resultatet av regneoperasjonen",
    type: "add",
    data: "9|4",
  },
  {
    id: "125",
    text: "Skriv resultatet av regneoperasjonen",
    type: "divide",
    data: "10|2",
  },
  {
    id: "126",
    text: "Skriv resultatet av regneoperasjonen",
    type: "multiply",
    data: "8|7",
  },
  {
    id: "127",
    text: "Skriv resultatet av regneoperasjonen",
    type: "subtract",
    data: "9|5",
  },
  {
    id: "128",
    text: "Skriv resultatet av regneoperasjonen",
    type: "add",
    data: "5|9",
  },
  {
    id: "129",
    text: "Skriv resultatet av regneoperasjonen",
    type: "divide",
    data: "12|3",
  },
  {
    id: "130",
    text: "Skriv resultatet av regneoperasjonen",
    type: "multiply",
    data: "5|5",
  },
  {
    id: "131",
    text: "Skriv resultatet av regneoperasjonen",
    type: "subtract",
    data: "10|8",
  },
  {
    id: "132",
    text: "Skriv resultatet av regneoperasjonen",
    type: "add",
    data: "4|6",
  },
  {
    id: "133",
    text: "Skriv resultatet av regneoperasjonen",
    type: "divide",
    data: "9|3",
  },
  {
    id: "134",
    text: "Skriv resultatet av regneoperasjonen",
    type: "multiply",
    data: "4|2",
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
  const count = -1
  if (!count)
    return NextResponse.json({ success: false, error: "Invalid count" })
  return NextResponse.json({ success: true, data: tasks }, { status: 200 })
}
