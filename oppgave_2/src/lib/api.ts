import { Performer } from "../types/performer"
import { Goal } from "../types/classes/goal"

interface APIResponse {
    status: number
    message: Performer[]
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
  export const updatePerformerInDatabase = async (performer: Performer): Promise<Boolean> => {
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

  // Function used to update a goal in the database.
  export const createNewGoalInDatabase = async (goal: Goal, performerId: string, year: number): Promise<boolean> => {
    try {
        const response = await fetch("/api/goals/createNewGoal", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ goal, performerId, year })
        });

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
};