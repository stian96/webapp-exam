
import { prisma } from "@/lib/prisma"
import { type NextRequest, NextResponse } from "next/server";

export const GET = async ( request: NextRequest) => {
  const{ searchParams } = new URL(request.url)
  const sessionId = searchParams.get("sessionId")

  if (!sessionId) {
    return NextResponse.json({ status: 404, message: "Missing sessionId parameter in the request."})
  }

  try{

    const sessionQuestions = await prisma.sessionQuestions.findMany({
      where: { sessionId: sessionId },
      include: {
        question: true,
      },
    })
   return NextResponse.json({status: 200, message: JSON.stringify(sessionQuestions)})
  } catch (error){
    return NextResponse.json({ status: 500, message: `Internal server error..` })
}}
  
