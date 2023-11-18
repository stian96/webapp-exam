import { prisma } from "@/lib/prisma"
import { type Performer } from "@/types/performer";
import { NextResponse, type NextRequest } from "next/server";

export const PUT = async (request: NextRequest) => {
    try {
        console.log("Deserialising user.")
        
        const data = await request.json()
        const performer: Performer = data as Performer;
    
        console.log("Deserialised user.")

        const existingPerformer = await prisma.performers.findUnique({
            where: { id: performer.id }
        })

        if (!existingPerformer) {
            console.log("Performer was not found in the database.")
            return NextResponse.json({ status: 404, message: "Performer not found" })
        }

        // Update existing user.
        const updatedPerformer = await prisma.performers.update({
            where: { id: performer.id },
                data: {
                userId: performer.userId,
                gender: performer.gender,
                sport: performer.sport,
                heartRate: performer.heartRate,
                watt: performer.watt,
                speed: performer.speed
            }
        })

        console.log("Updated user in database.", updatedPerformer)
        return NextResponse.json({ status: 200, message: "Success updating user in database.", data: (await updatedPerformer).gender });
        } 
        catch (error) {
            console.log(error);
            return NextResponse.json({ status: 500, message: "Failed updating user in database." });
        }
    }