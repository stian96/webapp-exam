//TODO refactor these types into a single file.

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type Response<T> = {
    success: boolean
    message: T
}

type Interval = {
    id: string
    duration: number
    intensity: number
}

type Question = {
    id: string
    question: string
    type: string
}

type Activity = {
    date: string
    name?: string
    tags?: string[]
    goalId?: string
    questions?: Question[]
    intervals: Interval[]
}

type Meta = {
    heartrate: number
    watt: number
    speed: number
}

type Performer = {
    id: string
    userId: string
    gender: string
    sport: string
    meta: Meta
    activities: Activity[]
}

export const writePerformers = async (performer: Performer): Promise<Response<string>> => {
    try {
        console.log("writing")
        console.log(performer)
        //TODO Write functionality to write to database.
        const newPerformer = await prisma.performers.create({
            data: {
                id: performer.id,
                userId: performer.userId,
                gender: performer.gender,
                sport: performer.sport,
                heartRate: performer.meta.heartrate,
                watt: performer.meta.watt,
                speed: performer.meta.speed
            }
        });
    
        return { success: true, message: "Success writing user to database." }
      } catch (error) {
        console.log(error)
        return { success: false, message: "Failed writing user to database." }
      }
}

export const isPerformerExist = async (performer: Performer): Promise<Response<string>> => {
    try {
        //TODO prisma check if user exists
        const exists = await prisma.performers.findUnique({
            where: {
              id: performer.id,
            },
          })
    
        return { success: true, message: "User already exists." }
      } catch (error) {

        return { success: false, message: "User does not exist." }
      }
}