import { type Interval } from "./interval"
import { type ParamResult } from "./paramResult" 

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

export type ReportIntervalResult ={
  id: string,
  intervalId: string,            
  duration: number,
  intensityMin: number,
  intensityMax: number,
  intensityAvg: number,
  pulseMin: number,
  pulseMax: number,
  pulseAvg: number,
  speedMin: number,
  speedMax: number,
  speedAvg: number,
  wattMin: number,
  wattMax: number,
  wattAvg: number,
}