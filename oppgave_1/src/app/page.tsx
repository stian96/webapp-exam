"use client"
import Answer from "@/components/Answer"
import Header from "@/components/Header"
import Tasks from "@/components/Tasks"
import DropdownTaskFilter from "@/components/DropdownTaskFilter"
import { type Task } from "@/types"
import React, { useState, useEffect } from 'react'
//import Progress from "@/components/Progress"
//import TaskText from "@/components/Text"

const Home = () => {
  const [selectedType, setSelectedType] = useState<string>('add')
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/restapi?type=${selectedType}`, { method: "GET" })

        if (!response.ok) {
          throw new Error(`Failed to fetch tasks.Status:${response.status}`)
        }

        const result = await response.json() as { success: boolean; data: Task[] }
        console.log(`Tasks fetched successfully: `, result.data);
        setTasks(result.data)
      } catch (error) {
        console.error(`Error fetching tasks: `, error)
      }
    };

    fetchTasks().catch(error => { console.log(error); })
  }, [selectedType])


  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(`Selected task type changed to: ${event.target.value}`);
    setSelectedType(event.target.value)
  };

  return (
    <main>
      <Header />
      <DropdownTaskFilter selectedType={selectedType} handleTypeChange={handleTypeChange} />
      <Tasks tasks={tasks}>
        <Answer />
      </Tasks>
      {/*<TaskText text={"Hva blir resultatet av regneoperasjonen?"} >*/}
      {/*{result && <Progress tasks={result.data} />}*/}

    </main>
  );
};

export default Home;
