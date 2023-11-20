import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

export const GET = async () => {

    console.log(`Checking to see if users exists`)
  
    try {
        const goals = await prisma.goals.findMany();
  
        if (goals.length === 0) {
  
          console.log(`No goals exist.`)
          return NextResponse.json({ status: 404, message: `No goals exist.` })
        }
  
        console.log(`${goals.length} goals exist.`)
        return NextResponse.json({ status: 200, message: JSON.stringify(goals) })
    } catch (error) {
      console.log(error)
      return NextResponse.json({ status: 500, message: `Internal server error..` })
    }
  }