"use client"
import { useEffect, useState } from "react"
import Answer from "@/components/Answer"
import Header from "@/components/Header"
import Progress from "@/components/Progress"
import TaskComponent from "@/components/Task"
import Tasks from "@/components/Tasks"
import TaskText from "@/components/Text"
import { type Task } from "@/types"

const Home = () => {
  const [result, setResult] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch("http://localhost:3000/api/restapi", { method: "get" });
      const result = await response.json()
      setResult(result as Task[])
    }
    fetchTask();
  }, [])
    
  

  return (
    <main>
      {JSON.stringify(result)}
      <Header />
      <Tasks>
        <Answer />
      </Tasks>
      <TaskComponent />
      <TaskText text={"Hva blir resultatet av regneoperasjonen?"} />
      {result && <Progress tasks={result} />}
    </main>
  )
}

export default Home
