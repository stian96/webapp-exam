import React, { useEffect, useRef, useState } from "react"

import useAnalysisHook from "@/hooks/useAnalysisHook"
import { IntervalResultAnalysis } from "@/types/performance/intervalResult"
import Compare from "./Compare"
import GoalsRow from "./GoalsRow"

type IntervalResultsSummaryProps = {
  intervalAverages: number[]
  filteredColumns: number[]
  colNames: string[]
}

const IntervalResultsSummary = ({
  intervalAverages,
  filteredColumns,
  colNames,
}: IntervalResultsSummaryProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="text-white">
          <tr>
            <th>Averages</th>
            {colNames.map((name, index) => (
              <th
                key={name}
                className={`${filteredColumns.includes(index) && "hidden"}`}
              >
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-white">
          <tr>
            <td></td>
            {intervalAverages.map((averageVal, index) => (
              <td
                key={averageVal + index}
                className={`${filteredColumns.includes(index) && "hidden"}`}
              >
                {averageVal}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default IntervalResultsSummary
