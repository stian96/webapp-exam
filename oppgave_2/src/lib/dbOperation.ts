
import { PriorityEnum } from "../enums/PriorityEnum"
import { createNewGoalInDatabase } from "../lib/api"

type GoalsSaveProps = {
    id: string,
    name: string,
    date: string,
    year: string,
    goal: string,
    comment: string,
    isCompetition: string,
    priority: PriorityEnum
}

export const saveGoalsToDb = async (goalInput: GoalsSaveProps, goalId: string) => {
    const parsedDate = new Date(goalInput.date)

    const newGoal = {
        id: goalId,
        name: goalInput.name,
        date: parsedDate,
        goal: goalInput.goal,
        comment: goalInput.comment,
        isCompetition: goalInput.isCompetition === "yes" ? true : false,
        priority: PriorityEnum.A
    }
    const success = await createNewGoalInDatabase(newGoal, parseInt(goalInput.year))
    if (success) {
        console.log("Goal created/updated successfully!")
    }
    else {
        console.error("Failed to create/update goal...")
    }
}