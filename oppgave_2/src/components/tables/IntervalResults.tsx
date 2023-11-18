import React from "react"

import { IntervalResultAnalysis } from "@/types/performance/intervalResult"
import Compare from "./Compare"
import GoalsRow from "./GoalsRow"

type IntervalResultsProps = {
  intervalList: IntervalResultAnalysis[]
  filteredColumns: number[]
  toggleFilteredColumn: (colNumber: number) => void
}

const IntervalResults = ({
  intervalList,
  filteredColumns,
  toggleFilteredColumn,
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
            <th className={`${filteredColumns.includes(0) && "hidden"}`}>
              Intensity Min
            </th>
            <button
              className={`${filteredColumns.includes(0) && "hidden"}`}
              onClick={() => {
                toggleFilteredColumn(0)
              }}
            >
              X
            </button>
            <th className={`${filteredColumns.includes(1) && "hidden"}`}>
              Intensity Max
            </th>
            <button
              className={`${filteredColumns.includes(1) && "hidden"}`}
              onClick={() => {
                toggleFilteredColumn(1)
              }}
            >
              X
            </button>
            <th className={`${filteredColumns.includes(2) && "hidden"}`}>
              Intensity Avg
            </th>
            <button
              className={`${filteredColumns.includes(2) && "hidden"}`}
              onClick={() => {
                toggleFilteredColumn(2)
              }}
            >
              X
            </button>
            <th className={`${filteredColumns.includes(3) && "hidden"}`}>
              Pulse Min
            </th>
            <button
              className={`${filteredColumns.includes(3) && "hidden"}`}
              onClick={() => {
                toggleFilteredColumn(3)
              }}
            >
              X
            </button>
            <th className={`${filteredColumns.includes(4) && "hidden"}`}>
              Pulse Max
            </th>
            <button
              className={`${filteredColumns.includes(4) && "hidden"}`}
              onClick={() => {
                toggleFilteredColumn(4)
              }}
            >
              X
            </button>
            <th className={`${filteredColumns.includes(5) && "hidden"}`}>
              Pulse Avg
            </th>
            <button
              className={`${filteredColumns.includes(5) && "hidden"}`}
              onClick={() => {
                toggleFilteredColumn(5)
              }}
            >
              X
            </button>
            <th className={`${filteredColumns.includes(6) && "hidden"}`}>
              Speed Min
            </th>
            <button
              className={`${filteredColumns.includes(6) && "hidden"}`}
              onClick={() => {
                toggleFilteredColumn(6)
              }}
            >
              X
            </button>
            <th className={`${filteredColumns.includes(7) && "hidden"}`}>
              Speed Max
            </th>
            <button
              className={`${filteredColumns.includes(7) && "hidden"}`}
              onClick={() => {
                toggleFilteredColumn(7)
              }}
            >
              X
            </button>
            <th className={`${filteredColumns.includes(8) && "hidden"}`}>
              Speed Avg
            </th>
            <button
              className={`${filteredColumns.includes(8) && "hidden"}`}
              onClick={() => {
                toggleFilteredColumn(8)
              }}
            >
              X
            </button>
            <th className={`${filteredColumns.includes(9) && "hidden"}`}>
              Watt Min
            </th>
            <button
              className={`${filteredColumns.includes(9) && "hidden"}`}
              onClick={() => {
                toggleFilteredColumn(9)
              }}
            >
              X
            </button>
            <th className={`${filteredColumns.includes(10) && "hidden"}`}>
              Watt Max
            </th>
            <button
              className={`${filteredColumns.includes(10) && "hidden"}`}
              onClick={() => {
                toggleFilteredColumn(10)
              }}
            >
              X
            </button>
            <th className={`${filteredColumns.includes(11) && "hidden"}`}>
              Watt Avg
            </th>
            <button
              className={`${filteredColumns.includes(11) && "hidden"}`}
              onClick={() => {
                toggleFilteredColumn(11)
              }}
            >
              X
            </button>
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
