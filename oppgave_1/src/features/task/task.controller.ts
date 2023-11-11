import * as taskService from "./task.service"
import { type Task, type QueryParams } from "@/types"
import { NextResponse } from "next/server"

//import * as taskService from "./task.service";

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


export default {
    fetchTasks,
    fetchRandomTasks
}

//TODO: Find out how to solve error msg using this:
/*
export const fetchRandomTasks = async (
    params: QueryParams = {},
): Promise<NextResponse<{ success: boolean; data?: Task[]; error?: string }>> => {
    try {
        const tasks = await taskService.getTasks(params);
        return NextResponse.json({ success: true, data: tasks }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: "error.message" }, { status: 500 });
    }
};

export default {
    fetchTasks
}*/