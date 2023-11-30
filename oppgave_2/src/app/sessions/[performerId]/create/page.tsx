"use client"

import { Header, TemplateCreator } from "@/components"

const SessionsCreate = ({ params }: { params: { performerId: string } }) => {
  return (
    <>
      <Header title={"Create Session"} />
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
