import { useEffect, useRef, useState } from "react"

import { SessionActivityDto } from "@/types/sessionActivity"
import Activity from "./Activity"
import Filters from "./Filters"

import "@/style/compare.scss"

import types from "next/types"

import useCompareHook from "@/hooks/useCompareHook"

type CompareProps = {
  performerId: string
}

const Compare = ({ performerId }: CompareProps) => {
  const {
    getActivities,
    tags,
    types,
    sortActivitiesByDateAsc,
    sortActivitiesByDateDesc,
    filterActivitiesByType,
    filterActivitiesByTag,
    filterActivitiesByReportStatus,
    resetResults,
    activityResults,
    handleDelete,
    duplicateActivity,
  } = useCompareHook()
  const isApiCalled = useRef(false)

  useEffect(() => {
    if (!isApiCalled.current) {
      isApiCalled.current = true
      return
    }

    void getActivities(performerId)
  }, [])

  return (
    <table className="compare">
      <tbody className="compare__body">
        <tr className="compare__body-row flex items-center justify-between">
          <td className="compare__body-data">Compare</td>
          <td className="compare__body-data filter-container flex items-center justify-end gap-8">
            <span>Filters</span>
            <Filters
              tags={tags}
              types={types}
              sortAsc={sortActivitiesByDateAsc}
              sortDesc={sortActivitiesByDateDesc}
              filterType={filterActivitiesByType}
              filterTag={filterActivitiesByTag}
              filterReport={filterActivitiesByReportStatus}
              resetResults={resetResults}
            />
          </td>
        </tr>
        <tr className="activity-table">
          <td className="mb-5">
            {activityResults.map((activity, index) => (
              <Activity
                key={index}
                id={activity.id}
                type={activity.session.type}
                hasReport={activity.report != null}
                handleDelete={handleDelete}
                handleDuplicate={duplicateActivity}
              />
            ))}
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default Compare
