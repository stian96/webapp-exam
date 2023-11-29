"use client"

import { Header, TemplateCreator } from "@/components"
import Link from "next/link"

const SessionsCreate = ({ params }: { params: { performerId: string } }) => {
  return (
    <>
      <Link href="/">
        <Header title={"Create Session"} />
      </Link>
      <div className="min-w-screen-md mx-auto max-w-screen-lg">
        <TemplateCreator
          isTemplateCreator={false}
          performerIdString={params.performerId}
        />
      </div>
    </>
  )
}

export default SessionsCreate
