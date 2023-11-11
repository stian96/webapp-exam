import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        console.log("Checking to see if id {} exists")

        const performer = await prisma.performers.findUnique({
            where: {
              id: "blah",
            },
          });
    
        console.log("Id {} exists.")
        return NextResponse.json({ success: true, message: "Id {} exists." })
      } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Id {} does not exist." })
      }
}