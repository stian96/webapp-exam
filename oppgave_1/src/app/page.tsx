"use client"

import { Answer, Header, Tasks, TaskCount, Progress, DropdownTaskFilter } from "@/components";
import ResultsDisplay from "@/components/ResultsDisplay";
import { type Task, type Attempts, type Stats, type Type } from "@/types"
import React, { useState, useEffect } from 'react'
import { fetchTasks, handleRandomTaskFetch } from '../features/task/task.controller'
import { initialScoreValues, handleCountChange } from "../features/task/task.service"
import { Icons } from "@/components/icons"
import useTaskManager from '../hooks//useTaskManager';
import useResetTask from "@/hooks/useResetTask";

export type TaskManagerData = {
  scores: Stats
  attempts: Attempts
  handleCorrectAnswer: (taskType: Type, taskId: string, currentAttempt: number, setIsCorrectAnswer: (isCorrect: boolean) => void) => void
  handleIncorrectAnswer: (taskId: string, currentAttempt: number) => void
  handleShowAnswer: (taskType: Type) => void
  resetTasks: () => void
  initializeAttempts: (fetchedTasks: Task[]) => void
}


const Home = () => {
  const TOTAL_ATTEMPTS = 3
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

  const initialScores: Stats = initialScoreValues
  const taskManager: TaskManagerData = useTaskManager(initialScores);
    

  useEffect(() => {  
    const getTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks(selectedType, taskCount);
        setTasks(fetchedTasks);
        taskManager.initializeAttempts(fetchedTasks);

      } catch (errorFetchingTasks) {
        console.error(`Error fetching tasks: `, errorFetchingTasks);

      }
    };
    void getTasks();
  }, [selectedType, taskCount, taskManager.initializeAttempts]);


  const executeRandomTaskFetch = async () => {
    handleRandomTaskFetch({ taskCount, setTasks, setRandomTaskCount, taskManager })
  }

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(`Selected task type changed to: ${event.target.value}`);
    setSelectedType(event.target.value)
  };

  const executeCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleCountChange(event, { setTaskCount, setErrorRandom })
  }


  const resetTasks = taskManager.resetTasks
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

  const onShowAnswer = (taskType: Type, currentAttempts: number) => {
    setIsAnswerShown(true)
    taskManager.handleShowAnswer(taskType)
    taskManager.handleIncorrectAnswer(taskType, currentAttempts)
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

    // Send taskId to update the attempts in the db.
    const taskId = tasks[currentTaskIndex].id

    // Calculate total attempts used based on total - remaining attempts.
    const attemptsUsed = (TOTAL_ATTEMPTS - taskManager.attempts[taskId]) + 1
    taskManager.handleCorrectAnswer(taskType, taskId, attemptsUsed, setIsAnswerCorrect);
  };


  return (
    <main>
      <Header />
      <TaskCount taskCount={taskCount} onTaskCountChange={executeCountChange}></TaskCount>
      {errorRandom && <p className="count-error-msg">{errorRandom}</p>}
      <DropdownTaskFilter selectedType={selectedType} handleTypeChange={handleTypeChange} />
      <button type="button" onClick={executeRandomTaskFetch} className="btn-random">Hent tilfeldige typer oppgaver</button>
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
                const taskId = tasks[currentTaskIndex].id
                const currentAttempts = taskManager.attempts[taskId]
                taskManager.handleIncorrectAnswer(taskId, currentAttempts);

              }}
              onShowAnswer={() => {
                const taskId = tasks[currentTaskIndex].id
                const currentAttempts = taskManager.attempts[taskId]
                onShowAnswer(tasks[currentTaskIndex].type, currentAttempts)
              }}
              remainingAttempts={taskManager.attempts[tasks[currentTaskIndex].id]}
              totalAttempts={TOTAL_ATTEMPTS} 

            />
            <Progress
              tasks={tasks}
              attempts={taskManager.attempts}
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
          <ResultsDisplay scores={taskManager.scores} />
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