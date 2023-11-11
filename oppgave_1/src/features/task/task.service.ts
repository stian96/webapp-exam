import * as TaskRepository from './task.repository';
import { type QueryParams } from "@/types"



export const getTasks = async (params: QueryParams = {}) => {
    return await TaskRepository.getTasksByTypeAndCount(params);
};