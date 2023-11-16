import { prisma } from "@/lib/prisma"
import { type Performer } from "@/types/performer";
import { NextResponse, type NextRequest } from "next/server";

/**
 * @swagger
 * /api/users/createUser:
 *   put:
 *     summary: Create a new user.
 *     description: Takes a request where the body is a serialised Performer object and writes it to the database.
 *     requestBody:
 *        description: Serialized Performer object.
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                userId:
 *                  type: string
 *                gender:
 *                  type: string
 *                sport:
 *                  type: string
 *                heartRate:
 *                  type: number
 *                watt:
 *                  type: number
 *                speed:
 *                  type: number
 *     responses:
 *       200:
 *         description: Successfully written to database.
 *       500:
 *         description: Internal server error when writing to database.
 */
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
    return NextResponse.json({ status: 200, message: "Success writing user to database." })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ status: 500, message: "Failed writing user to database." })
  }
}