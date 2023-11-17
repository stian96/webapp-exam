import { useEffect } from "react"

type AnalysisProps = {
  activityIds: string[]
}

//TODO Make component with props
//TODO API -> sessionactivity with report -> get report -> get many reportintervalresult -> get one interval for each many
//TODO Make API request to get sessionActivity where report exists
//TODO Make API request to get report of session activity
//TODO Make API request to get intervalResults of activity
//TODO Change dashboard to only make checkbox selectable on sessions with reports
//TODO Make table of all columns
//TODO Make table of averages
//TODO Make functionality to show/hide columns in table and tableaverage
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
      const isSuccess = data.success

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

  useEffect(() => {
    for (const id of activityIds) {
      void isReportExists(id)
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
