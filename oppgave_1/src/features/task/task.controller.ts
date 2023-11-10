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

export const fetchRandomTasks = async (taskType: string, count: number): Promise<Task[]> => {
    const response = await fetch(`${API_URL}?type=${taskType}&count=${count}`, { method: "GET" });

    if (!response.ok) {
        throw new Error(`Failed to fetch tasks. Status: ${response.status}`);
    }

    const result = await response.json() as { success: boolean; data: Task[] };
    return result.data;
};


export default {
    fetchTasks,
    fetchRandomTasks
}