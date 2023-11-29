import { type Performer } from "../types/performer"
import { type Goal } from "../types/classes/goal"
import { type GoalsGroupedByYear } from "@/app/api/goals/getGoals/route"

type APIResponse = {
    status: number
    message: Performer[]
  }

  type GoalsResponse = {
    status: number
    message: string
  }

  type DeleteGoalResponse = {
    success: boolean;
    message: string;
  }

  export type CreateGoalParams = {
    goal: Goal,
    performerId: string,
    year: string
  }

// Function used to fetch performers from the database.
export const fetchPerformers = async (url: string): Promise<Performer[]> => {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error("Failed to fetch performers...")
    }
    const data = await response.json() as APIResponse
    if (data.status === 200 && typeof data.message === 'string') {

      const performers = JSON.parse(data.message) as Performer[]
      if (performers.length === 30) {
        console.log("Sucess fetching performer data!")
      }
      return performers
    }
    else {
      throw new Error("Invalid response format!")
    }
  }

  // Function used to update a particular performer in the database.
  export const updatePerformerInDatabase = async (performer: Performer): Promise<boolean> => {
    const response = await fetch("/api/users/updateUser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(performer)
    })

    if (!response.ok) {
      const message = await response.json() as { message: string }
      console.log(`Error in updating performer, error message: ${message}`)
      return false
    }

    const data = await response.json()
    if (response.status === 200) {
      console.log("Success: ", data)
      return true
    }
    else {
      console.log("Error saving data to DB: ", data)
      return false
    }
  }

  // Function to get all the goals in the database.
  export const fetchGoals = async (performerId: string) => {
    try {
      const response = await fetch(`/api/goals/getGoals?performerId=${performerId}`)
      if (!response.ok) {
        const errorData = await response.json() as { message: string}
        console.error(`Error in fetching goals from DB: ${response.status}, ${errorData.message}`)
        return {}
      }
      const goals = await response.json() as GoalsResponse
      if (goals.status === 200 && typeof goals.message === "string") {
        const goalsGroupedByYear = JSON.parse(goals.message) as GoalsGroupedByYear
        return goalsGroupedByYear
      }
    } catch(error) {
        console.error("Failed to fetch goals: ", error)
        return {}
    }
  }

  export const createNewGoalInDatabase = async ({goal, performerId, year}: CreateGoalParams): Promise<boolean> => {
    console.log("NewGoal before fetch: ", goal)
    try {
      const response = await fetch("/api/goals/createGoal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ goal, year, performerId })
      })

      if (!response.ok) {
        const error = await response.json() as { message: string }
        console.log(`Failed to add new goal to databasen, error message: ${error.message}`)
        return false
      }

      const success = await response.json()
      console.log(`Success: New goal added to database: ${success}`)
      return true
    } catch (error) {
        console.log(`Failed to fetch information from 'createGoal' API: ${error}`)
        return false
    }
  }

  // Function used to update a goal in the database.
  export const updateExistingGoalInDatabase = async (goal: Goal, year: number, performerId: string): Promise<boolean> => {
    try {
        const response = await fetch("/api/goals/updateGoal", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ goal, year, performerId })
        })

        if (!response.ok) {
            const errorData = await response.json() as { message: string }
            console.error(`Error saving Goal: ${goal.name} to DB. Response: ${response.status}, ${errorData.message}`)
            return false
        }

        const goalData = await response.json();
        console.log(`Success: Goal created in DB`, goalData)
        return true
    } catch (error) {
        console.error(`Error in fetching API: ${error}`)
        return false
    }
}

export const deleteGoalFromDB = async (currentGoal: Goal): Promise<boolean> => {
  try {
      const response = await fetch(`/api/goals/deleteGoal?goalId=${currentGoal.id}`, {
          method: 'DELETE',
      });
      if (!response.ok) {
        return false
      }
      const success = await response.json()
      console.log(`Successfully deleted goal: ${success}`)
      return true
  } catch (error) {
      console.error('Error deleting goal:', error)
      return false
  }
}

type ArchiveType = {
  status: number
  message: Performer
}

// Copy of Sams earlier written code.
export const archive = async (performerId: string) => {
  try {
    const response = await fetch(
      `/api/users/archiveParameters/${performerId}`,
      {
        method: "post",
      },
    )

    const data = await response.json() as ArchiveType
    const isSuccess = data.status

    if (isSuccess == 201) {
      console.log(`Performer parameters with id ${performerId} archived.`)
      return { success: true, message: `${performerId} archived.` }
    } else {
      console.log(`Performer with id ${performerId} does not exist.`)
      return {
        success: false,
        message: `Performer with id ${performerId} does not exist.`,
      }
    }
  } catch (error) {
    return { success: false, message: error }
  }
}
