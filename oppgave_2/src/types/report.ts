import { IntervalResult } from "./performance/intervalResult"
import { Answer } from "./answer"
import { SessionStatusEnum } from "@/enums/sessionStatusEnum"

export type Report = {
    status: SessionStatusEnum,
    comments: string,
    intervalResults: Array<IntervalResult>,
    answers: Array<Answer>
}