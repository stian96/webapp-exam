
import { Performer } from "../types/performer"

interface APIResponse {
    status: number
    message: Performer[]
  }

export const fetchPerformers = async (url: string): Promise<Performer[]> => {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error("Failed to fetch performers...")
    }
    const data = await response.json() as APIResponse
    if (data.status === 200 && typeof data.message === 'string') {

      const performers = JSON.parse(data.message) as Performer[]
      if (performers.length === 30) {
        console.log(performers[0].gender)
      }
      return performers
    }
    else {
      throw new Error("Invalid response format!")
    }
  }