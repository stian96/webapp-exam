//import * as taskService from "./task.service";


import { type Task } from "@/types"

const API_URL = 'http://localhost:3000/api/restapi';

export const fetchTasks = async (selectedType: string, taskCount: string): Promise<Task[]> => {
    const response = await fetch(`${API_URL}?type=${selectedType}&count=${taskCount}`, { method: "GET" });

    if (!response.ok) {
        throw new Error(`Failed to fetch tasks. Status: ${response.status}`);
    }

    const result = await response.json() as { success: boolean; data: Task[] };
    console.log(`Tasks fetched successfully: `, result.data);
    return result.data;
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


    const shuffledTasks = tasks.sort(() => 0.5 - Math.random()).slice(0, totalCount);//Chatgpt4
    return shuffledTasks;//Chatgpt4

};

/*
export const updateAttempts = async (taskId: string, attempts: number): Promise<void> => {
    const response = await fetch(`${API_URL}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId, attempts }),
    });

    if (!response.ok) {
        throw new Error(`Failed to update attempts. Status: ${response.status}`);
    }
};
export default {
    fetchTasks,
    fetchRandomTasks,
    updateAttempts
}
*/
