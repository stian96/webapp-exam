import { Question } from "../question"
import { Interval } from "../performance/interval"

export type Session = {
    id: string,
    name: string,
    type: string,
    tags: Array<string>,
    question: Array<Question>,
    intervals: Array<Interval>
}