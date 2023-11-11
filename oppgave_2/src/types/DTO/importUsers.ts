
export type IntervalDto = {
    id: string
    duration: number
    intensity: number
  }
  
export type QuestionDto = {
    id: string
    question: string
    type: string
  }
  
export type ActivityDto = {
    date: string
    name?: string
    tags?: string[]
    goalId?: string
    questions?: QuestionDto[]
    intervals: IntervalDto[]
  }
  
export type MetaDto = {
    heartrate: number
    watt: number
    speed: number
  }

export type PerformerDto = {
    id: string
    userId: string
    gender: string
    sport: string
    meta: MetaDto
    activities: ActivityDto[]
  }