import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

export const POST = async () => {
    try {
        console.log("writing")
        const newEntry = await prisma.exampleTable.create({
            data: {
                col1: "yes",
                col2: "it",
                col3: "works"
            }
        });
    
        console.log("written")
        return NextResponse.json({ success: true, message: "Success writing user to database." })
      } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Failed writing user to database." })
      }
}