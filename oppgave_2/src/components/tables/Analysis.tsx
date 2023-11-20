import { useEffect, useRef, useState } from "react"

import useAnalysisHook from "@/hooks/useAnalysisHook"
import {
  IntervalResult,
  IntervalResultAnalysis,
} from "@/types/performance/intervalResult"
import IntervalResults from "./IntervalResults"
import IntervalResultsSummary from "./IntervalResultsSummary"

type AnalysisProps = {
  activityIds: string[]
}

//TODO API -> sessionactivity with report -> get report -> get many reportintervalresult -> get one interval for each many
//TODO Change dashboard to only make checkbox selectable on sessions with reports
//TODO Make table of all columns
//TODO Make table of averages
//TODO Make functionality to show/hide columns in table and tableaverage

const dummyReports: string[] = [
  "c94b0bf6-44fd-4e19-a9d9-25150b91d7fc",
  "1b8669e4-92a6-4d56-b14b-023c9bec158d",
]

const Analysis = ({ activityIds }: AnalysisProps) => {
  const {
    intervalResults,
    averageValues,
    filteredColumns,
    isApiPopulated,
    colNames,
    toggleFilteredColumn,
    resetColumns,
    calculateColumnStats,
    populateIntervalResults,
  } = useAnalysisHook()

  const isApiCalled = useRef(false)

  useEffect(() => {
    if (!isApiCalled.current) {
      isApiCalled.current = true
      return
    }

    void populateIntervalResults(activityIds)
  }, [activityIds])

  useEffect(() => {
    calculateColumnStats()
  }, [intervalResults])

  if (!isApiPopulated.current) {
    return null
  }

  return (
    <div>
      <p className="text-white">selectedActivities</p>
      {activityIds.map((id, index) => (
        <li key={index} className="text-white">
          {"Activity " + (index + 1) + ": " + id}
        </li>
      ))}
      <button
        className="bg-orange-500 text-white"
        onClick={() => {
          resetColumns()
        }}
      >
        Reset Columns
      </button>
      <IntervalResults
        intervalList={intervalResults}
        filteredColumns={filteredColumns}
        toggleFilteredColumn={toggleFilteredColumn}
        colNames={colNames}
      />
      ;
      <br />
      <br />
      <br />
      <IntervalResultsSummary
        intervalAverages={averageValues}
        filteredColumns={filteredColumns}
        colNames={colNames}
      />
      ;
    </div>
  )
}

export default Analysis
