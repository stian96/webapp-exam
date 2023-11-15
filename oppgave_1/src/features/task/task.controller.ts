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

//Merk denne har count:Number, hvis denne endre må det også endres i page.ts
export const fetchRandomTasks = async (taskType: string, count: number): Promise<Task[]> => {
    const response = await fetch(`${API_URL}?type=${taskType}&count=${count}`, { method: "GET" });

    if (!response.ok) {
        throw new Error(`Failed to fetch tasks. Status: ${response.status}`);
    }

    const result = await response.json() as { success: boolean; data: Task[] };
    return result.data;
};


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

