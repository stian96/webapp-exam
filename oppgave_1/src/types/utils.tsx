import {type Stats} from '@/types'

export const calculateTotalScore = (scores: Stats) => {
  return Object.values(scores).reduce((total, score) => total + score.correct, 0);
};



export const findWeakness = (scores: Stats): string => {
  const operationTranslations: Record<string, string> = {
      add: 'addisjon',
      subtract: 'subtraksjon',
      multiply: 'multiplikasjon',
      divide: 'divisjon'
  };

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

  if (maxIncorrect === 0) {
      return "None";
  }

  return operationTranslations[maxIncorrectOperation] || maxIncorrectOperation;
};


