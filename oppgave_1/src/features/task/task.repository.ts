import { PrismaClient } from '@prisma/client'
import { type QueryParams } from "@/types"

const prisma = new PrismaClient();

export const getTasksByTypeAndCount = async (params: QueryParams = {}) => {
    const { taskType, count } = params
    return await prisma.task.findMany({
        where: {
            type: taskType,
        },
        take: count,
    });
};