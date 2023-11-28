import { SessionActivityDto } from "@/types/sessionActivity";
import { useState } from "react";

const useCompareHook = () => {
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

    setActivityResults(filteredList)
  }

  const filterActivitiesByReportStatus = (reportStatus: string) => {
    console.log(activityResults)
    if (reportStatus === "No report") {
      const filteredList = [...activityResults].filter(
        (activity) => activity.report == null,
      )
      setActivityResults(filteredList)
    } else {
      const filteredList = [...activityResults].filter((activity) => {
        return (
          activity.report !== null && activity.report.status === reportStatus
        )
      })
      setActivityResults(filteredList)
    }
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

      if (isSuccess == 201) {
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

  return { 
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
    duplicateActivity
   };
};

export default useCompareHook;