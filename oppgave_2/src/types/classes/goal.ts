import { GoalModel } from "../interface/GoalModel"
import { PriorityEnum } from "@/enums/PriorityEnum"

export class Goal implements GoalModel {
    id: string
    name: string
    date: Date
    goal: string
    comments: string
    isCompetition: boolean
    priority: PriorityEnum

    constructor(
        id: string, 
        name: string, 
        date: Date, 
        goal: string, 
        comment: string,
        isCompetition: boolean,
        priority: PriorityEnum) {

        this.id = id,
        this.name = name,
        this.date = date,
        this.goal = goal,
        this.comments = comment
        this.isCompetition = isCompetition
        this.priority = priority
    }
}