"use client"

import { useState } from "react"

import ImportButton from "@/components/ImportButton"

const TestPageThree = () => {
  const [responseCode, setResponseCode] = useState(0)
  const [responseBody, setResponseBody] = useState("")

  const getApiResponse = async () => {
    const response = await fetch(`/api/questions/getQuestions`, {
      method: "get",
    })

    const data = await response.json()
    const result = data as { status: number; message: string }
    setResponseCode(result.status)
    setResponseBody(result.message)
  }

  return (
    <main className="text-white">
      <button onClick={getApiResponse}>Click me</button>
      <p>Code is: {responseCode}</p>
      <p>Response is: {responseBody}</p>
    </main>
  )
}

export default TestPageThree
