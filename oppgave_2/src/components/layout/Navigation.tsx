"use client"

import Link from "next/link"

import "@/style/navigation.scss"
import "@/style/button.scss"

import { useEffect, useRef, useState } from "react"
import { FileText, HelpCircle, Home, User } from "lucide-react"

import useTaskAlertHook from "@/hooks/useTaskAlertHook"
import { SessionActivityDto } from "@/types/sessionActivity"

//TODO Swap in 'create report' link when Lorena is finished.
const Navigation = () => {
  const {
    activityResults,
    getActivities,
    toggleIsTaskAlertShown,
    isTaskAlertShown,
  } = useTaskAlertHook()
  const isApiCalled = useRef(false)

  // Maybe we can place this in its own file later.
  const navElements = [
    { name: "Home", path: "/", icon: <Home /> },
    { name: "Create Template", path: "/create-template", icon: <FileText /> },
    { name: "Create Question", path: "/create-question", icon: <HelpCircle /> },
    { name: "Create Performer", path: "/create-performer", icon: <User /> },
  ]

  useEffect(() => {
    if (!isApiCalled.current) {
      isApiCalled.current = true
      return
    }

    void getActivities()
  }, [])

  return (
    <div className="navigation ">
      <ul className="navigation__list flex items-center justify-between">
        {navElements.map((element, index) => (
          <li key={index} className="navigation__list-item">
            <Link href={element.path} className="flex gap-2">
              {element.icon}
              {element.name}
            </Link>
          </li>
        ))}
        <li className="flex items-center justify-center">
          <button
            onClick={toggleIsTaskAlertShown}
            className={`${
              activityResults.length > 0 ? "" : "hidden"
            } flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white`}
          >
            {activityResults.length}
          </button>
          x
        </li>
      </ul>

      {isTaskAlertShown && (
        <div className="popup-overlay fixed inset-0 flex items-center justify-center">
          <div className="popup-content relative overflow-y-auto rounded bg-white px-2">
            <button
              onClick={toggleIsTaskAlertShown}
              className="absolute right-0 top-0 m-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white"
            >
              X
            </button>
            <div className="pt-12">
              {activityResults.map((activity, index) => (
                <div
                  key={index}
                  className="popup-content--scalable my-1 flex flex-col p-2"
                >
                  <p>Id: {activity.id}</p>
                  <p>Date: {new Date(activity.date).toLocaleString()}</p>
                  <Link href={`reports/${activity.id}/create`} className="pt-2">
                    <button className="defaultButton">Create Report</button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navigation
