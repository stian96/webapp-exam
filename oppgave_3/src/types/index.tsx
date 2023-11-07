type Meta = {
  createdAt?: Date
  updatedAt?: Date
}

export type Error = {
  message: string
  type?: string
  code?: number
}

export type Result<T, E = Error> =
  | { status: true; data?: T }
  | { status: false; error: E }

export type Question = {
  id: string
  question: string
  pollId: string
  options: Option[]
  votes?: Vote[]
} & Meta

export type Option = {
  option: string
}
export type Vote = {
  id: string
  option: string
  questionId: string
  createdAt: Date
}

export type Poll = {
  id: string
  title: string
  endedAt: Date | null
  publishedAt: Date | null
  questions?: Question[]
  slug: string
} & Meta

export type PollCreateInput = Pick<Poll, 'title' | 'slug'>
export type PollUpdateInput = Pick<Poll, 'title' | 'endedAt' | 'publishedAt'>
export type QuestionUpdateInput = Pick<
  Question,
  'question' | 'pollId' | 'options'
>
export type QuestionCreateInput = Pick<
  Question,
  'question' | 'pollId' | 'options'
>
export type VoteCreateInput = Pick<Vote, 'questionId' | 'option'>

export type ApiHandler<T> = (
  data: any,
  options?: Record<string, unknown>
) => Promise<Result<T | T[]>>
