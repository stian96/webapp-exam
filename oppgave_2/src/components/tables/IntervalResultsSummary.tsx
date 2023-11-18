import React, { useEffect, useRef, useState } from "react"

import { IntervalResultAnalysis } from "@/types/performance/intervalResult"
import Compare from "./Compare"
import GoalsRow from "./GoalsRow"

type IntervalResultsSummaryProps = {
  intervalList: IntervalResultAnalysis[]
}

const IntervalResultsSummary = ({
  intervalList,
}: IntervalResultsSummaryProps) => {
  const [averageValues, setAverageValues] = useState<number[]>([])
  const isUseEffectCalled = useRef(false)

  const pushNewValue = (newValue) => {
    setAverageValues((prevAverageValues) => [...prevAverageValues, newValue])
  }

  const calculateColumnStats = () => {
    const values = {
      intensityMin: [],
      intensityMax: [],
      intensityAvg: [],
      pulseMin: [],
      pulseMax: [],
      pulseAvg: [],
      speedMin: [],
      speedMax: [],
      speedAvg: [],
      wattMin: [],
      wattMax: [],
      wattAvg: [],
    }

    for (const interval of intervalList) {
      values["intensityMin"].push(interval.intensity.min)
      values["intensityMax"].push(interval.intensity.max)
      values["intensityAvg"].push(interval.intensity.average)
      values["pulseMin"].push(interval.pulse.min)
      values["pulseMax"].push(interval.pulse.max)
      values["pulseAvg"].push(interval.pulse.average)
      values["speedMin"].push(interval.speed.min)
      values["speedMax"].push(interval.speed.max)
      values["speedAvg"].push(interval.speed.average)
      values["wattMin"].push(interval.watt.min)
      values["wattMax"].push(interval.watt.max)
      values["wattAvg"].push(interval.watt.average)
    }

    Object.keys(values).forEach((key, index) => {
      const averageVal =
        values[key].reduce((sum, value) => sum + value, 0) / values[key].length

      pushNewValue(averageVal.toFixed(1))
    })
  }

  useEffect(() => {
    if (!isUseEffectCalled.current) {
      isUseEffectCalled.current = true
      return
    }

    calculateColumnStats()
  }, [])

  if (!intervalList) {
    return null
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="text-white">
          <tr>
            <th>Averages</th>
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
          <tr>
            <td></td>
            {averageValues.map((averageVal, index) => (
              <td key={averageVal + index}>{averageVal}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default IntervalResultsSummary
