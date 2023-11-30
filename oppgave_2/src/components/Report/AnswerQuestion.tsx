"use client"

import "@/style/report.scss";
import React, { useState, useEffect } from 'react';
import { type Question, getQuestionTypeEnum } from "@/types/question";
import { QuestionTypeEnum } from "@/enums/questionTypeEnum";
import { EmojiEnum } from "@/enums/emojiEnum";

type AnswerProps = {
    reportId: string;
    onAnswerChange: (questionId: string, answerValue: string | number | boolean) => void;
    questions: Question[]

};

const AnswerQuestion = ({ reportId, onAnswerChange, questions }: AnswerProps) => {
  const [answers, setAnswers] = useState<Record<string, string | number | boolean >>({});
  console.log("Questions received in AnswerQuestion:", questions);

    useEffect(() => {

      console.log("AnswerQuestion - useEffect - questions:", questions);
        
        const initialAnswers: Record<string, string | number | boolean> = {};

        questions.forEach((question) => {
            if (question.id) {
                initialAnswers[question.id] = ''; 
            }
        });
        console.log("Initial Answers:", initialAnswers);
        setAnswers(initialAnswers);
      }, [questions]);


      const handleAnswerChange = (questionId: string, value: string | number | boolean) => {
        if (questionId) { 
            setAnswers(prev => ({ ...prev, [questionId]: value }));
            onAnswerChange(questionId, value);
            console.log("answer is:", value)
        }
    };

    const emojiMapping = {
      [EmojiEnum.POOR]: "Poor",   
      [EmojiEnum.NORMAL]: "Normal", 
      [EmojiEnum.BETTER]: "Better"  
  };
  


    
    const renderInputField = (question: Question) => {
      console.log("Rendering input for question:", question);
      const inputId = `question-${question.id}-${reportId}`;
      switch (question.type) {
          case QuestionTypeEnum.TEXT: {
              return (
                  <input
                      id={inputId}
                      type="text"
                      value={answers[question.id ?? ''] as string}
                      onChange={(e) => {handleAnswerChange(question.id ?? '', e.target.value)}}
                      className="input-field"
                  />
              )}
              case QuestionTypeEnum.RADIO_EMOJI:{
                return (
                  <div>
                    {Object.entries(emojiMapping).map(([key, text]) => (
                            <label key={key}>
                                <input
                                    type="radio"
                                    name={inputId}
                                    value={key}
                                    checked={answers[question.id ?? ''] === key}
                                    onChange={(e) => {handleAnswerChange(question.id ?? '', key)}}
                                />
                                {text}
                            </label>
                        ))}
              </div>
          );
                } 

              case QuestionTypeEnum.RADIO_NUMBER:{
                const numberOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                return (
                    <div>
                        {numberOptions.map((num) => (
                            <label key={num}>
                                <input
                                    type="radio"
                                    name={inputId}
                                    value={num}
                                    checked={answers[question.id ?? ''] === num}
                                    onChange={(e) => {handleAnswerChange(question.id ?? '', num)}}
                                />
                                {num}
                            </label>
                        ))}
                    </div>
                  )}

                
            
              default: {
                  return <div>Unsupported question type</div>;
                }
              }
      };

     


    return (

      <div className="flex flex-col max-w-md mx-auto">
      <h3 className="font-semibold text-center">Session Questions</h3>
      <div className="flex flex-col mb-4 w-full">
          {questions.map((item) =>{
            const question = item.question
              return question.id ? (
                  <div key={question.id}>
                      <label htmlFor={`question-${question.id}-${reportId}`} className="mb-1">
                          {question.question}
                      </label>
                      {renderInputField(question)}
                  </div>
              ) : null
              })}
      </div>
  </div>
);
               
};

export default AnswerQuestion;
