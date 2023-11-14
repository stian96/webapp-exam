import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/users/getImportedUsers:
 *   put:
 *     summary: Retrieves users to be imported.
 *     description: Sends a fetch request to an API endpoint to retrieve all users to be imported in the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved users.
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: { "pages": 3, "success": true, "hasMore": true, "page": 1, "data": [ { "id": "ada2ffa1-f880-45a7-91ba-c502891fb523", "userId": "benigne-vita-spes", "gender": "female", "sport": "cycling", "meta": {"heartrate": 170, "watt": 391, "speed": 17}, "activities": [ {"date": "2023-11-26T21:46:08.452Z", "goalId": "a70f36ec-493e-4c75-ad25-502577fed49a"}, {"date": "2023-11-12T04:20:09.771Z", "name": "velit quas comburo", "tags": ["run", "hard", "gravel"]}, // Additional activity entries ] }, // Additional user data ] }
 *       429:
 *         description: Timeout when retrieving users.
 *       500:
 *         description: Internal server error retrieving users.
 */
export const GET = async () => {

  try {

    console.log(`Attempting to fetch users in JSON format to be imported.`)

    // List to contain several pages of API GET results.
    let userData: unknown[] = []
    let pageCounter = 1
    // Paginated json document has a value called 'hasMore' if there are additional pages.
    let hasMore = true

    // Loops as long as there are additional pages.
    while (hasMore) {

        const response = await fetch(`https://webapp-api.vercel.app/api/users?page=${pageCounter}`, {
            method: "get",
        });

        if (response.ok) {

            const responseData: unknown = await response.json()

            // Adds the current pageCounter's data to the list.
            userData = userData.concat(responseData.data)

            // Iterates the pageCounter counter.
            pageCounter++

            // Sets the boolean value of hasMore to reflect whether or not the URL has more data.
            hasMore = responseData.hasMore
        } else {

          console.error(`Failed to fetch users in JSON format to be imported.`)
          return NextResponse.json({ status: response.status, message: "Error while retrieving from the URL using a GET request." })
        }
    }

    console.log(`Fetched ${pageCounter - 1} pages of users in JSON format to be imported.`)

    return NextResponse.json({ status: 200, message: JSON.stringify(userData) })
  } catch (error: unknown) {

    console.error(`Failed to fetch users in JSON format to be imported.`)
    return NextResponse.json({ status: 500, message: "Unexpected error while retrieving from the URL using a GET request." })
  }
}