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
      <table className="table min-w-full">
        <thead className="table__head">
          <tr>
            <th className="table__head-data">Averages</th>
            {colNames.map((name, index) => (
              <th
                key={name}
                className={`table__head-data ${
                  filteredColumns.includes(index) && "hidden"
                }`}
              >
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table__body">
          <tr>
            <td className="table__body-data"></td>
            {intervalAverages.map((averageVal, index) => (
              <td
                key={averageVal + index}
                className={`table__body-data ${
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
