import { QuestionTypeEnum } from "@/enums/questionTypeEnum"

export type Question = {
    id?: string,
    question: string,
    type: QuestionTypeEnum
}

// A function to retrieve an enum from a string.
export const getQuestionTypeEnum = (string: string): QuestionTypeEnum | undefined => {
    const totalEnums = Object.values(QuestionTypeEnum);
  
    if (totalEnums.includes(string)) {
      return string as QuestionTypeEnum;
    }
  
    return undefined;
}
