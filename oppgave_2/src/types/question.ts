export type Question = {
    id: string,
    question: string,
    // TODO: Add 'QuestionTypeEnum'.
}

export enum QuestionTypeEnum {
    TEXT = "text",
    RADIO_NUMBER = "radio:range",
    RADIO_EMOJI = "radio:mood",
  }