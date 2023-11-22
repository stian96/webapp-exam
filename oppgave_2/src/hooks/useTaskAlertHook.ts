import { IntervalResultAnalysis } from "@/types/performance/intervalResult";
import { useRef, useState } from "react";

const useTaskAlertHook = () => {

  
  const [isTaskAlertShown, setIsTaskAlertShown] = useState(false)
  const [activityResults, setActivityResults] = useState<SessionActivityDto[]>(
    [],
  )

  const toggleIsTaskAlertShown = () => {
    setIsTaskAlertShown(!isTaskAlertShown)
  }

  const deserialiseActivityResultResponse = (responseMessage: string) => {
    const activity: SessionActivityDto = JSON.parse(responseMessage)

    console.log(activity)
    setActivityResults(activity)
  }

  const getActivities = async () => {
    try {
      const response = await fetch(
        `/api/sessions/getSessionActivitiesWithReportDue`,
        {
          method: "get",
        },
      )

      const data = await response.json()
      const isSuccess = data.status
      const message = data.message

      if (isSuccess == 200) {
        deserialiseActivityResultResponse(message)

        console.log(`Activities that require a report filling out exist.`)
        return {
          success: true,
          message: `Activities that require a report filling out exist.`,
        }
      } else {
        console.log(
          `Activities that require a report filling out do not exist.`,
        )
        return {
          success: false,
          message: `Activities that require a report filling out do not exist.`,
        }
      }
    } catch (error) {
      return { success: false, message: error }
    }
  }

  return { 
    activityResults,
    getActivities,
    toggleIsTaskAlertShown, 
    isTaskAlertShown
    };
};

export default useTaskAlertHook;