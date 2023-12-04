"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

import "@/style/button.scss"

import { SessionActivity, SessionActivityDto } from "@/types/sessionActivity"
import ReportListCard from "./ReportListCard"

type ActivityListProps = {
  performerId: string
}

const ActivityList = ({ performerId }: ActivityListProps) => {
  const isApiCalled = useRef(false)
  const [activityResults, setActivityResults] = useState<SessionActivityDto[]>(
    [],
  )

  const getActivities = async (performerId: string) => {
    try {
      const response = await fetch(
        `/api/sessions/getSessionActivitiesByPerformer/${performerId}`,
        {
          method: "get",
        },
      )

      const data = await response.json()
      const isSuccess = data.status
      const message = data.message

      if (isSuccess == 200) {
        deserialiseActivityResultsResponse(message)

        console.log(`Results for ${performerId} exists.`)
        return { success: true, message: `${performerId} exists.` }
      } else {
        console.log(`Results for ${performerId} do not exist.`)
        return {
          success: false,
          message: `Results for ${performerId} do not exist.`,
        }
      }
    } catch (error) {
      return { success: false, message: error }
    }
  }

  const deserialiseActivityResultsResponse = (responseMessage: string) => {
    const activityList: SessionActivityDto[] = JSON.parse(responseMessage)

    const filteredActivityList = activityList.filter(
      (activity) => activity.report !== null,
    )

    setActivityResults((prevState) => [...prevState, ...filteredActivityList])
  }

  useEffect(() => {
    if (!isApiCalled.current) {
      isApiCalled.current = true
      return
    }

    void getActivities(performerId)
  }, [])

  return (
    <div className="mt-24">
      {activityResults.map((activity, index) => (
        <div key={activity.id}>
          <ReportListCard activity={activity} />
          <br />
        </div>
      ))}
    </div>
  )
}

export default ActivityList
