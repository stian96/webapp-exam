"use client"

import { createContext, useState } from "react"
import type { ReactNode } from "react"

type ActivityContextType = {
  selectedActivities: string[]
  toggleActivity: (activityId: string) => void
  selectedType: string
  setType: (type: string) => void
}

type ActivityProviderProps = {
  children: ReactNode
}

const defaultContext: ActivityContextType = {
  selectedActivities: [],
  selectedType: "null",
  setType: () => {},
  toggleActivity: () => {},
}

// This context was created to avoid 4 levels of props drilling.
export const ActivityContext =
  createContext<ActivityContextType>(defaultContext)

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
  const [selectedActivities, setSelectedActivities] = useState<string[]>([])
  const [selectedType, setSelectedType] = useState<string>("null")

  const toggleActivity = (activityId: string) => {
    setSelectedActivities((prev) => {
      const isAlreadySelected = prev.includes(activityId)
      if (isAlreadySelected) {
        return prev.filter((id) => id !== activityId)
      } else {
        return [...prev, activityId]
      }
    })
  }

  const setType = (type?: string) => {
    if (type == undefined) {
      setSelectedType("undefined")
    } else {
      setSelectedType(type)
    }
  }

  return (
    <ActivityContext.Provider
      value={{ selectedActivities, toggleActivity, selectedType, setType }}
    >
      {children}
    </ActivityContext.Provider>
  )
}
