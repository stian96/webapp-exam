import { PriorityEnum } from "@/enums/PriorityEnum"

export type GoalsInput = {
    id: string,
    name?: string | null,
    date?: Date | null,
    year?: string | null,
    comment?: string | null,
    goalCompetition?: number | null,
    goalNotCompetition?: string | null,
    isCompetition: boolean,
    priority?: PriorityEnum | null
}