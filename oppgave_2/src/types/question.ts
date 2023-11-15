import { QuestionTypeEnum } from "@/enums/questionTypeEnum"

export type Question = {
    id?: string,
    question: string,
    type: QuestionTypeEnum
}