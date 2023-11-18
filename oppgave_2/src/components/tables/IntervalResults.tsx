import React from "react"

import { IntervalResultAnalysis } from "@/types/performance/intervalResult"
import Compare from "./Compare"
import GoalsRow from "./GoalsRow"

type IntervalResultsProps = {
  intervalList: IntervalResultAnalysis[]
}

const IntervalResults = ({ intervalList }: IntervalResultsProps) => {
  if (!intervalList) {
    return null
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="text-white">
          <tr>
            <th>Activity ID</th>
            <th>Intensity Min</th>
            <th>Intensity Max</th>
            <th>Intensity Avg</th>
            <th>Pulse Min</th>
            <th>Pulse Max</th>
            <th>Pulse Avg</th>
            <th>Speed Min</th>
            <th>Speed Max</th>
            <th>Speed Avg</th>
            <th>Watt Min</th>
            <th>Watt Max</th>
            <th>Watt Avg</th>
          </tr>
        </thead>
        <tbody className="text-white">
          {intervalList.map((interval, index) => (
            <tr key={index}>
              <td>{interval.activityId}</td>
              <td>{interval.intensity.min}</td>
              <td>{interval.intensity.max}</td>
              <td>{interval.intensity.average}</td>
              <td>{interval.pulse.min}</td>
              <td>{interval.pulse.max}</td>
              <td>{interval.pulse.average}</td>
              <td>{interval.speed.min}</td>
              <td>{interval.speed.max}</td>
              <td>{interval.speed.average}</td>
              <td>{interval.watt.min}</td>
              <td>{interval.watt.max}</td>
              <td>{interval.watt.average}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default IntervalResults
