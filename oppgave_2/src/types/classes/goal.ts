import { GoalModel } from "../interface/GoalModel"
import { PriorityEnum } from "@/enums/PriorityEnum"

export class Goal implements GoalModel {
    id: string
    name?: string | null
    date?: Date | null
    comment?: string | null
    isCompetition: boolean
    goalCompetition?: number | null
    goalNotCompetition?: string | null
    location?: string | null
    type?: string | null
    priority?: PriorityEnum | null

    constructor(
        id: string, 
        name: string, 
        date: Date, 
        comment: string,
        isCompetition: boolean,
        goalCompetition: number, 
        goalNotCompetition: string,
        type: string,
        priority: PriorityEnum) {

        this.id = id,
        this.name = name,
        this.date = date,
        this.comment = comment,
        this.isCompetition = isCompetition
        this.goalCompetition = goalCompetition,
        this.goalNotCompetition = goalNotCompetition,
        this.type = type
        this.priority = priority
    }
}