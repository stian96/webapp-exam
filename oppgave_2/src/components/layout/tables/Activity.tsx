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
            className="activity__container-button"
          >
            Duplicate
          </button>
          <Link href={`/sessions/edit/${id}`}>
            <button className="activity__container-button">Edit</button>
          </Link>
          <button
            onClick={() => {
              handleDelete(id)
            }}
            className="activity__container-button"
          >
            Delete
          </button>
          <Link href={`#`} className={`${hasReport ? "hidden" : ""}`}>
            <button className="activity__container-button">
              Create Report
            </button>
          </Link>
          <Link href={`#`} className={`${hasReport ? "" : "hidden"}`}>
            <button className="activity__container-button">Show Report</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Activity
