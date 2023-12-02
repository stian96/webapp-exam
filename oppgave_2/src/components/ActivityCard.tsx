"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

import "@/style/card.scss"

import { SessionActivity, SessionActivityDto } from "@/types/sessionActivity"

type ActivityCardProps = {
  activity: SessionActivityDto
}

const ActivityCard = ({ activity }: ActivityCardProps) => {
  const [isSessionVisible, setIsSessionVisible] = useState<boolean>(false)
  const [isGoalVisible, setIsGoalVisible] = useState<boolean>(false)
  const [isReportVisible, setIsReportVisible] = useState<boolean>(false)

  const handleToggleSessionVisibility = () => {
    setIsSessionVisible((prevVisibility) => !prevVisibility)
  }

  const handleToggleGoalVisibility = () => {
    setIsGoalVisible((prevVisibility) => !prevVisibility)
  }

  const handleToggleReportVisibility = () => {
    setIsReportVisible((prevVisibility) => !prevVisibility)
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between space-x-4">
        <div>
          <p className="card__title">Sessions</p>
        </div>

        <div className="flex space-x-4">
          <Link href={`/sessions/edit/${activity.id}`}>
            <button className="card__button">Edit Session</button>
          </Link>
          <button
            className={`card__button ${
              activity.session ? "visible" : "hidden"
            }`}
            onClick={handleToggleSessionVisibility}
          >
            {`${isSessionVisible ? "Hide Details" : "Show Details"}`}
          </button>
          <button
            className={`card__button ${activity.goal ? "visible" : "hidden"}`}
            onClick={handleToggleGoalVisibility}
          >
            {`${isGoalVisible ? "Hide Goal" : "Show Goal"}`}
          </button>
          <button
            className={`card__button ${activity.report ? "visible" : "hidden"}`}
            onClick={handleToggleReportVisibility}
          >
            {`${isReportVisible ? "Hide Report" : "Show Report"}`}
          </button>
          <Link
            className={`card__button ${activity.report ? "hidden" : "visible"}`}
            onClick={handleToggleReportVisibility}
            href={`../reports/${activity.id}`}
          >
            Create Report
          </Link>
        </div>
      </div>
      <p className={`${activity.id ? "visible" : "hidden"}`}>
        ID: {activity.id}
      </p>
      <p className={`${activity.date ? "visible" : "hidden"}`}>
        Date: {new Date(activity.date).toLocaleString()}
      </p>
      <p className={`${activity.session ? "visible" : "hidden"}`}>
        Session ID: {activity.sessionId}
      </p>
      <p className={`${activity.goal ? "visible" : "hidden"}`}>
        Goal ID: {activity.goalId}
      </p>

      {activity.session && (
        <div className={`${isSessionVisible ? "visible" : "hidden"}`}>
          <h3 className="card__title">Session Details</h3>
          <p className={`${activity.session.id ? "visible" : "hidden"}`}>
            ID: {activity.session.id}
          </p>
          <p className={`${activity.session.name ? "visible" : "hidden"}`}>
            Name: {activity.session.name}
          </p>
          <p className={`${activity.session.type ? "visible" : "hidden"}`}>
            Type: {activity.session.type}
          </p>
          <div
            className={`${!activity.session.isTemplate ? "visible" : "hidden"}`}
          >
            <p
              className={`${
                activity.session.performerId ? "visible" : "hidden"
              }`}
            >
              Performer ID: {activity.session.performerId}
            </p>
          </div>
          <p className={`${activity.session.slug ? "visible" : "hidden"}`}>
            Slug: {activity.session.slug}
          </p>
          <p
            className={`${
              activity.session.intensityParam ? "visible" : "hidden"
            }`}
          >
            Intensity Param: {activity.session.intensityParam}
          </p>
          <p className={`${activity.session.wattParam ? "visible" : "hidden"}`}>
            Watt Param: {activity.session.wattParam}
          </p>
          <p
            className={`${activity.session.speedParam ? "visible" : "hidden"}`}
          >
            Speed Param: {activity.session.speedParam}
          </p>
          <p
            className={`${activity.session.pulseParam ? "visible" : "hidden"}`}
          >
            Pulse Param: {activity.session.pulseParam}
          </p>
        </div>
      )}

      {activity.goal && (
        <div className={`${isGoalVisible ? "visible" : "hidden"}`}>
          <h3 className="card__title">Goal Details</h3>
          <p className={`${activity.goal.id == null ? "hidden" : "visible"}`}>
            ID: {activity.goal.id}
          </p>
          <p className={`${activity.goal.name == null ? "hidden" : "visible"}`}>
            Name: {activity.goal.name}
          </p>
          <p className={`${activity.goal.date == null ? "hidden" : "visible"}`}>
            Date: {new Date(activity.goal.date).toLocaleString()}
          </p>
          <p
            className={`${
              activity.goal.comments == null ? "hidden" : "visible"
            }`}
          >
            Comments: {activity.goal.comments}
          </p>
          <div
            className={`${!activity.goal.isCompetition ? "visible" : "hidden"}`}
          >
            <p
              className={`${
                activity.goal.goalNotCompetition == null ? "hidden" : "visible"
              }`}
            >
              Non-Competition Goal: {activity.goal.goalNotCompetition}
            </p>
          </div>
          <div
            className={`${activity.goal.isCompetition ? "visible" : "hidden"}`}
          >
            <p
              className={`${
                activity.goal.goalCompetition == null ? "hidden" : "visible"
              }`}
            >
              Competition Goal: {activity.goal.goalCompetition}
            </p>
            <p
              className={`${
                activity.goal.location == null ? "hidden" : "visible"
              }`}
            >
              Location: {activity.goal.location}
            </p>
            <p
              className={`${activity.goal.type == null ? "hidden" : "visible"}`}
            >
              Type: {activity.goal.type}
            </p>
            <p
              className={`${
                activity.goal.priority == null ? "hidden" : "visible"
              }`}
            >
              Priority: {activity.goal.priority}
            </p>
          </div>
        </div>
      )}

      {activity.report && (
        <div className={`${isReportVisible ? "visible" : "hidden"}`}>
          <h3 className="card__title">Report Details</h3>
        </div>
      )}
    </div>
  )
}

export default ActivityCard
