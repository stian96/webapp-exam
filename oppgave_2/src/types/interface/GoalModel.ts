export interface GoalModel {
    id?: string,
    name: string,
    date: Date,
    goal: string,
    comments: string,
    isCompetition: boolean
    priority: PriorityEnum
}