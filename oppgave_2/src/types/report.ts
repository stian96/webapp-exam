import { IntervalResult } from "./performance/intervalResult"
import { Answer } from "./answer"

export type Report = {
    // TODO: Add 'SessionStatusEnum',
    comments: string,
    intervalResults: Array<IntervalResult>,
    answers: Array<Answer>

}