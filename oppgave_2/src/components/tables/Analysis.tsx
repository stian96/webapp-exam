import { useEffect } from "react"

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

      if (isSuccess == 200) {
        console.log(`${activityId} exists.`)
        return { success: true, message: `${activityId} exists.` }
      } else {
        console.log(`${activityId} does not exist.`)
        return { success: false, message: `${activityId} does not exist.` }
      }
    } catch (error) {
      return { success: false, message: error }
    }
  }

  const getIntervalResults = async (reportId: string) => {
    try {
      const response = await fetch(
        `/api/reports/getIntervalResultsByReportId/${reportId}`,
        {
          method: "get",
        },
      )

      const data = await response.json()
      const isSuccess = data.status

      if (isSuccess == 200) {
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

  useEffect(() => {
    for (const id of activityIds) {
      void isReportExists(id)
    }

    for (const id of dummyReports) {
      void getIntervalResults(id)
    }
  }, [activityIds])

  return (
    <div>
      <p className="text-white">selectedActivities</p>
      {activityIds.map((id, index) => (
        <li key={index} className="text-white">
          {id}
        </li>
      ))}
    </div>
  )
}

export default Analysis
