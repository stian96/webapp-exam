import { Goal } from "./goal"

export class Competition extends Goal {
    location: string
    type: string
    priority: PriorityEnum

    constructor(
        id: string, 
        name: string, 
        date: Date, 
        goal: string, 
        comment: string, 
        place: string, 
        compType: string, 
        priorityEnum: PriorityEnum) {

        super(id, name, date, goal, comment)
        this.location = place
        this.type = compType,
        this.priority = priorityEnum
    }

}