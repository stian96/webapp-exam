"use client"

import { Answer, Header, Tasks, TaskCount, Progress, DropdownTaskFilter } from "@/components";
import { type Task } from "@/types"
import React, { useState, useEffect } from 'react'
import { cn } from "@/lib/utils"
//import apiController from '../features/task/task.controller'
import { fetchTasks, fetchRandomTasks } from '../features/task/task.controller'



const Home = () => {

  const [selectedType, setSelectedType] = useState<string>('add')
  const [tasks, setTasks] = useState<Task[]>([])
  const [taskCount, setTaskCount] = useState<string>('5')
  const [errorRandom, setErrorRandom] = useState('')
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [randomTaskCount, setRandomTaskCount] = useState<number | null>(null);
  const [lastRandomCount, setLastRandomCount] = useState<number | null>(null);

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
      let randomCount;
      do {
        randomCount = Math.floor(Math.random() * 10) + 1;
      } while (randomCount === lastRandomCount)

      setLastRandomCount(randomCount)

      const randomTasks = await fetchRandomTasks(selectedType, randomCount);
      setTasks(randomTasks);
      setRandomTaskCount(randomTasks.length);
      console.log(`Antall tilfeldige oppgaver hentet: ${randomTasks.length}`);

    } catch (errorRandomTaskFetch) {
      console.error(`Error fetching random tasks: `, errorRandomTaskFetch);
      setRandomTaskCount(0);
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
  const handleCorrectAnswer = () => {
    setCurrentTaskIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <main>
      <Header />
      <TaskCount taskCount={taskCount} onTaskCountChange={handleCountChange}></TaskCount>
      {errorRandom && <p className="count-error-msg">{errorRandom}</p>}
      <DropdownTaskFilter selectedType={selectedType} handleTypeChange={handleTypeChange} />
      <button type="button" onClick={handleRandomTaskFetch} className={cn("bg-slate-200 px-2 py-1")}>Hent et antall tilfeldige oppgaver</button>
      {randomTaskCount !== null && (
        <p>{`Antall oppgaver hentet: ${randomTaskCount}`}</p>
      )}
      <Tasks tasks={tasks} currentTaskIndex={currentTaskIndex}>
        {tasks.length > 0 && currentTaskIndex < tasks.length && (
          <>
            <Answer task={tasks[currentTaskIndex]} onCorrectAnswer={handleCorrectAnswer} />
            <Progress tasks={tasks} isCorrectAnswer={currentTaskIndex > 0} currentTaskIndex={currentTaskIndex}
              setCurrentTaskIndex={setCurrentTaskIndex} />
          </>
        )}
      </Tasks>

    </main>
  );
};

export default Home;