
import { useState, useCallback } from 'react';
import { type Attempts, type Stats, type Type, type Task } from "@/types";

const useTaskHandlers = (initialScores: Stats) => {
    const [scores, setScores] = useState<Stats>(initialScores);
    //const [attempts, setAttempts] = useState<Attempts>(initialAttempts);
    const [attempts, setAttempts] = useState<Attempts>({});
    const handleCorrectAnswer = useCallback((taskType: Type, setIsCorrectAnswer: (isCorrect: boolean) => void) => {
        setScores(prevScores => ({
            ...prevScores,
            [taskType]: {
                ...prevScores[taskType],
                correct: prevScores[taskType].correct + 1,
            },
        }));
        setIsCorrectAnswer(true);
    }, []);

    const handleIncorrectAnswer = useCallback((taskId: string) => {
        setAttempts(prevAttempts => {
            const newAttempts = Math.max(prevAttempts[taskId] - 1, 0);
            return {
                ...prevAttempts,
                [taskId]: newAttempts,
            };
        });
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


    return { scores, attempts, handleCorrectAnswer, handleIncorrectAnswer, resetTasks, initializeAttempts };
};


export default useTaskHandlers;



