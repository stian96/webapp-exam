"use client"

import { useContext } from "react"

import Header from "@/components/Header"
import { ActivityContext, ActivityProvider } from "@/hooks/ActivityContext"

const AnalysisPage = () => {
  const { selectedActivities } = useContext(ActivityContext)

  return (
    <div>
      <Header />
      <div className="min-w-screen-md mx-auto max-w-screen-lg">
        <p className="text-white">selectedActivities</p>
        {selectedActivities.map((activity, index) => (
          <li key={index} className="text-white">
            {activity}
          </li>
        ))}
      </div>
    </div>
  )
}

export default AnalysisPage
