import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

export const GET = async () => {

    console.log(`Checking to see if users exists`)
  
    try {
        const performers = await prisma.performers.findMany();
  
        if (performers.length === 0) {
  
          console.log(`No users exist.`)
          return NextResponse.json({ status: 404, message: `No users exist.` })
        }
  
        console.log(`${performers.length} users exist.`)
        return NextResponse.json({ status: 200, message: JSON.stringify(performers) })
    } catch (error) {
      console.log(error)
      return NextResponse.json({ status: 500, message: `Internal server error..` })
    }
  }