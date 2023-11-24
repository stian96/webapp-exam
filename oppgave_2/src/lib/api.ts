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

/*
// Function to delete a goal from the database.
export const deleteGoal = async (goalId: string): Promise<DeleteGoalResponse> => {
  try {
    const response = await fetch(`/api/goals/deleteGoal?goalId=${goalId}`, {
      method: 'DELETE',
    });

    
    if (!response.ok) {
      \
      throw new Error(`Failed to delete goal. Status: ${response.status}`);
    }

    
    const result = await response.json();

    
    return { success: true, message: result.message || "Goal deleted successfully" };
  } catch (error) {
    
    console.error('Error deleting goal:', error);
    return { success: false, message: error instanceof Error ? error.message : 'Error deleting goal' };
  }
};
*/
