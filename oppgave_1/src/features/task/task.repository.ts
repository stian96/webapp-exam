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
            throw new Error(`Error, server responded with status: ${response.status}`)
        }
        const data = await response.json()
        console.log("Response from 'saveAttempt' endpoint: ", data)
    } catch (error) {
        console.error("Error saving attempt to DB: ", error)
    }
}
