"use client"
import Answer from "@/components/Answer"
import Header from "@/components/Header"
import Tasks from "@/components/Tasks"
import DropdownTaskFilter from "@/components/DropdownTaskFilter"
import { type Task } from "@/types"
import React, { useState, useEffect } from 'react'
import TaskCount from "@/components/TaskCount"
import { cn } from "@/lib/utils"
import apiController from '../features/task/task.controller'
import { fetchTasks, fetchRandomTasks } from '../features/task/task.controller'

//import Progress from "@/components/Progress"
//import TaskText from "@/components/Text"

const Home = () => {

  const [selectedType, setSelectedType] = useState<string>('add')
  const [tasks, setTasks] = useState<Task[]>([])
  const [taskCount, setTaskCount] = useState<string>('5');
  const [errorRandom, setErrorRandom] = useState('');

  useEffect(() => {
    const getTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks(selectedType, taskCount);
        setTasks(fetchedTasks);
      } catch (errorFetchingTasks) {
        console.error(`Error fetching tasks: `, errorFetchingTasks);
        //setError('En feil oppstod under henting av oppgaver.');
      }
    };

    void getTasks();
  }, [selectedType, taskCount]);

  const handleRandomTaskFetch = async () => {
    try {
      const randomCount = Math.floor(Math.random() * 10) + 1;
      const randomTasks = await fetchRandomTasks(selectedType, randomCount);
      setTasks(randomTasks);
    } catch (errorRandomTaskFetch) {
      console.error(`Error fetching random tasks: `, errorRandomTaskFetch);
      //setError('En feil oppstod under henting av tilfeldige oppgaver.');
    }
  };

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
      setErrorRandom('');
    } else {
      setErrorRandom('Skriv inn et antall oppgaver fra 1 til 10, eller velg et tilfeldig antall oppgaver.');
    }
  };


  return (
    <main>
      <Header />
      <TaskCount taskCount={taskCount} onTaskCountChange={handleCountChange}></TaskCount>
      {errorRandom && <p className="count-error-msg">{errorRandom}</p>}
      <DropdownTaskFilter selectedType={selectedType} handleTypeChange={handleTypeChange} />
      <button type="button" onClick={handleRandomTaskFetch} className={cn("bg-slate-200 px-2 py-1")}>Hent et antall tilfeldige oppgaver</button>
      <Tasks tasks={tasks}>
        <Answer />
      </Tasks>
      {/*<TaskText text={"Hva blir resultatet av regneoperasjonen?"} >*/}
      {/*{result && <Progress tasks={result.data} />}*/}

    </main>
  );
};

export default Home;