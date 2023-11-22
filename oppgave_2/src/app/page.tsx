"use client"

import { useEffect, useState } from "react"

import { Header, Search, Table } from "@/components"
import ImportButton from "@/components/ImportButton"
import { fetchPerformers } from "../lib/api"
import { Performer } from "../types/performer"

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [performers, setPerformers] = useState<Performer[]>([])
  const [fetching, setFetching] = useState(false)

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
            <div className="pt-4">
              <ImportButton />
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
