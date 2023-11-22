"use client"

import { Answer, Header, Tasks, TaskCount, Progress, DropdownTaskFilter } from "@/components";
import ResultsDisplay from "@/components/ResultsDisplay";
import { type Task, type Attempts, type Stats, type Type } from "@/types"
import React, { useState, useEffect } from 'react'
import { fetchTasks, fetchRandomTasks } from '../features/task/task.controller'
import { Icons } from "@/components/icons"
import useTaskManager from '../hooks//useTaskManager';
import useResetTask from "@/hooks/useResetTask";


const Home = () => {

  const [selectedType, setSelectedType] = useState<string>('add')
  const [tasks, setTasks] = useState<Task[]>([])
  const [taskCount, setTaskCount] = useState<string>('5')
  const [errorRandom, setErrorRandom] = useState('')
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [randomTaskCount, setRandomTaskCount] = useState<number | null>(null);
  const [lastRandomCount, setLastRandomCount] = useState<number | null>(null);

  const [isCorrectAnswer, setIsAnswerCorrect] = useState(false);
  const [answerShown, setIsAnswerShown] = useState(false);
  const [showResults, setShowResults] = useState(false);



  const initialScores: Stats = {
    add: { correct: 0, incorrect: 0 },
    subtract: { correct: 0, incorrect: 0 },
    multiply: { correct: 0, incorrect: 0 },
    divide: { correct: 0, incorrect: 0 },
  };


  const { scores, attempts, handleCorrectAnswer,
    handleIncorrectAnswer, resetTasks, initializeAttempts } = useTaskManager(initialScores);
    
    console.log("Attempts: ", attempts)
    console.log("Attempts Type: ", typeof attempts)



  useEffect(() => {
    const getTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks(selectedType, taskCount);
        setTasks(fetchedTasks);
        initializeAttempts(fetchedTasks);

      } catch (errorFetchingTasks) {
        console.error(`Error fetching tasks: `, errorFetchingTasks);

      }
    };
    void getTasks();
  }, [selectedType, taskCount, initializeAttempts]);


  const handleRandomTaskFetch = async () => {
    try {
      const userDefinedCount = Number(taskCount);
      const randomTasks = await fetchRandomTasks(userDefinedCount);
      setTasks(randomTasks);
      setRandomTaskCount(randomTasks.length);
      console.log(randomTasks);
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


  const resetTask = useResetTask({
    setSelectedType,
    setTasks,
    setTaskCount,
    setErrorRandom,
    setRandomTaskCount,
    setLastRandomCount,
    setIsAnswerCorrect,
    setIsAnswerShown,
    setShowResults,
    resetTasks,
    setCurrentTaskIndex
  });

  const handleStartAgain = async () => {
    await resetTask(selectedType, taskCount);
  };

  const onShowAnswer = (taskType: Type) => {
    setIsAnswerShown(true)
    handleIncorrectAnswer(taskType)
  };

  const handleShowResults = () => {
    setShowResults(true);
  };

  useEffect(() => {
    setIsAnswerCorrect(false);
    setIsAnswerShown(false);
  }, [currentTaskIndex]);

  //denne må ligge her, for at neste knappen skal synes når svaret er rett
  const handleAnswerCorrect = (taskType: Type) => {
    handleCorrectAnswer(taskType, setIsAnswerCorrect);
  };


  return (
    <main>
      <Header />
      <TaskCount taskCount={taskCount} onTaskCountChange={handleCountChange}></TaskCount>
      {errorRandom && <p className="count-error-msg">{errorRandom}</p>}
      <DropdownTaskFilter selectedType={selectedType} handleTypeChange={handleTypeChange} />
      <button type="button" onClick={handleRandomTaskFetch} className="btn-random">Hent tilfeldige typer oppgaver</button>
      {randomTaskCount !== null && (
        <p>{`Antall oppgaver hentet av tilfeldige typer: ${randomTaskCount}`}</p>
      )}
      <Tasks tasks={tasks} currentTaskIndex={currentTaskIndex}>
        {tasks.length > 0 && currentTaskIndex < tasks.length && tasks[currentTaskIndex] && (
          <>
            <Answer
              task={tasks[currentTaskIndex]}
              onCorrectAnswer={() => {
                handleAnswerCorrect(tasks[currentTaskIndex].type);
              }}

              onIncorrectAnswer={() => {
                handleIncorrectAnswer(tasks[currentTaskIndex].id);

              }}
              onShowAnswer={() => {
                onShowAnswer(tasks[currentTaskIndex].type)
              }}
              remainingAttempts={attempts[tasks[currentTaskIndex].id]}
              totalAttempts={3} //TODO add attempts to the db. Right now it is hard coded

            />
            <Progress
              tasks={tasks}
              attempts={attempts}
              onShowResults={handleShowResults}
              isCorrectAnswer={isCorrectAnswer && currentTaskIndex <= tasks.length - 1}
              isAnswerShown={answerShown}
              currentTaskIndex={currentTaskIndex}
              setCurrentTaskIndex={setCurrentTaskIndex} />
          </>
        )}
      </Tasks>

      {showResults && (
        <>
          <ResultsDisplay scores={scores} />
          <button onClick={handleStartAgain} className="btn-startAgain">
            Start på nytt
            <Icons.refresh size={18} />
          </button>

        </>
      )}

    </main>
  );
};

export default Home;