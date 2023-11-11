import { prisma } from "@/lib/prisma"
import { type Performer } from "@/types/performer";
import { NextResponse, type NextRequest } from "next/server";

export const PUT = async (request: NextRequest) => {

  try {
    console.log("Deserialising user.")
    
    const data = await request.json()
    const performer: Performer = data as Performer;

    console.log("Deserialised user.")
    
    const newPerformer = await prisma.performers.create({
      data: {
          id: performer.id,
          userId: performer.userId,
          gender: performer.gender,
          sport: performer.sport,
          heartRate: performer.heartRate,
          watt: performer.watt,
          speed: performer.speed
      }
  });
  
    console.log("Written user to database.")
    return NextResponse.json({ success: true, message: "Success writing user to database." })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: false, message: "Failed writing user to database." })
  }
}