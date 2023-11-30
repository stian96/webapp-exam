"use client"
import "@/style/card.scss"
import "@/style/report.scss"
import { Icons } from "@/components/icons"
import React, { useState, useEffect } from 'react';
import AnswerQuestion from "@/components/Report/AnswerQuestion";
import Comment from "./Comment";
import ReportIntervals from "@/components/Report/ReportIntervals";
import { SessionStatusEnum } from "@/enums/sessionStatusEnum";
import { type Question } from "@/types/question";
import { type ReportIntervalResult } from "@/types/performance/intervalResult";
import { type Interval } from "@/types/performance/interval";
import { error } from "console";

type ReportCardProps = {
    id: string;
};

const ReportCard = ({ id }: ReportCardProps) => {
    const [status, setStatus] = useState<string>('');

    const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);
    const [sessionId, setSessionId] = useState<string>('');

    const [intervals, setIntervals] = useState<Interval[]>([]);
    const [intervalData, setIntervalData] = useState<ReportIntervalResult[]>([]);

    const handleIntervalDataChange = (newData: ReportIntervalResult[]) => {
      setIntervalData(newData);
    };
  




    const handleChangeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(event.target.value);
    }

    const [answers, setAnswers] = useState<Record<string, string | number | boolean>>({});

    
    const handleAnswerChange = (questionId: string, answerValue: string | number | boolean) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: answerValue
        }));
    };

    const getStatusString = (statusEnumValue: SessionStatusEnum): string => {
      switch (statusEnumValue) {
        case SessionStatusEnum.NO:
          return 'Session not completed';
        case SessionStatusEnum.LOW:
          return 'Session completed, but with poor quality';
        case SessionStatusEnum.NORMAL:
          return 'Session completed as expected';
        case SessionStatusEnum.HIGH:
          return 'Break-through session';
        default:
          return 'Unknown';
      }
    }


    useEffect(() => {
      const fetchSessionActivity = async () => {
        try {
          const response = await fetch(`/api/sessions/getSessionById/${id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
    
          console.log("data from fetchSessionActivity", data);
          if (data.status === 200) {
            
            const activityData = JSON.parse(data.message);
    
            console.log("activityData", activityData);
            console.log("Extracted sessionId:", activityData.sessionId);
            setSessionId(activityData.sessionId);
          } else {
            // Handle non-200 responses
          }
        } catch (error) {
          console.error("Error fetching session activity:", error);
          // Handle error
        }
      };
    
      if (id) {
        fetchSessionActivity().catch(error => {
          console.error("Error in fetchSessionActivity:", error);
        });
      }
    }, [id]);
    
    useEffect(() => {
      
      if (sessionId) {
        const fetchSessionQuestions = async () => {
          try {
            console.log("Current sessionId in useEffect:", sessionId);
    
            const response = await fetch(`/api/questions/getSessionQuestion?sessionId=${sessionId}`);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const responseData = await response.json();
            const questions = JSON.parse(responseData.message);
    
            console.log("api", questions);
            console.log("length", questions.length)
    
            setSessionQuestions(questions as Question[]);

           
          } catch (error) {
            console.error("Failed to fetch questions:", error);
          }
        };
    
        fetchSessionQuestions().catch(error => {
          console.error("Error in fetchSessionQuestions:", error);
        });
      }
    }, [sessionId]);
    
    useEffect(() =>{

      if(sessionId){
      const fetchIntervals = async () => {

        try{
          console.log(" current sessionId in useEffect for intervals:", sessionId)

          const response = await fetch(`/api/sessions/getSessionIntervals?sessionId=${sessionId}`)
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const responseData = await response.json();
          const intervals = JSON.parse(responseData.message);

          console.log("fetch intervas intervals:", intervals)
          console.log("intervals lenght", intervals.length)

          setIntervals(intervals as Interval[])
          

        }catch ( error){
          console.log("failed to fetch intervals", error)
        }
      }

      fetchIntervals().catch(error => {
        console.error("Error in fetchIntervals:", error)
      })

    }}, [sessionId])

    console.log("answer in parent:", answers)

    return (
        <div className="card relative">

            <div className="card__header">
                <Icons.clipboard size={22} />
                <p className="card__title">Report {id}</p>
            </div>

            <div className="text-center mb-4">
                <label htmlFor={`status-select-${id}`} className="font-semibold block mb-2">Select report status: </label>
                <select id={`status-select-${id}`} name={`status-${id}`} value={status} onChange={handleChangeStatus} className="rounded text-black">
                    <option value="">-- Please choose a status...--</option>
                    {Object.values(SessionStatusEnum).map((enumValue) => {
                    
                        const statusString = getStatusString(enumValue as SessionStatusEnum);
                        return (
                            <option key={enumValue} value={enumValue}>
                                {statusString}
                            </option>
                        );
                    })}
                </select>
            </div>
            {/*SRC: https://react.dev/reference/react-dom/components/select*/}

           {intervals.length > 0 && sessionId && (
            <ReportIntervals 
              sessionId= {id}
              onIntervalChange={handleIntervalDataChange}
              intervals={intervals}/>)}

            {sessionQuestions.length > 0 && sessionId && (
              <AnswerQuestion 
                  reportId={id} 
                  onAnswerChange={handleAnswerChange}
                  questions={sessionQuestions}
              />
)}
            <Comment reportId={id} />
            <button className="save-button" onClick={() => {
                //handleSave()
            }}>Save
            </button>
        </div>
    )

}
export default ReportCard;