"use client"
import Answer from "@/components/Answer"
import Header from "@/components/Header"
import Tasks from "@/components/Tasks"
import DropdownTaskFilter from "@/components/DropdownTaskFilter"
import { type Task } from "@/types"
import React, { useState, useEffect } from 'react'
import TaskCount from "@/components/TaskCount"
//import Progress from "@/components/Progress"
//import TaskText from "@/components/Text"

const Home = () => {

  const [selectedType, setSelectedType] = useState<string>('add')
  const [tasks, setTasks] = useState<Task[]>([])
  const [taskCount, setTaskCount] = useState<string>('5');
  const [error, setError] = useState('');


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/restapi?type=${selectedType}&count=${taskCount}`, { method: "GET" })

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
  }, [selectedType, taskCount])


  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(`Selected task type changed to: ${event.target.value}`);
    setSelectedType(event.target.value)
  };

  const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, '');
    setTaskCount(value ? String(Number(value)) : '');

    const numberValue = value ? Number(value) : 0;
    if (numberValue >= 1 && numberValue <= 10) {
      setTaskCount(String(numberValue));
      setError('');
    } else {
      setError('Skriv inn et antall oppgaver fra 1 til 10.');
    }
  };

  return (
    <main>
      <Header />
      <TaskCount taskCount={taskCount} onTaskCountChange={handleCountChange}></TaskCount>
      {error && <p className="count-error-msg">{error}</p>}
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
