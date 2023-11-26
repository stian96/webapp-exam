import { PriorityEnum } from "@/enums/PriorityEnum"
export interface GoalModel {
    id?: string,
    name?: string | null,
    date?: Date | null | string,
    comment?: string | null,
    isCompetition: boolean,
    goalCompetition?: number | null,
    goalNotCompetition?: string | null,
    priority?: PriorityEnum | null
}