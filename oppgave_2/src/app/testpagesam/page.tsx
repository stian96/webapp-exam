"use client"

import { useEffect, useState } from "react"
import { NextResponse } from "next/server"

import importAllUsers from "@/features/importUsers/importUsers.controller"
import {
  createPerformerFromDto,
  writePerformersFromImport,
} from "@/features/importUsers/importUsers.service"
import { type PerformerDto } from "@/types/DTO/importUsers"

const TestPage = () => {
  const [responseCode, setResponseCode] = useState(0)
  const [responseBody, setResponseBody] = useState("")

  const getApiResponse = async () => {
    const response = await fetch(`/api/users/getImportedUsers`, {
      method: "get",
    })

    const data = await response.json()
    const result = data as { status: number; message: string }
    setResponseCode(result.status)
    setResponseBody(result.message)
  }

  const handleClick = async () => {
    const result = await writePerformersFromImport(dummyData)

    if (result.status) {
      console.log(result.data)
    } else {
      console.log(result.data)
    }
  }

  const handleClickFromApiMap = async () => {
    const performers: PerformerDto[] = JSON.parse(dummyData) as PerformerDto[]
    const performerFromDto = createPerformerFromDto(performers[0])

    try {
      const response = await fetch("/api/users/createUser", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(performerFromDto),
      })

      console.log(response)
    } catch (error) {
      // Do something here.
    }
  }

  const handleClickFromApiDto = async () => {
    //TODO Read from actual API and not just dummy data.
    const performers: PerformerDto[] = JSON.parse(
      responseBody,
    ) as PerformerDto[]

    for (const performer of performers) {
      const data = await isUserExists(performer.id)
      const isSuccess = data.success

      if (!isSuccess) {
        try {
          const response = await fetch("/api/users/importUser", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(performer),
          })

          console.log(response)
        } catch (error) {
          // Do something here.
        }
      }
    }
  }

  const isUserExists = async (userId: string) => {
    try {
      const response = await fetch(`/api/users/getUserById/${userId}`, {
        method: "get",
      })

      const data = await response.json()
      const isSuccess = data.success

      if (isSuccess) {
        console.log(`${userId} exists.`)
        return { success: true, message: `${userId} exists.` }
      } else {
        console.log(`${userId} does not exist.`)
        return { success: false, message: `${userId} does not exist.` }
      }
    } catch (error) {
      return { success: false, message: error }
    }
  }

  useEffect(() => {
    void getApiResponse()
  }, [])

  return (
    <main>
      <div className="text-white">
        The API GET request finished with status code {responseCode}. The
        message is "{responseBody}"
      </div>
      <button
        className="rounded-md bg-orange-500 px-4 py-2 text-white"
        onClick={handleClickFromApiDto}
      >
        Click to import data
      </button>
    </main>
  )
}

export default TestPage
