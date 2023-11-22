
import "@/style/report.scss";
import React, { useState } from 'react';

type AnswrProps = {
    reportId: string;
};

const AnswerQuestion = ({ reportId }: AnswrProps) => {
    const [sessionQuestions, setSessionQuestions] = useState({
        sessionDemand: '',
        sleepQuality: '',
        restStatus: '',
        muscleSoreness: '',
        environmentImpact: '',
        stressLevel: '',
        workoutSentiment: ''
    });

    const handleSessionQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setSessionQuestions(prev => ({ ...prev, [name]: value }));
    };


    return (

        <div className="flex flex-col max-w-md mx-auto">
            <h3 className="font-semibold text-center">Session Questions</h3>
            <div className="flex flex-col mb-4 w-full">
                <label htmlFor={`Q1-${reportId}`} className="mb-1">How demanding was the session?</label>
                <input
                    id={`Q1-${reportId}`}
                    name={`Q1-${reportId}`}
                    type="text"
                    value={sessionQuestions.sessionDemand}
                    onChange={handleSessionQuestionChange}
                    className="input-field"
                />

                <label htmlFor={`Q2-${reportId}`} className="mb-1">How was the quality and duration of sleep before today's session?</label>
                <input
                    id={`Q2-${reportId}`}
                    name={`Q2-${reportId}`}
                    type="text"
                    value={sessionQuestions.sleepQuality}
                    onChange={handleSessionQuestionChange}
                    className="input-field"
                />

                <label htmlFor={`Q3-${reportId}`} className="mb-1">How well recovered were you before the session?</label>
                <input
                    id={`Q3-${reportId}`}
                    name={`Q3-${reportId}`}
                    type="text"
                    value={sessionQuestions.restStatus}
                    onChange={handleSessionQuestionChange}
                    className="input-field"
                />
                <label htmlFor={`Q4-${reportId}`} className="mb-1">Degree of muscle soreness?</label>
                <input
                    id={`Q4-${reportId}`}
                    name={`Q4-${reportId}`}
                    type="text"
                    value={sessionQuestions.muscleSoreness}
                    onChange={handleSessionQuestionChange}
                    className="input-field"
                />
                <label htmlFor={`Q5-${reportId}`} className="mb-1">How did the surroundings/terrain affect the execution of the session?</label>
                <input
                    id={`Q5-${reportId}`}
                    name={`Q5-${reportId}`}
                    type="text"
                    value={sessionQuestions.environmentImpact}
                    onChange={handleSessionQuestionChange}
                    className="input-field"
                />
                <label htmlFor={`Q6-${reportId}`} className="mb-1">How was the stress level before today's session?</label>
                <input
                    id={`Q6-${reportId}`}
                    name={`Q6-${reportId}`}
                    type="text"
                    value={sessionQuestions.stressLevel}
                    onChange={handleSessionQuestionChange}
                    className="input-field"
                />
                <label htmlFor={`Q7-${reportId}`} className="mb-1">How did the training feel?</label>
                <input
                    id={`Q7-${reportId}`}
                    name={`Q7-${reportId}`}
                    type="text"
                    value={sessionQuestions.workoutSentiment}
                    onChange={handleSessionQuestionChange}
                    className="input-field"
                />
            </div>
        </div>
    )
};

export default AnswerQuestion;
