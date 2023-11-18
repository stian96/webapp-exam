import { useEffect, useRef, useState } from "react"

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
  const [intervalResults, setIntervalResults] = useState<
    IntervalResultAnalysis[]
  >([])
  const isApiCalled = useRef(false)
  const isApiPopulated = useRef(false)

  const isReportExists = async (activityId: string) => {
    try {
      const response = await fetch(
        `/api/reports/getReportByActivityId/${activityId}`,
        {
          method: "get",
        },
      )

      const data = await response.json()
      const isSuccess = data.status
      const body = data.message

      if (isSuccess == 200) {
        console.log(`${activityId} exists.`)
        return { success: true, message: body }
      } else {
        console.log(`${activityId} does not exist.`)
        return { success: false, message: `${activityId} does not exist.` }
      }
    } catch (error) {
      return { success: false, message: error }
    }
  }

  const getIntervalResults = async (reportId: string, activityId: string) => {
    try {
      const response = await fetch(
        `/api/reports/getIntervalResultsByReportId/${reportId}`,
        {
          method: "get",
        },
      )

      const data = await response.json()
      const isSuccess = data.status
      const message = data.message

      if (isSuccess == 200) {
        await deserialiseIntervalResultsResponse(message, activityId)

        console.log(`Results for ${reportId} exists.`)
        return { success: true, message: `${reportId} exists.` }
      } else {
        console.log(`Results for ${reportId} do not exist.`)
        return {
          success: false,
          message: `Results for ${reportId} do not exist.`,
        }
      }
    } catch (error) {
      return { success: false, message: error }
    }
  }

  const populateIntervalResults = async (activityIdList: string[]) => {
    for (const activityId of activityIdList) {
      const { success, message } = await isReportExists(activityId)

      if (success) {
        const { id } = JSON.parse(message)

        await getIntervalResults(id, activityId)
      }
    }

    isApiPopulated.current = true
  }

  const deserialiseIntervalResultsResponse = async (
    responseMessage: string,
    activityId: string,
  ) => {
    const intervalList: IntervalResultAnalysis[] = JSON.parse(
      responseMessage,
    ).map((intervalResult: any) => ({
      id: intervalResult.id,
      activityId: activityId,
      interval: intervalResult.intervalId,
      duration: intervalResult.duration,
      intensity: {
        min: intervalResult.intensityMin,
        max: intervalResult.intensityMax,
        average: intervalResult.intensityAvg,
      },
      pulse: {
        min: intervalResult.pulseMin,
        max: intervalResult.pulseMax,
        average: intervalResult.pulseAvg,
      },
      speed: {
        min: intervalResult.speedMin,
        max: intervalResult.speedMax,
        average: intervalResult.speedAvg,
      },
      watt: {
        min: intervalResult.wattMin,
        max: intervalResult.wattMax,
        average: intervalResult.wattAvg,
      },
    }))

    setIntervalResults((prevState) => [...prevState, ...intervalList])
  }

  useEffect(() => {
    if (!isApiCalled.current) {
      isApiCalled.current = true
      return
    }

    void populateIntervalResults(activityIds)
  }, [activityIds])

  if (!isApiPopulated.current) {
    return null // or render loading state
  }

  return (
    <div>
      <p className="text-white">selectedActivities</p>
      {activityIds.map((id, index) => (
        <li key={index} className="text-white">
          {"Activity " + (index + 1) + ": " + id}
        </li>
      ))}
      <IntervalResults intervalList={intervalResults} />;
      <br />
      <br />
      <br />
      <IntervalResultsSummary intervalList={intervalResults} />;
    </div>
  )
}

export default Analysis
