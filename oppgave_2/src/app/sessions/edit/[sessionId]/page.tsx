"use client"

import { Header } from "@/components"
import ActivityEditor from "@/components/ActivityEditor"

//TODO CREATE PUT Update for session
const SessionsEdit = ({ params }: { params: { sessionId: string } }) => {
  return (
    <>
      <Header />
      <div className="min-w-screen-md mx-auto max-w-screen-lg">
        <ActivityEditor activityId={params.sessionId} />
      </div>
    </>
  )
}

export default SessionsEdit
