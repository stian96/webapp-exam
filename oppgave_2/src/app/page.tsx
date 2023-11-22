"use client"

import { useEffect, useState } from "react"

import { Header, Search, Table } from "@/components"
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
          <Header />
          <Search setSearchQuery={setSearchQuery} />
          <Table
            searchQuery={searchQuery}
            performers={performers}
            setPerformers={setPerformers}
          />
        </div>
      )}
    </>
  )
}

export default Dashboard
