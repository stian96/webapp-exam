import { useContext, useEffect, useState } from "react"

import { ActivityContext } from "@/hooks/ActivityContext"

import "@/style/activity.scss"

import Link from "next/link"

import { SessionActivityDto } from "@/types/sessionActivity"

type ActivityProps = {
  id: string
  type: string
  hasReport: boolean
  handleDelete: (activityId: string) => void
  handleDuplicate: (activityId: string) => void
}

const Activity = ({
  id,
  type,
  hasReport,
  handleDelete,
  handleDuplicate,
}: ActivityProps) => {
  const { selectedActivities, toggleActivity, selectedType, setType } =
    useContext(ActivityContext)
  const isChecked = selectedActivities.includes(id)

  const createCSV = (sessionActivity: SessionActivityDto): string => {
    const csvToReturn: string[] = []

    const headers = [
      "id",
      "date",
      "sessionId",
      "goalId",
      "performerId",
      "name",
      "type",
      "slug",
      "intensityParam",
      "wattParam",
      "speedParam",
      "pulseParam",
    ]

    csvToReturn.push(headers.join(","))

    const activityResults: string[] = [
      sessionActivity.id || "",
      sessionActivity.date || "",
      sessionActivity.sessionId || "",
      sessionActivity.goalId || "",
      sessionActivity.performerId || "",
      sessionActivity.session?.name || "",
      sessionActivity.session?.slug || "",
      sessionActivity.session?.intensityParam?.toString() || "",
      sessionActivity.session?.wattParam?.toString() || "",
      sessionActivity.session?.speedParam?.toString() || "",
      sessionActivity.session?.pulseParam?.toString() || "",
    ]

    csvToReturn.push(activityResults.join(","))

    const csvToString = csvToReturn.join("\n")

    return csvToString
  }

  // This function was directly taken from the following site on the 28th November 2023:
  // https://www.geeksforgeeks.org/how-to-create-and-download-csv-file-in-javascript/
  const downloadCSV = (sessionActivityCSV: string) => {
    const blob = new Blob([sessionActivityCSV], { type: "text/csv" })

    const url = window.URL.createObjectURL(blob)

    const a = document.createElement("a")

    a.setAttribute("href", url)

    a.setAttribute("activity", "activity.csv")

    a.click()
  }

  const getActivity = async (activityId: string) => {
    try {
      const response = await fetch(
        `/api/sessions/getSessionById/${activityId}`,
        {
          method: "get",
        },
      )

      const data = await response.json()
      const isSuccess = data.status
      const message = data.message

      if (isSuccess == 200) {
        const activity: SessionActivityDto = JSON.parse(message)

        const csv = createCSV(activity)

        downloadCSV(csv)
      } else {
        return
      }
    } catch (error) {
      return { success: false, message: error }
    }
  }

  const handleChange = () => {
    toggleActivity(id)
    if (!isChecked) {
      setType(type)
    } else {
      setType("null")
    }

    console.log(type)
  }

  return (
    <div className="activity-cont flex items-center justify-between gap-8 px-8">
      <input
        className={`activity-cont__checkbox p-2 ${
          type == selectedType ||
          selectedType == "null" ||
          (type == undefined && selectedType == "undefined")
            ? ""
            : "pointer-events-none opacity-0"
        } ${hasReport ? "" : "pointer-events-none opacity-50"}`}
        type="checkbox"
        id={`activityCheckbox-${id}`}
        name="activityCheckbox"
        onChange={handleChange}
        checked={isChecked}
      />
      <div className="activity flex w-full justify-between">
        <span className="activity__id overflow-hidden overflow-ellipsis whitespace-nowrap">{`Id: ${id}`}</span>
        <div className="activity__container flex gap-5">
          <button
            onClick={() => {
              handleDuplicate(id)
            }}
            className="activity__container-button flex items-center justify-center"
          >
            Duplicate
          </button>
          <Link
            className="activity__container-button flex items-center justify-center"
            href={`/sessions/edit/${id}`}
          >
            Edit
          </Link>
          <button
            onClick={() => {
              handleDelete(id)
            }}
            className="activity__container-button flex items-center justify-center"
          >
            Delete
          </button>
          <Link
            href={`reports/${id}`}
            className={`activity__container-button flex items-center justify-center ${
              hasReport ? "hidden" : ""
            }`}
          >
            Create Report
          </Link>
          <button
            className={`activity__container-button flex items-center justify-center ${
              hasReport ? "" : "hidden"
            }`}
            onClick={() => getActivity(id)}
          >
            Download CSV
          </button>
        </div>
      </div>
    </div>
  )
}

export default Activity
