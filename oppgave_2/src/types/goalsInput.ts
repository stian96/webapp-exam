import { PriorityEnum } from "@/enums/PriorityEnum"

export type GoalsInput = {
    id: string,
    name: string,
    date: string,
    year: string,
    goal: string,
    comments: string,
    isCompetition: string,
    priority: PriorityEnum
}