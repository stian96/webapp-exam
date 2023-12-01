
import { useState, useCallback } from 'react';
import { saveAttemptsToDB } from '@/features/task/task.repository';
import { type Attempts, type Stats, type Type, type Task } from "@/types";

const useTaskHandlers = (initialScores: Stats) => {

    const [scores, setScores] = useState<Stats>(initialScores);

    const [attempts, setAttempts] = useState<Attempts>({});

    const updateAttemptsInDB = async (taskId: string, attempts: number) => saveAttemptsToDB({ taskId, attempts })

    const handleCorrectAnswer = useCallback((taskType: Type, taskId: string, currentAttempt: number, setIsCorrectAnswer: (isCorrect: boolean) => void) => {
        setScores(prevScores => ({
            ...prevScores,
            [taskType]: {
                ...prevScores[taskType],
                correct: prevScores[taskType].correct + 1,
            },
        }));
        setIsCorrectAnswer(true);
        updateAttemptsInDB(taskId, currentAttempt)
    }, []);

    const handleIncorrectAnswer = useCallback((taskId: string, currentAttempt: number) => {
        console.log("task id: ", taskId)
        setAttempts(prevAttempts => {
            const newAttempts = Math.max(prevAttempts[taskId] - 1, 0);
            return {
                ...prevAttempts,
                [taskId]: newAttempts,
            };
        });
        updateAttemptsInDB(taskId, currentAttempt)
    }, []);

    const handleShowAnswer = useCallback((taskType: Type) => {
        setScores(prevScores => ({
            ...prevScores,
            [taskType]: {
                ...prevScores[taskType],
                incorrect: prevScores[taskType].incorrect + 1,
            },
        }));
    }, []);

    const resetTasks = () => {
        setScores(initialScores);
        setAttempts({});
    };


    const initializeAttempts = useCallback((fetchedTasks: Task[]) => {
        const newAttempts: Attempts = fetchedTasks.reduce((acc: Attempts, task: Task) => {
            acc[task.id] = 3;
            return acc;
        }, {});

        setAttempts(newAttempts);
    }, []);


    return { scores, attempts, handleCorrectAnswer, handleIncorrectAnswer, handleShowAnswer, resetTasks, initializeAttempts };
};


export default useTaskHandlers;



