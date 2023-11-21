"use client"

import { Header } from "@/components"

//TODO Create GET session
//TODO Retrieve session
//TODO Create Form with pre-filled data
//TODO CREATE PUT Update for session
const SessionsEdit = ({ params }: { params: { sessionId: string } }) => {
  return (
    <>
      <Header />
      <div className="text-white">My Post: {params.sessionId}</div>
    </>
  )
}

export default SessionsEdit
