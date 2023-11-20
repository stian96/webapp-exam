import { useEffect, useRef, useState } from "react"

import "@/style/analysisTable.scss"

import useAnalysisHook from "@/hooks/useAnalysisHook"
import IntervalResults from "./IntervalResults"
import IntervalResultsSummary from "./IntervalResultsSummary"

type AnalysisProps = {
  activityIds: string[]
}

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
      <br />
      <IntervalResults
        intervalList={intervalResults}
        filteredColumns={filteredColumns}
        toggleFilteredColumn={toggleFilteredColumn}
        colNames={colNames}
      />
      ;
      <IntervalResultsSummary
        intervalAverages={averageValues}
        filteredColumns={filteredColumns}
        colNames={colNames}
      />
      ;
      <button
        className={`table__outer-button fixed bottom-4 right-4 text-white ${
          filteredColumns.length === 0 ? "hidden" : ""
        }`}
        onClick={() => {
          resetColumns()
        }}
      >
        Reset Columns
      </button>
    </div>
  )
}

export default Analysis
