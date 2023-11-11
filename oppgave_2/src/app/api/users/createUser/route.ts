import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

type Interval = {
  id: string
  duration: number
  intensity: number
}

type Question = {
  id: string
  question: string
  type: string
}

type Activity = {
  date: string
  name?: string
  tags?: string[]
  goalId?: string
  questions?: Question[]
  intervals: Interval[]
}

type Meta = {
  heartrate: number
  watt: number
  speed: number
}

type Performer = {
  id: string
  userId: string
  gender: string
  sport: string
  meta: Meta
  activities: Activity[]
}

export const PUT = async (request: NextRequest) => {

  try {
    console.log("Deserialising user.")
    const data = await request.json()
    const performer: Performer[] = data as Performer[];
    console.log("Deserialised user.")
    
    const newPerformer = await prisma.performers.create({
      data: {
          id: performer[0].id,
          userId: performer[0].userId,
          gender: performer[0].gender,
          sport: performer[0].sport,
          heartRate: performer[0].meta.heartrate,
          watt: performer[0].meta.watt,
          speed: performer[0].meta.speed
      }
  });
  
    console.log("Written user to database.")
    return NextResponse.json({ success: true, message: "Success writing user to database." })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: false, message: "Failed writing user to database." })
  }
}