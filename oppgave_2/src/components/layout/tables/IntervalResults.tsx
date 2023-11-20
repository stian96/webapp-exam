import React from "react"

import { type IntervalResultAnalysis } from "@/types/performance/intervalResult"

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
  return (
    <div className="overflow-x-auto">
      <table className="table min-w-full">
        <thead className="table__head">
          <tr>
            <th className="table__head-data">Activity ID</th>
            {colNames.map((name, index) => (
              <th
                className={`table__head-data ${
                  filteredColumns.includes(index) && "hidden"
                }`}
                key={name}
              >
                <span className="flex items-center space-x-2">
                  <span>{name}</span>
                  <button
                    className={`table__body-button text-white ${
                      filteredColumns.includes(index) && "hidden"
                    }`}
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
        <tbody className="table__body">
          {intervalList.map((interval, index) => (
            <tr key={index}>
              <td className="table__body-id line-clamp-2">
                {interval.activityId}
              </td>
              <td
                className={`table__body-data ${
                  filteredColumns.includes(0) && "hidden"
                }`}
              >
                {interval.intensity.min}
              </td>
              <td
                className={`table__body-data ${
                  filteredColumns.includes(1) && "hidden"
                }`}
              >
                {interval.intensity.max}
              </td>
              <td
                className={`table__body-data ${
                  filteredColumns.includes(2) && "hidden"
                }`}
              >
                {interval.intensity.average}
              </td>
              <td
                className={`table__body-data ${
                  filteredColumns.includes(3) && "hidden"
                }`}
              >
                {interval.pulse.min}
              </td>
              <td
                className={`table__body-data ${
                  filteredColumns.includes(4) && "hidden"
                }`}
              >
                {interval.pulse.max}
              </td>
              <td
                className={`table__body-data ${
                  filteredColumns.includes(5) && "hidden"
                }`}
              >
                {interval.pulse.average}
              </td>
              <td
                className={`table__body-data ${
                  filteredColumns.includes(6) && "hidden"
                }`}
              >
                {interval.speed.min}
              </td>
              <td
                className={`table__body-data ${
                  filteredColumns.includes(7) && "hidden"
                }`}
              >
                {interval.speed.max}
              </td>
              <td
                className={`table__body-data ${
                  filteredColumns.includes(8) && "hidden"
                }`}
              >
                {interval.speed.average}
              </td>
              <td
                className={`table__body-data ${
                  filteredColumns.includes(9) && "hidden"
                }`}
              >
                {interval.watt.min}
              </td>
              <td
                className={`table__body-data ${
                  filteredColumns.includes(10) && "hidden"
                }`}
              >
                {interval.watt.max}
              </td>
              <td
                className={`table__body-data ${
                  filteredColumns.includes(11) && "hidden"
                }`}
              >
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
