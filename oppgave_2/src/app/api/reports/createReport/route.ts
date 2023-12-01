import { type Report } from '@/types/report';
import { prisma } from "@/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";


export const POST = async (request: NextRequest) => {
  try {

    await prisma.$transaction(async (prisma) =>{
    const data = await request.json();
    const report = data as Report; 

    console.log("Deserialized report", report);

    console.log("inserting report with sessionActivityId:", report.sessionActivityId)

   
    const newReport = await prisma.reports.create({
      data: {
        status: report.status,
        comments: report.comments,
        sessionActivityId: report.sessionActivityId
      },
    });

    const createdAnswers = await Promise.all(report.answers.map(async (answer) => {
      if(!answer.id){

        return await prisma.answers.create({
          data: {
            questionId: answer.questionId,
            answerText: answer.answerText,
            answerNumber: answer.answerNumber,
            answerEmoji: answer.answerEmoji
          },
        });
      } else {
        
        return answer;
      }
    }));

    const createdIntervalResults = await Promise.all(report.intervalResults.map(async (intervalResult) =>{

      if (!intervalResult.id) {
        return await prisma.intervalResults.create({
          data: {
            intervalId: intervalResult.intervalId,
            duration: intervalResult.duration,
            intensityMin: intervalResult.intensityMin,
            intensityMax: intervalResult.intensityMax,
            intensityAvg: intervalResult.intensityAvg,
            pulseMin: intervalResult.pulseMin,
            pulseMax: intervalResult.pulseMax,
            pulseAvg: intervalResult.pulseAvg,
            speedMin: intervalResult.speedMin,
            speedMax: intervalResult.speedMax,
            speedAvg: intervalResult.speedAvg,
            wattMin: intervalResult.wattMin,
            wattMax: intervalResult.wattMax,
            wattAvg: intervalResult.wattAvg
          },
        });
      } else {
        return intervalResult;
      }
    }));



   console.log("created answers", createdAnswers)
    
    for (const answer of createdAnswers) {
      if (!answer.id) {
        console.error("Missing answer ID for answer:", answer);
        
      } else {
        await prisma.reportAnswers.create({
          data: {
            reportId: newReport.id,
            answerId: answer.id,
          },
        });
      }
    }
    

      for(const intervalResult of createdIntervalResults){
        await prisma.reportIntervalResults.create({
          data:{
            reportId: newReport.id,
            intervalResultId: intervalResult.id
            
          }
        })
      }

      console.log("Report saved", newReport);

     } )

    

    
    return NextResponse.json({ status: 201, message: "Report saved successfully." });
  } catch (error) {
    console.error("Error in saving report:", error);

    
    return NextResponse.json({ status: 500, message: error });
  }
}