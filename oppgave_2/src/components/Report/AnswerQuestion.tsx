"use client"

import "@/style/report.scss";
import React, { useState, useEffect } from 'react';
import { type Question, getQuestionTypeEnum } from "@/types/question";
import { QuestionTypeEnum } from "@/enums/questionTypeEnum";
import { EmojiEnum } from "@/enums/emojiEnum";
import { type Answer } from "@/types/answer";

type AnswerProps = {
    reportId: string;
    onAnswerChange: (questionId: string, answerValue: string | number, questionType: string ) => void;
    questions: Question[]

};

const AnswerQuestion = ({ reportId, onAnswerChange, questions }: AnswerProps) => {
  
  console.log("Questions received in AnswerQuestion:", questions);

  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
      const initialAnswers = questions.map(question => ({
          questionId: question.id ?? '',
          answerText: null,
          answerNumber: null,
          answerEmoji: null
      }));
  
      setAnswers(initialAnswers);
      console.log("initital answers", initialAnswers)
  }, [questions]);
  
  const handleAnswerChange = (questionId: string, value: string | number, questionType: string) => {
    onAnswerChange(questionId, value, questionType);
};



    const emojiMapping = {
      [EmojiEnum.POOR]: "Poor",   
      [EmojiEnum.NORMAL]: "Normal", 
      [EmojiEnum.BETTER]: "Better"  
  };
  


    
  const renderInputField = (question: Question) => {
    console.log("Rendering input for question:", question);
    const inputId = `question-${question.id}-${reportId}`;
    const currentAnswer = answers.find(a => a.questionId === question.id);

    switch (question.type) {
        case QuestionTypeEnum.TEXT:
            return (
                <input
                    id={inputId}
                    type="text"
                    value={ answers.find((a) => a.questionId === question.id)?.answerText}
                    onChange={(e) => {handleAnswerChange(question.id ?? '', e.target.value, QuestionTypeEnum.TEXT)}}
                    className="input-field"
                />
            );

        case QuestionTypeEnum.RADIO_EMOJI:
            return (
                <div>
                    {Object.entries(emojiMapping).map(([key, text]) => (
                        <label key={key}>
                            <input
                                type="radio"
                                name={inputId}
                                value={text}
                                checked={currentAnswer?.answerEmoji === key}
                                onChange={() => {handleAnswerChange(question.id ?? '', key, QuestionTypeEnum.RADIO_EMOJI)}}
                            />
                            {text}
                        </label>
                    ))}
                </div>
            );

        case QuestionTypeEnum.RADIO_NUMBER: {
            const numberOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            return (
                <div>
                    {numberOptions.map((num) => (
                        <label key={num}>
                            <input
                                type="radio"
                                name={inputId}
                                value={num}
                                checked={currentAnswer?.answerNumber === num}
                                onChange={() => {handleAnswerChange(question.id ?? '', num, QuestionTypeEnum.RADIO_NUMBER)}}
                            />
                            {num}
                        </label>
                    ))}
                </div>
            )}

        default:
            return <div>Unsupported question type</div>;
    }
};

     


return (
  <div className="flex flex-col max-w-md mx-auto">
  <h3 className="font-semibold text-center">Session Questions</h3>
      <form className="flex flex-col mb-4 w-full">
        {questions.map((item) => {
          const question = item.question;
          return question.id ? (
            <div key={question.id}>
              <label  className="mb-1">
                {question.question}
              </label>
              {renderInputField(question)}
            </div>
          ) : null;
        })}
      </form>
</div>
);

               
};

export default AnswerQuestion;
