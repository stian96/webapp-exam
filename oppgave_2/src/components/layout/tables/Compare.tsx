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
  const [originalActivityResults, setOriginalActivityResults] = useState<
    SessionActivityDto[]
  >([])
  const [activityResults, setActivityResults] = useState<SessionActivityDto[]>(
    [],
  )
  const [tags, setTags] = useState<string[]>([])
  const [types, setTypes] = useState<string[]>([])

  const resetResults = () => {
    setActivityResults(originalActivityResults)
  }

  const populateTags = (activities: SessionActivityDto[]) => {
    let tagList: string[] = []

    for (const activity of activities) {
      if (activity.session != null) {
        for (const tag of activity.session.sessionTags) {
          if (!tagList.includes(tag.tag)) {
            tagList.push(tag.tag)
          }
        }
      }
    }

    setTags(tagList)
  }

  const populateTypes = (activities: SessionActivityDto[]) => {
    let typeList: string[] = []

    for (const activity of activities) {
      if (activity.session != null) {
        if (
          activity.session.type != null &&
          !typeList.includes(activity.session.type)
        ) {
          typeList.push(activity.session.type)
        }
      }
    }
    setTypes(typeList)
  }

  const filterActivitiesByType = (type: string) => {
    const filteredList = [...activityResults].filter(
      (activity) => activity.session.type === type,
    )
    setActivityResults(filteredList)
  }

  const filterActivitiesByTag = (tag: string) => {
    const filteredList = [...activityResults].filter((activity) =>
      activity.session.sessionTags.some((tagObj) => tagObj.tag === tag),
    )

    console.log(filteredList)
    setActivityResults(filteredList)
  }

  const sortActivitiesByDateAsc = () => {
    const sortedList = [...activityResults].sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return dateA.getTime() - dateB.getTime()
    })

    setActivityResults(sortedList)
  }

  const sortActivitiesByDateDesc = () => {
    const sortedList = [...activityResults].sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return dateB.getTime() - dateA.getTime()
    })

    setActivityResults(sortedList)
  }

  const removeActivityById = (activityId: string) => {
    const updatedResults = activityResults.filter(
      (obj) => obj.id !== activityId,
    )
    setOriginalActivityResults(updatedResults)
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

    populateTags(activityList)
    populateTypes(activityList)
    setOriginalActivityResults((prevState) => [...prevState, ...activityList])
    setActivityResults((prevState) => [...prevState, ...activityList])
  }
  const duplicateActivity = async (activityId: string) => {
    try {
      const response = await fetch(
        `/api/sessions/duplicateSessionById/${activityId}`,
        {
          method: "post",
        },
      )

      const data = await response.json()
      const isSuccess = data.status
      const message = data.message

      if (isSuccess == 200) {
        console.log(`Session with id ${activityId} duplicated.`)
        setActivityResults([])
        await getActivities(performerId)
        return { success: true, message: `${activityId} duplicated.` }
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

  const handleDuplicate = async (activityId: string) => {
    await duplicateActivity(activityId)
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
            <Filters
              tags={tags}
              types={types}
              sortAsc={sortActivitiesByDateAsc}
              sortDesc={sortActivitiesByDateDesc}
              filterType={filterActivitiesByType}
              filterTag={filterActivitiesByTag}
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
