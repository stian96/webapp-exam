import { Question } from "../question"
import { Interval } from "../performance/interval"

export interface SessionModel {
    id: string
    name: string
    type: string
    tags: string[]
    question: Question[]
    intervals: Interval[]
}