import { useContext, useEffect, useState } from "react"

import { ActivityContext } from "@/hooks/ActivityContext"

import "@/style/activity.scss"

import Link from "next/link"

import { SessionActivityDto } from "@/types/sessionActivity"

type ActivityProps = {
  id: string
  handleDelete: (activityId: string) => void
}

const Activity = ({ id, handleDelete }: ActivityProps) => {
  const { selectedActivities, toggleActivity } = useContext(ActivityContext)
  const isChecked = selectedActivities.includes(id)

  const handleChange = () => {
    toggleActivity(id)
  }

  return (
    <div className="activity-cont flex items-center justify-between gap-8 px-8">
      <input
        className="activity-cont__checkbox p-2"
        type="checkbox"
        id={`activityCheckbox-${id}`}
        name="activityCheckbox"
        onChange={handleChange}
        checked={isChecked}
      />
      <div className="activity flex w-full justify-between">
        <span className="activity__id">{`Id: ${id}`}</span>
        <div className="activity__container flex gap-5">
          <Link href={`#`}>
            <button className="activity__container-button">Duplicate</button>
          </Link>
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
          <Link href={`#`}>
            <button className="activity__container-button">
              Create Report
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Activity
