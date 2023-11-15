import { Question } from "../question"
import { Interval } from "../performance/interval"

export class Session {
    id: string
    name: string
    type: string
    tags: string[]
    question: Question[]
    intervals: Interval[]

    constructor(
        id: string,
        name: string,
        type: string,
        tags: string[],
        question: Question[],
        intervals: Interval[]) {

        this.id = id,
        this.name = name,
        this.type = type,
        this.tags = tags,
        this.question = question,
        this.intervals = intervals
    }
}