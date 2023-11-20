import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)
  const performerId = searchParams.get("performerId")

  if (!performerId) {
    return NextResponse.json({ status: 404, message: "Missing performerId parameter in the request."})
  }
  
  try {
    const performerGoals = await prisma.performerGoals.findMany({
      where: {
        performerId: performerId
      },
      include: {
        goal: true
      }
    })

    const goals = performerGoals.map((performerG) => performerG.goal)

    if (goals.length === 0) {
      console.log(`No goals exist.`)
      return NextResponse.json({ status: 404, message: `No goals exist.` })
    }
  
    console.log(`${goals.length} goals exist.`)
    return NextResponse.json({ status: 200, message: JSON.stringify(goals) })
    } 
    catch (error) {
      console.log(error)
      return NextResponse.json({ status: 500, message: `Internal server error..` })
    }
  }