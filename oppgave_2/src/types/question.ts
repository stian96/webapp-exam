export type Question = {
    id?: string,
    question: string,
    type: string
}

export enum QuestionTypeEnum {
    TEXT = "text",
    RADIO_NUMBER = "radio:range",
    RADIO_EMOJI = "radio:mood",
  }