//import * as TaskRepository from './task.repository';
import { TaskManagerData } from "@/app/page";
import { Stats, Type } from "@/types"

export const initialScoreValues: Stats = {
    add: { correct: 0, incorrect: 0 },
    subtract: { correct: 0, incorrect: 0 },
    multiply: { correct: 0, incorrect: 0 },
    divide: { correct: 0, incorrect: 0 },
  };

type HandleCountChangeType = {
    setTaskCount: (value: React.SetStateAction<string>) => void
    setErrorRandom: (value: React.SetStateAction<string>) => void
}

export const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>, manager: HandleCountChangeType) => {
    const value = event.target.value.replace(/\D/g, '');
    manager.setTaskCount(value ? String(Number(value)) : '');

    const numberValue = value ? Number(value) : 0;
    if (numberValue >= 1 && numberValue <= 10) {
      manager.setTaskCount(String(numberValue));
      manager.setErrorRandom('');
    } else {
      manager.setErrorRandom('Skriv inn et antall oppgaver fra 1 til 10, eller velg et tilfeldig antall oppgaver.');
    }
  };


type ShowAnswerType = {
    setIsAnswerShown: (value: React.SetStateAction<boolean>) => void
    taskManager: TaskManagerData
}

export const onShowAnswer = (taskType: Type, currentAttempts: number, manager: ShowAnswerType) => {
    manager.setIsAnswerShown(true)
    manager.taskManager.handleShowAnswer(taskType)

    if (currentAttempts > 0) {
      manager.taskManager.handleIncorrectAnswer(taskType, currentAttempts)
    } else {
      console.log(`All attempts is used, currentAttempts: ${currentAttempts}`)
    }
  };
