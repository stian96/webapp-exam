import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server";

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