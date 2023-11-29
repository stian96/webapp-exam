"use client"

import { Header } from "@/components"
import ActivityEditor from "@/components/ActivityEditor"
import Link from "next/link"

const SessionsEdit = ({ params }: { params: { sessionId: string } }) => {
  return (
    <>
      <Link href="/">
        <Header title={"Edit Session"} />
      </Link>
      <div className="min-w-screen-md mx-auto max-w-screen-lg">
        <ActivityEditor activityId={params.sessionId} />
      </div>
    </>
  )
}

export default SessionsEdit
