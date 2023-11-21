
import { PriorityEnum } from "../enums/PriorityEnum"
import { updateExistingGoalInDatabase } from "../lib/api"
import { Goal } from "@/types/classes/goal"


export const saveGoalsToDb = async (goalInput: Goal, performerId: string, goalId: string, year: string) => {

    const newGoal = {
        id: goalId,
        name: goalInput.name,
        date: goalInput.date,
        comment: goalInput.comment,
        isCompetition: goalInput.isCompetition,
        priority: PriorityEnum.A
    }

    const success = await updateExistingGoalInDatabase(newGoal, parseInt(year), performerId)
    if (success) {
        console.log("Goal created/updated successfully!")
    }
    else {
        console.error("Failed to create/update goal...")
    }
}