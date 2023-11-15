import { Question } from "../question"
import { Interval } from "../performance/interval"
import { SessionModel } from "../interface/SessionModel"

export class Session implements SessionModel {
    id: string
    name: string
    type: string
    tags: string[]
    questions: Question[]
    intervals: Interval[]

    constructor(
        id: string,
        name: string,
        type: string,
        tags: string[],
        questions: Question[],
        intervals: Interval[]) {

        this.id = id,
        this.name = name,
        this.type = type,
        this.tags = tags,
        this.questions = questions,
        this.intervals = intervals
    }
}