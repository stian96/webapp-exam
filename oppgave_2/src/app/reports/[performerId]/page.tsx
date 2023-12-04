"use client"

import { Header } from "@/components"
import ReportList from "@/components/ReportList"

const Sessions = ({ params }: { params: { performerId: string } }) => {
  return (
    <>
      <Header title={"Reports"} />
      <div className="min-w-screen-md mx-auto max-w-screen-lg">
        <ReportList performerId={params.performerId} />
      </div>
    </>
  )
}

export default Sessions
