"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

import "@/style/card.scss"

import { SessionActivity, SessionActivityDto } from "@/types/sessionActivity"

type ReportListCardProps = {
  activity: SessionActivityDto
}

const ReportListCard = ({ activity }: ReportListCardProps) => {
  const [isSessionVisible, setIsSessionVisible] = useState<boolean>(false)

  const handleToggleSessionVisibility = () => {
    setIsSessionVisible((prevVisibility) => !prevVisibility)
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between space-x-4">
        <div>
          <p className="card__title">Reports</p>
        </div>

        <div className="flex space-x-4">
          <button
            className={`card__button ${
              activity.session ? "visible" : "hidden"
            }`}
            onClick={handleToggleSessionVisibility}
          >
            {`${isSessionVisible ? "Hide Details" : "Show Details"}`}
          </button>
        </div>
      </div>

      {activity.report && (
        <div>
          <h3 className="card__title">Report Details</h3>
          <p className={`${activity.report.id == null ? "hidden" : "visible"}`}>
            Report ID: {activity.report.id}
          </p>
          <p
            className={`${
              activity.report.comments == null ? "hidden" : "visible"
            }`}
          >
            Comments: {activity.report.comments}
          </p>
          <p
            className={`${
              activity.report.status == null ? "hidden" : "visible"
            }`}
          >
            Status: {activity.report.status}
          </p>
        </div>
      )}

      <div className={`${isSessionVisible ? "visible" : "hidden"}`}>
        <div className="flex items-center justify-between space-x-4">
          <div>
            <p className="card__title">Session Report</p>
          </div>
        </div>
        <p className={`${activity.id ? "visible" : "hidden"}`}>
          Session ID: {activity.id}
        </p>
        <p className={`${activity.date ? "visible" : "hidden"}`}>
          Date: {new Date(activity.date).toLocaleString()}
        </p>

        {activity.session && (
          <div>
            <p className={`${activity.session.id ? "visible" : "hidden"}`}>
              Session Activity ID: {activity.session.id}
            </p>
            <p className={`${activity.session.name ? "visible" : "hidden"}`}>
              Name: {activity.session.name}
            </p>
            <p className={`${activity.session.type ? "visible" : "hidden"}`}>
              Type: {activity.session.type}
            </p>
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
            <p
              className={`${activity.session.wattParam ? "visible" : "hidden"}`}
            >
              Watt Param: {activity.session.wattParam}
            </p>
            <p
              className={`${
                activity.session.speedParam ? "visible" : "hidden"
              }`}
            >
              Speed Param: {activity.session.speedParam}
            </p>
            <p
              className={`${
                activity.session.pulseParam ? "visible" : "hidden"
              }`}
            >
              Pulse Param: {activity.session.pulseParam}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReportListCard
