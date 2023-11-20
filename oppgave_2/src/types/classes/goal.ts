import { GoalModel } from "../interface/GoalModel"

export class Goal implements GoalModel {
    id?: string
    name: string
    date: Date
    goal: string
    comments: string

    constructor(
        id: string, 
        name: string, 
        date: Date, 
        goal: string, 
        comment: string) {

        this.id = id,
        this.name = name,
        this.date = date,
        this.goal = goal,
        this.comments = comment
    }
}