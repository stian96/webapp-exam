import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        console.log("writing")
        const newPerformer = await prisma.performers.create({
          data: {
              id: "blah",
              userId: "blah",
              gender: "male",
              sport: "egg tossing",
              heartRate: 4,
              watt: 15,
              speed: 5
          }
      });
    
        console.log("written")
        return NextResponse.json({ success: true, message: "Success writing user to database." })
      } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Failed writing user to database." })
      }
}