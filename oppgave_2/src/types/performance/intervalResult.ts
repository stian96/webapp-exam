import { Interval } from "./interval"
import { ParamResult } from "./paramResult" 

export type IntervalResult = {
    id?: string,
    interval: Interval,
    intensity: ParamResult,
    pulse: ParamResult,
    speed: ParamResult,
    watt: ParamResult,
    duration: number
}

export type IntervalResultAnalysis = {
    id?: string,
    activityId: string,
    interval: string,
    intensity: ParamResult,
    pulse: ParamResult,
    speed: ParamResult,
    watt: ParamResult,
    duration: number
}