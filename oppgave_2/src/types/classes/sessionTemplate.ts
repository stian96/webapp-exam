import { Session } from "../classes/session"  
import { Performer } from "../performer"
import { Question } from "../question"
import { Interval } from "../performance/interval"

export class SessionTemplate extends Session {
    uniqueTo: Performer
    slugs: string
    intensity: number
    watt: number
    speed: number
    pulse: number

    constructor(
        id: string,
        name: string,
        type: string,
        tags: string[],
        questions: Question[],
        intervals: Interval[],
        uniqueTo: Performer,
        slugs: string,
        intensity: number,
        watt: number,
        speed: number,
        pulse: number) {

        super(id, name, type, tags, questions, intervals)
        this.uniqueTo = uniqueTo,
        this.slugs = slugs,
        this.intensity = intensity,
        this.watt = watt,
        this.speed = speed,
        this.pulse = pulse
    }
}