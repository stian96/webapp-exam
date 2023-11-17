"use client"

import { useContext } from "react"

import Header from "@/components/Header"
import Analysis from "@/components/tables/Analysis"
import { ActivityContext, ActivityProvider } from "@/hooks/ActivityContext"

const AnalysisPage = () => {
  const { selectedActivities } = useContext(ActivityContext)
  const dummyIds: string[] = [
    "52a8e607-7cd8-4637-869c-0f67cffec176",
    "6a3088e0-204e-408f-a530-138715ba8e0b",
  ]

  return (
    <div>
      <Header />
      <div className="min-w-screen-md mx-auto max-w-screen-lg">
        <Analysis activityIds={dummyIds} />
      </div>
    </div>
  )
}

export default AnalysisPage
