import { Question } from "../question"
import { Interval } from "../performance/interval"

export interface SessionModel {
    id: string | null
    name: string
    type: string
    tags: string[]
    questions: Question[]
    intervals: Interval[]
}