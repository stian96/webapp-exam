
import { PriorityEnum } from "../enums/PriorityEnum"
import { updateExistingGoalInDatabase, createNewGoalInDatabase, CreateGoalParams  } from "../lib/api"
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
        console.log("Goal updated successfully!")
    } else {
        console.error("Failed to update goal...")
    }
}

export const addNewGoalToDB = async ({ goal, performerId, year }: CreateGoalParams) => {
    const response = await createNewGoalInDatabase({ goal, performerId, year })

    if (response) {
        console.log("New goal successfully created!")
    } else {
        console.log("Failed to add new goal...")
    }
}