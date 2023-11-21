
import { fetchTasks } from '../features/task/task.controller';
import { type Task } from "@/types";
import { type Dispatch, type SetStateAction } from 'react';

type UseResetProps = {
    setSelectedType: Dispatch<SetStateAction<string>>;
    setTasks: Dispatch<SetStateAction<Task[]>>;
    setTaskCount: Dispatch<SetStateAction<string>>;
    setErrorRandom: Dispatch<SetStateAction<string>>;
    setRandomTaskCount: Dispatch<SetStateAction<number | null>>;
    setLastRandomCount: Dispatch<SetStateAction<number | null>>;
    setIsAnswerCorrect: Dispatch<SetStateAction<boolean>>;
    setIsAnswerShown: Dispatch<SetStateAction<boolean>>;
    setShowResults: Dispatch<SetStateAction<boolean>>;
    resetTasks: () => void;
    setCurrentTaskIndex: Dispatch<SetStateAction<number>>;
    //SRC: OpenAI.(2023).ChatGPT(GPT-4).[Large language model]. https://chat.openai.com/chat
}

const useResetTask = ({
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
}: UseResetProps) => {
    const resetGame = async (selectedType: string, taskCount: string) => {
        setCurrentTaskIndex(0);
        resetTasks();

        setSelectedType('add');
        setTasks([]);
        setTaskCount('5');
        setErrorRandom('');

        setRandomTaskCount(null);
        setLastRandomCount(null);
        setIsAnswerCorrect(false);
        setIsAnswerShown(false);
        setShowResults(false);

        const newTasks = await fetchTasks(selectedType, taskCount);
        setTasks(newTasks);
    };

    return resetGame;
};

export default useResetTask;

