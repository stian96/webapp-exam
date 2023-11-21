"use client"

import Link from "next/link"

import { Header } from "@/components"
import ActivityList from "@/components/ActivityList"

//TODO Display them
const Sessions = ({ params }: { params: { performerId: string } }) => {
  return (
    <>
      <Header />
      <div className="min-w-screen-md mx-auto max-w-screen-lg">
        <ActivityList performerId={params.performerId} />
      </div>
    </>
  )
}

export default Sessions
