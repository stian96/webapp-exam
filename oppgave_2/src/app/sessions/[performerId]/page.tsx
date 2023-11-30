"use client"

import { Header } from "@/components"
import ActivityList from "@/components/ActivityList"

const Sessions = ({ params }: { params: { performerId: string } }) => {
  return (
    <>
      <Header title={"Sessions"} />
      <div className="min-w-screen-md mx-auto max-w-screen-lg">
        <ActivityList performerId={params.performerId} />
      </div>
    </>
  )
}

export default Sessions
