import React, { useEffect, useRef, useState } from "react"

import { IntervalResultAnalysis } from "@/types/performance/intervalResult"
import Compare from "./Compare"
import GoalsRow from "./GoalsRow"

type IntervalResultsSummaryProps = {
  intervalList: IntervalResultAnalysis[]
  filteredColumns: number[]
}

const IntervalResultsSummary = ({
  intervalList,
  filteredColumns,
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
            <th className={`${filteredColumns.includes(0) && "hidden"}`}>
              Intensity Min
            </th>
            <th className={`${filteredColumns.includes(1) && "hidden"}`}>
              Intensity Max
            </th>
            <th className={`${filteredColumns.includes(2) && "hidden"}`}>
              Intensity Avg
            </th>
            <th className={`${filteredColumns.includes(3) && "hidden"}`}>
              Pulse Min
            </th>
            <th className={`${filteredColumns.includes(4) && "hidden"}`}>
              Pulse Max
            </th>
            <th className={`${filteredColumns.includes(5) && "hidden"}`}>
              Pulse Avg
            </th>
            <th className={`${filteredColumns.includes(6) && "hidden"}`}>
              Speed Min
            </th>
            <th className={`${filteredColumns.includes(7) && "hidden"}`}>
              Speed Max
            </th>
            <th className={`${filteredColumns.includes(8) && "hidden"}`}>
              Speed Avg
            </th>
            <th className={`${filteredColumns.includes(9) && "hidden"}`}>
              Watt Min
            </th>
            <th className={`${filteredColumns.includes(10) && "hidden"}`}>
              Watt Max
            </th>
            <th className={`${filteredColumns.includes(11) && "hidden"}`}>
              Watt Avg
            </th>
          </tr>
        </thead>
        <tbody className="text-white">
          <tr>
            <td></td>
            {averageValues.map((averageVal, index) => (
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
