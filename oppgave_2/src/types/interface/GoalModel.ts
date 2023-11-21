import { PriorityEnum } from "@/enums/PriorityEnum"
export interface GoalModel {
    id?: string,
    name?: string,
    date?: Date,
    comments?: string,
    isCompetition: boolean,
    goalCompetition?: number,
    goalNotCompetition?: string,
    priority?: PriorityEnum
}