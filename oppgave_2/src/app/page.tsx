"use client"
import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Search from "@/components/Search"
import Table from "../components/tables/Table"
import { Performer } from "../types/performer"
import { fetchPerformers } from "../lib/api"

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [performers, setPerformers] = useState<Performer[]>([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      try {
        setPerformers(await fetchPerformers("/api/users/getUsers"))
      } catch(error) {
        console.error("Error fetching users:", error)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])


  return (
    <div>
      {loading ? (
        <div className="loading-data">Loading data, please wait a moment...</div>
      ): (
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
    </div>
  )
}

export default Dashboard
