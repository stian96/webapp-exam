import { calculateTotalScore, findWeakness } from '@/types/utils';
import { type Stats } from '@/types/index'

type ResultsDisplayProps = {
  scores: Stats;
};

const ResultsDisplay = ({ scores }: ResultsDisplayProps) => {

  const totalScore = calculateTotalScore(scores);
  const weakness = findWeakness(scores);

  return (
    <div>
      <p>Samlet poengsum: {totalScore}</p>
      {weakness !== "None" && <p>Du bør øve mer på: {weakness}</p>}
    </div>
  )
}

export default ResultsDisplay

