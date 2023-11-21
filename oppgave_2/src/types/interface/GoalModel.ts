import { PriorityEnum } from "@/enums/PriorityEnum"
export interface GoalModel {
    id?: string,
    name?: string,
    date?: Date,
    comment?: string,
    isCompetition: boolean,
    goalCompetition?: number,
    goalNotCompetition?: string,
    priority?: PriorityEnum
}