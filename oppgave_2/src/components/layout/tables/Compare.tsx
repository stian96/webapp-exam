import { useEffect, useRef, useState } from "react"

import { SessionActivityDto } from "@/types/sessionActivity"
import Activity from "./Activity"
import Filters from "./Filters"

import "@/style/compare.scss"

type CompareProps = {
  performerId: string
}

const Compare = ({ performerId }: CompareProps) => {
  const isApiCalled = useRef(false)
  const [activityResults, setActivityResults] = useState<SessionActivityDto[]>(
    [],
  )

  const removeActivityById = (activityId: string) => {
    const updatedResults = activityResults.filter(
      (obj) => obj.id !== activityId,
    )
    setActivityResults(updatedResults)
  }

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

    setActivityResults((prevState) => [...prevState, ...activityList])
  }

  const deleteActivity = async (activityId: string) => {
    try {
      const response = await fetch(
        `/api/sessions/deleteSessionById/${activityId}`,
        {
          method: "delete",
        },
      )

      const data = await response.json()
      const isSuccess = data.status
      const message = data.message

      if (isSuccess == 200) {
        console.log(`Session with id ${activityId} deleted.`)
        removeActivityById(activityId)
        return { success: true, message: `${activityId} deleted.` }
      } else {
        console.log(`Session with id ${activityId} does not exist.`)
        return {
          success: false,
          message: `Session with id ${activityId} does not exist.`,
        }
      }
    } catch (error) {
      return { success: false, message: error }
    }
  }

  const handleDelete = async (activityId: string) => {
    await deleteActivity(activityId)
  }

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
            <Filters />
          </td>
        </tr>
        <tr className="activity-table">
          <td className="mb-5">
            {activityResults.map((activity, index) => (
              <Activity
                key={index}
                id={activity.id}
                handleDelete={handleDelete}
              />
            ))}
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default Compare
