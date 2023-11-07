import Answer from "@/components/Answer"
import Header from "@/components/Header"
import Progress from "@/components/Progress"
import TaskComponent from "@/components/Task"
import Tasks from "@/components/Tasks"
import TaskText from "@/components/Text"
import { type Task } from "@/types"

const Home = async () => {

  const fetchTask = async () => {
    const response = await fetch("http://localhost:3000/api/restapi", { method: "get" })

    if (!response.ok) 
      throw new Error("Failed to fetch data.")

      return response.json()
  }
    
  const response = await fetchTask()
  const result = response as { success: boolean, data: Task[] }

  return (
    <main>
      {JSON.stringify(result)}
      <Header />
      <Tasks>
        <Answer />
      </Tasks>
      <TaskComponent />
      <TaskText text={"Hva blir resultatet av regneoperasjonen?"} />
      {result && <Progress tasks={result.data} />}
    </main>
  )
}

export default Home
