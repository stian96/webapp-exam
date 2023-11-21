import { Session } from "../classes/session"  
import { Performer } from "../performer"
import { Question } from "../question"
import { Interval } from "../performance/interval"

export class SessionTemplate extends Session {
    uniqueTo?: string | null
    slug: string
    intensity: number
    watt: number
    speed: number
    pulse: number
    date?: Date | null
    goalId?: string | null
    


    constructor(
        id: string,
        name: string,
        type: string,
        tags: string[],
        questions: Question[],
        intervals: Interval[],
        uniqueTo: string | null,
        slug: string,
        intensity: number,
        watt: number,
        speed: number,
        pulse: number,
        date: Date | null,
        goalId: string | null) {

        super(id, name, type, tags, questions, intervals)
        this.uniqueTo = uniqueTo,
        this.slug = slug,
        this.intensity = intensity,
        this.watt = watt,
        this.speed = speed,
        this.pulse = pulse
        this.date = date
        this.goalId = goalId
    }
}