import { PriorityEnum } from "@/enums/PriorityEnum"

export type GoalsInput = {
    id: string,
    name: string,
    date: string,
    year: string,
    goal: string,
    comment: string,
    isCompetition: string,
    priority: PriorityEnum
}