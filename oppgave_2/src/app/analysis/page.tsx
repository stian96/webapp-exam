"use client"

import { useContext } from "react"

import Header from "@/components/layout/Header"
import Analysis from "@/components/layout/tables/Analysis"
import { ActivityContext, ActivityProvider } from "@/hooks/ActivityContext"

const AnalysisPage = () => {
  const { selectedActivities } = useContext(ActivityContext)

  return (
    <div>
      <Header title={"Analysis"} />
      <div className="min-w-screen-md mx-auto max-w-screen-lg">
        <Analysis activityIds={selectedActivities} />
      </div>
    </div>
  )
}

export default AnalysisPage
