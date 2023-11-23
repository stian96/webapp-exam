//import { PrismaClient } from '@prisma/client'
import { AnswerUpdateRequest } from "@/app/api/saveAttempt/route"

const saveAttemptsToDB = async ({taskId, attempts}: AnswerUpdateRequest) => {
    try {
        const response = await fetch("/api/saveAttempt", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ taskId, attempts })
        })

        const data = await response.json()
        console.log("Response from 'saveAttempt' endpoint: ", data)
    } catch (error) {
        console.error("Error saving attempt to DB: ", error)
    }
    
}
