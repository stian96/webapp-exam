//import * as taskService from "./task.service";
import { type Task } from "@/types"
import { type TaskManagerData } from "@/app/page"

const API_URL = 'http://localhost:3000/api/restapi';

export const fetchTasks = async (selectedType: string, taskCount: string): Promise<Task[]> => {

    const count = Number(taskCount);
    if (isNaN(count) || count < 1 || count > 10) {
        return [];
    }

    try {
        const response = await fetch(`${API_URL}?type=${selectedType}&count=${taskCount}`, { method: "GET" });

        if (!response.ok) {
            throw new Error(`Failed to fetch tasks. Status: ${response.status}`);
        }

        const result = await response.json() as { success: boolean; data: Task[] };
        //console.log(`Tasks fetched successfully: `, result.data);
        return result.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);

        throw error;
    }
};


export const fetchRandomTasks = async (totalCount: number): Promise<Task[]> => {
    const tasks = [];
    const taskTypes = ["add", "subtract", "multiply", "divide"];
    const countPerType = Math.ceil(totalCount / taskTypes.length);

    for (const taskType of taskTypes) {
        const response = await fetch(`${API_URL}?type=${taskType}&count=${countPerType}`, { method: "GET" });

        if (!response.ok) {
            throw new Error(`Failed to fetch task. Status: ${response.status}`);
        }

        const result = await response.json() as { success: boolean; data: Task[] };
        tasks.push(...result.data);
    }
    const shuffledTasks = tasks.sort(() => 0.5 - Math.random()).slice(0, totalCount);
    return shuffledTasks;

};

type RandomTaskFetchType = {
    taskCount: string
    setTasks: (value: React.SetStateAction<Task[]>) => void
    setRandomTaskCount: (value: React.SetStateAction<number | null>) => void
    taskManager: TaskManagerData
}

export const handleRandomTaskFetch = async ( task: RandomTaskFetchType) => {
    try {
      const userDefinedCount = Number(task.taskCount);
      const randomTasks = await fetchRandomTasks(userDefinedCount);

      task.setTasks(randomTasks);
      task.setRandomTaskCount(randomTasks.length);
      task.taskManager.initializeAttempts(randomTasks)

      console.log(randomTasks);
    } catch (errorRandomTaskFetch) {
      console.error(`Error fetching random tasks: `, errorRandomTaskFetch);
      task.setRandomTaskCount(0);
    }
  };


