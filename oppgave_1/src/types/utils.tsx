import {type Stats} from '@/types'

export const calculateTotalScore = (scores: Stats) => {
  return Object.values(scores).reduce((total, score) => total + score.correct, 0);
};


//source chatGpt
export const findWeakness = (scores: Stats) => {

  const detailedScores = Object.entries(scores).map(([operation, score]) => ({
    operation,
    correct: score.correct,
    incorrect: score.incorrect,
    totalAttempts: score.correct + score.incorrect,
    ratio: score.correct / (score.correct + score.incorrect)
  }));

  
  let maxIncorrect = -1;
  let maxIncorrectOperation = '';

 
  detailedScores.forEach(score => {
    if (score.incorrect > maxIncorrect) {
      maxIncorrect = score.incorrect;
      maxIncorrectOperation = score.operation;
    }
  });

  
  return maxIncorrectOperation;
};
