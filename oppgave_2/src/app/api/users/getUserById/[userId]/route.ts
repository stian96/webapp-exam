import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: Request, { params }: { params: { userId: string } }) => {

  const userId = params.userId
  console.log(`Checking to see if Id '${userId}' exists`)

  try {
      

      const performer = await prisma.performers.findUnique({
          where: {
            id: userId,
          },
        });

        if (!performer) {

          console.log(`Id '${userId}' does not exist.`)
          return NextResponse.json({ success: false, message: `Id '${userId}' does not exist.` })
        }

        console.log(`Id '${userId}' exists.`)
        return NextResponse.json({ success: true, message: `Id '${userId}' exists.` })
    } catch (error) {
      console.log(error)
      return NextResponse.json({ success: false, message: `Id '${userId}' does not exist.` })
    }
}