
import { PriorityEnum } from "../enums/PriorityEnum"
import { createNewGoalInDatabase } from "../lib/api"

type GoalsSaveProps = {
    goalInput: {
        name: string,
        date: string,
        year: string,
        goal: string,
        comments: string,
        competition: string,
        priority: PriorityEnum.A
    }
    goalId: string
    setEditClicked: (decition: boolean) => void 
}

export const saveGoalsToDb = async ({ goalInput, goalId, setEditClicked}: GoalsSaveProps) => {
    const parsedDate = new Date(goalInput.date)

    const newGoal = {
        id: goalId,
        name: goalInput.name,
        date: parsedDate,
        goal: goalInput.goal,
        comments: goalInput.comments,
        isCompetition: goalInput.competition === "yes" ? true : false,
        priority: PriorityEnum.A
    }
    const success = await createNewGoalInDatabase(newGoal, parseInt(goalInput.year))
    if (success) {
        console.log("Goal created/updated successfully!")
    }
    else {
        console.error("Failed to create/update goal...")
    }
    setEditClicked(false)
}