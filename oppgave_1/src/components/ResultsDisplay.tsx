import { useState } from "react";
import { calculateTotalScore, findWeakness } from '@/types/utils';
import {type Stats} from '@/types/index'

type ResultsDisplayProps = {
  scores: Stats;
};



export default function ResultsDisplay({ scores }: ResultsDisplayProps) {

  const totalScore = calculateTotalScore(scores);
  const weakness = findWeakness(scores);

  console.log(totalScore)

  console.log(weakness)

  return (
    <div>
      <p>Total Score: {totalScore}</p>
      <p>Need more practice in: {weakness}</p>
    </div>
  )



}

