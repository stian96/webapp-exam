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
      <table className="analysisTable min-w-full">
        <thead className="analysisTable__head">
          <tr>
            <th className="analysisTable__head-data">Averages</th>
            {colNames.map((name, index) => (
              <th
                key={name}
                className={`analysisTable__head-data ${
                  filteredColumns.includes(index) && "hidden"
                }`}
              >
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="analysisTable__body">
          <tr>
            <td className="analysisTable__body-data"></td>
            {intervalAverages.map((averageVal, index) => (
              <td
                key={averageVal + index}
                className={`analysisTable__body-data ${
                  filteredColumns.includes(index) && "hidden"
                }`}
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
