import { prisma } from "@/lib/prisma"
import { type PerformerDto } from "@/types/DTO/importUsers";
import { type NextRequest, type NextResponse } from "next/server";


export const PUT = async (request: NextRequest) => {

  try {
    console.log("Deserialising user.")
    const data = await request.json()
    const performer: PerformerDto[] = data as PerformerDto[];
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