import { prisma } from "@/lib/prisma"
import { type Performer } from "@/types/performer";
import { NextResponse, type NextRequest } from "next/server";

/**
 * @swagger
 * /api/users/createUser:
 *   post:
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
 *       201:
 *         description: Successfully written to database.
 *       500:
 *         description: Internal server error when writing to database.
 */
export const POST = async (request: NextRequest) => {

  try {
    console.log("Deserialising user.")
    
    const data = await request.json()
    const performer: Performer = data as Performer;

    console.log("Deserialised user.")

    console.log("performerId: ", performer.userId)

    const requiredFields = ['userId', 'gender', 'sport', 'heartRate', 'watt', 'speed'];
    const validationError = validateFields(performer, requiredFields);

    if (validationError) {
      return new Response(JSON.stringify({ message: validationError }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const existingUser = await prisma.performers.findUnique({
      where: { userId: performer.userId }
    });

    if (existingUser) {
      return new Response(JSON.stringify({ message: "User ID already exists." }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

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
    return NextResponse.json({ status: 201, message: "Success writing user to database." })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ status: 500, message: "Failed writing user to database." })
  }
}

const validateFields = (performer, fields) => {
  for (const field of fields) {
    const fieldValue = performer[field];

    // Check if the field is a string and empty
    if (typeof fieldValue === 'string' && !fieldValue.trim()) {
      return `Field '${field}' is required.`;
    }
    
    // Check if the field is a number but not a valid number (e.g., NaN)
    if (typeof fieldValue === 'number' && isNaN(fieldValue)) {
      return `Field '${field}' must be a valid number.`;
    }

    
    if (fieldValue === null || fieldValue === undefined) {
      return `Field '${field}' is required.`;
    }
  }
  return null;
};
