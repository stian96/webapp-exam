import { type SessionActivity } from '@/types/sessionActivity';
import { IntervalResult, type ReportIntervalResult } from "./performance/intervalResult"
import { type Answer } from "./answer"
import { type SessionStatusEnum } from "@/enums/sessionStatusEnum"

export type Report = {
    id: string,
    status?: SessionStatusEnum,
    comments?: string,
    sessionActivityId: string,
    intervalResults: ReportIntervalResult[],
    answers: Answer[]

}
