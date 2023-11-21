"use client"

import { Header, TemplateCreator } from "@/components"

//TODO Create PUT Session
//TODO Create form
//TODO Get dropdown of all sessions
//TODO Update form using checkbox 'base on template'
const SessionsCreate = ({ params }: { params: { performerId: string } }) => {
  return (
    <>
      <Header />
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
