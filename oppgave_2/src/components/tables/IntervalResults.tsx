import React from "react"

import { IntervalResultAnalysis } from "@/types/performance/intervalResult"
import Compare from "./Compare"
import GoalsRow from "./GoalsRow"

type IntervalResultsProps = {
  intervalList: IntervalResultAnalysis[]
  filteredColumns: number[]
  toggleFilteredColumn: (colNumber: number) => void
  colNames: string[]
}

const IntervalResults = ({
  intervalList,
  filteredColumns,
  toggleFilteredColumn,
  colNames,
}: IntervalResultsProps) => {
  if (!intervalList) {
    return null
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="text-white">
          <tr>
            <th>Activity ID</th>
            {colNames.map((name, index) => (
              <th key={name}>
                <span
                  className={`${filteredColumns.includes(index) && "hidden"}`}
                >
                  {name}
                  <button
                    className={`${filteredColumns.includes(index) && "hidden"}`}
                    onClick={() => {
                      toggleFilteredColumn(index)
                    }}
                  >
                    X
                  </button>
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-white">
          {intervalList.map((interval, index) => (
            <tr key={index}>
              <td>{interval.activityId}</td>
              <td className={`${filteredColumns.includes(0) && "hidden"}`}>
                {interval.intensity.min}
              </td>
              <td className={`${filteredColumns.includes(1) && "hidden"}`}>
                {interval.intensity.max}
              </td>
              <td className={`${filteredColumns.includes(2) && "hidden"}`}>
                {interval.intensity.average}
              </td>
              <td className={`${filteredColumns.includes(3) && "hidden"}`}>
                {interval.pulse.min}
              </td>
              <td className={`${filteredColumns.includes(4) && "hidden"}`}>
                {interval.pulse.max}
              </td>
              <td className={`${filteredColumns.includes(5) && "hidden"}`}>
                {interval.pulse.average}
              </td>
              <td className={`${filteredColumns.includes(6) && "hidden"}`}>
                {interval.speed.min}
              </td>
              <td className={`${filteredColumns.includes(7) && "hidden"}`}>
                {interval.speed.max}
              </td>
              <td className={`${filteredColumns.includes(8) && "hidden"}`}>
                {interval.speed.average}
              </td>
              <td className={`${filteredColumns.includes(9) && "hidden"}`}>
                {interval.watt.min}
              </td>
              <td className={`${filteredColumns.includes(10) && "hidden"}`}>
                {interval.watt.max}
              </td>
              <td className={`${filteredColumns.includes(11) && "hidden"}`}>
                {interval.watt.average}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default IntervalResults
