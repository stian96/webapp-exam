import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { Goal } from "@/types/classes/goal"

type GoalsGroupedByYear = Record<string, Goal[]>

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

    const goalsGroupedByYear: GoalsGroupedByYear = performerGoals.reduce((acc, performerGoal) => {
      const year = performerGoal.year.toString();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(performerGoal.goal);
      return acc;
    }, {} as GoalsGroupedByYear);

    if (goals.length === 0) {
      console.log(`No goals exist.`)
      return NextResponse.json({ status: 404, message: `No goals exist.` })
    }
  
    console.log(`${goals.length} goals exists.`)
    return NextResponse.json({ status: 200, message: JSON.stringify(goals) })
    } 
    catch (error) {
      console.log(error)
      return NextResponse.json({ status: 500, message: `Internal server error..` })
    }
  }