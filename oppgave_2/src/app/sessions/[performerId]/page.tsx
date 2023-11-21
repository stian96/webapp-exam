"use client"

import Link from "next/link"

import { Header } from "@/components"
import SessionCreator from "@/components/SessionCreator"

//TODO Get all sessions for a user
//TODO Display them
//TODO Add 'create session' button
//TODO Add 'edit session' button
const Sessions = ({ params }: { params: { performerId: string } }) => {
  return (
    <>
      <Header />
      <Link
        className="table__body-link text-white"
        href={`/sessions/${params.performerId}/create/`}
      >
        Create New Session
      </Link>
      <Link className="table__body-link text-white" href={`/sessions/edit/egg`}>
        Edit Session
      </Link>
    </>
  )
}

export default Sessions
