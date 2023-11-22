import { Session } from "../classes/session"  
import { Performer } from "../performer"
import { Question } from "../question"
import { Interval } from "../performance/interval"

export class SessionEditDto {
    sessionId: string
    sessionActivityId: string
    date: Date
    name: string
    intensity: number
    watt: number
    speed: number
    pulse: number
    type: string
    goalId: string
    
    constructor(
        sessionId: string,
        sessionActivityId: string,
        date: Date,
        name: string,
        intensity: number,
        watt: number,
        speed: number,
        pulse: number,
        type: string,
        goalId: string) {

        this.sessionId = sessionId,
        this.sessionActivityId = sessionActivityId,
        this.date = date,
        this.name = name,
        this.intensity = intensity,
        this.watt = watt,
        this.speed = speed,
        this.pulse = pulse
        this.type = type
        this.goalId = goalId
    }
}