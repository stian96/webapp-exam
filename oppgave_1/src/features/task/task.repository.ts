//import { PrismaClient } from '@prisma/client'
import { AnswerUpdateRequest } from "@/app/api/saveAttempt/route"

export const saveAttemptsToDB = async ({taskId, attempts}: AnswerUpdateRequest) => {
    try {
        console.log("Saving current attempt to database.")
        const response = await fetch("/api/saveAttempt", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ taskId, attempts })
        })

        if (!response.ok) {
            return { error: true, message: `Error, server responded with status: ${response.status}` }
        }
        const data = await response.json()
        console.log("Response from 'saveAttempt' endpoint: ", data)

        return data
    } catch (error) {
        if (error instanceof Error) {
            console.log("Error saving attempt to DB: ", error)
            return { error: true, message: "Error in saveAttemptsToDB: " + error.message }
        }
        else {
            console.log("Unknown error occured when saving attempt to DB: ", error)
            return { error: true, message: "Unknown error in saving attempt to DB."}
        }
    }
}
