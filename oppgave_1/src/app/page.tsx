"use client"

import { Answer, Header, Tasks, TaskCount, Progress, DropdownTaskFilter } from "@/components";
import ResultsDisplay from "@/components/ResultsDisplay";
import { type Task, type Attempts, type Stats, type Type } from "@/types"
import React, { useState, useEffect } from 'react'
import { cn } from "@/lib/utils"
import { fetchTasks, fetchRandomTasks } from '../features/task/task.controller'

//TODO: Show button next task when clicking Button : Show answers
//TODO: Not show next task when clicking Send btn.



const Home = () => {

  const [selectedType, setSelectedType] = useState<string>('add')
  const [tasks, setTasks] = useState<Task[]>([])
  const [taskCount, setTaskCount] = useState<string>('5')
  const [errorRandom, setErrorRandom] = useState('')
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [randomTaskCount, setRandomTaskCount] = useState<number | null>(null);
  const [lastRandomCount, setLastRandomCount] = useState<number | null>(null);

  const [attempts, setAttempts] = useState<Attempts>({});

  const [isCorrectAnswer, setIsAnswerCorrect] = useState(false);

  const [answerShown, setIsAnswerShown] = useState(false);


  const [scores, setScores] = useState<Stats>({
    add: { correct: 0, incorrect: 0 },
    subtract: { correct: 0, incorrect: 0 },
    multiply: { correct: 0, incorrect: 0 },
    divide: { correct: 0, incorrect: 0 },
  });



  useEffect(() => {
    const getTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks(selectedType, taskCount);
        setTasks(fetchedTasks);

        const initialAttempts = fetchedTasks.reduce((acc: Attempts, task: Task) => {
          acc[task.id] = 3;
          return acc;
        }, {});


        setAttempts(initialAttempts);
        console.log(initialAttempts)

      } catch (errorFetchingTasks) {
        console.error(`Error fetching tasks: `, errorFetchingTasks);
        //setError('En feil oppstod under henting av oppgaver.');
      }


    };

    void getTasks();
  }, [selectedType, taskCount]);


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


  const handleCorrectAnswer = (taskType: Type) => {
    setIsAnswerCorrect(true);


    setScores(prevScores => ({
      ...prevScores,
      [taskType]: {
        ...prevScores[taskType],
        correct: prevScores[taskType].correct + 1
      }

    }));
    //console.log(scores)
  };

  const handleIncorrectAnswer = (taskId: string, taskType: Type) => {
    setAttempts(prevAttempts => {
      const newAttempts = Math.max(prevAttempts[taskId] - 1, 0);
      return {
        ...prevAttempts,
        [taskId]: newAttempts
      };
    });

    // Existing logic for updating scores
    setScores(prevScores => ({
      ...prevScores,
      [taskType]: {
        ...prevScores[taskType],
        incorrect: prevScores[taskType].incorrect + 1
      }
    }));
  };



  const decrementAttempt = (taskId: string) => {
    setAttempts((prevAttempts) => ({
      ...prevAttempts,
      [taskId]: prevAttempts[taskId] > 0 ? prevAttempts[taskId] - 1 : 0
    }));
  };


  const handleStartAgain = async () => {

    //console.log("handle start again")
    setCurrentTaskIndex(0);
    setScores({
      add: { correct: 0, incorrect: 0 },
      subtract: { correct: 0, incorrect: 0 },
      multiply: { correct: 0, incorrect: 0 },
      divide: { correct: 0, incorrect: 0 },
    });
    // Fetch new tasks
    const newTasks = await fetchTasks(selectedType, taskCount);

    //console.log(newTasks)
    setTasks(newTasks);
  };

  const onShowAnswer = () => {
    setIsAnswerShown(true)
  };

  useEffect(() => {
    // Reset states when the current task index changes
    setIsAnswerCorrect(false);
    setIsAnswerShown(false);
  }, [currentTaskIndex]);



  //console.log("Current Task Index:", currentTaskIndex);
  //console.log("Total Tasks:", tasks.length);

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
              onCorrectAnswer={handleCorrectAnswer}
              onIncorrectAnswer={() => {
                handleIncorrectAnswer(tasks[currentTaskIndex].id, tasks[currentTaskIndex].type);

              }}
              onShowAnswer={onShowAnswer}
              remainingAttempts={attempts[tasks[currentTaskIndex].id]}
              totalAttempts={3} //TODO add attempts to the db. Right now it is hard coded




            />
            <Progress
              tasks={tasks}
              attempts={attempts}
              isCorrectAnswer={isCorrectAnswer && currentTaskIndex <= tasks.length - 1}
              isAnswerShown={answerShown}
              currentTaskIndex={currentTaskIndex}
              setCurrentTaskIndex={setCurrentTaskIndex} />
          </>
        )}
      </Tasks>

      {tasks.length > 0 && currentTaskIndex < tasks.length && tasks[currentTaskIndex] && (
        <>
          <ResultsDisplay scores={scores} />
          <button onClick={handleStartAgain} className="btn-startAgain">Start Again</button>

        </>
      )}

    </main>
  );
};

export default Home;