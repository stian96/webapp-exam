"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import { Header, Search, Table } from "@/components"
import ImportButton from "@/components/ImportButton"
import { fetchPerformers } from "../lib/api"
import { Performer } from "../types/performer"

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [performers, setPerformers] = useState<Performer[]>([])
  const [fetching, setFetching] = useState(false)

  const archive = async (performerId: string) => {
    try {
      const response = await fetch(
        `/api/users/archiveParameters/${performerId}`,
        {
          method: "post",
        },
      )

      const data = await response.json()
      const isSuccess = data.status
      const message = data.message

      if (isSuccess == 201) {
        console.log(`Performer parameters with id ${performerId} archived.`)
        return { success: true, message: `${performerId} archived.` }
      } else {
        console.log(`Performer with id ${performerId} does not exist.`)
        return {
          success: false,
          message: `Performer with id ${performerId} does not exist.`,
        }
      }
    } catch (error) {
      return { success: false, message: error }
    }
  }

  useEffect(() => {
    const fetch = async () => {
      setFetching(true)
      try {
        setPerformers(await fetchPerformers("/api/users/getUsers"))
      } catch (error) {
        console.error("Error fetching users:", error)
      } finally {
        setFetching(false)
      }
    }
    fetch()
  }, [])

  return (
    <>
      {fetching ? (
        <div className="loading-data">
          Fetching data, please wait a moment...
        </div>
      ) : (
        <div>
          <Header title={"Dashboard"} />
          <div className="min-w-screen-sm mx-auto max-w-screen-md py-8">
            <Search setSearchQuery={setSearchQuery} />
            <div className="flex items-center space-x-4 pt-4">
              <ImportButton />
              <Link
                className="defaultButton flex justify-center"
                href="/api-doc"
              >
                API Documentation
              </Link>
              <button
                onClick={() => archive("00e70ee0-289b-4fb0-80cc-c2d66d2b6749")}
              >
                Click
              </button>
            </div>
          </div>
          <div className="min-w-screen-md mx-auto max-w-screen-lg pb-8">
            <Table
              searchQuery={searchQuery}
              performers={performers}
              setPerformers={setPerformers}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Dashboard
