import { Question } from "./question"

export type Session = {
    id: string,
    name: string,
    type: string,
    tags: Array<string>,
    question: Array<Question>,
    intervals: Array<Interval>
}