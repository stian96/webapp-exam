"use client"
import { useState, useEffect } from "react"

import Header from "@/components/Header"
import Search from "@/components/Search"
import Table from "../components/tables/Table"
import { Performer } from "../types/performer"

interface APIResponse {
  status: number
  message: Performer[]
}

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("")

  // TODO: Replace dummy data with data from db
  const [performers, setPerformers] = useState<Performer[]>([]);

  useEffect(() => {
    const fetchPerformers = async () => {
      const response = await fetch("/api/users/getUsers")
      if (!response.ok) {
        throw new Error("Failed to fetch performers...")
      }
      
      const data = await response.json() as APIResponse
      if (data.status === 200 && typeof data.message === 'string') {
        const performers = JSON.parse(data.message) as Performer[]
        if (performers.length === 30) {
          console.log(performers[0].gender)
        }
        setPerformers(performers)
      }
      else {
        throw new Error("Invalid response format!")
      }
    }
    fetchPerformers()
  }, [])


  return (
    <div>
      <Header />
      <Search setSearchQuery={setSearchQuery} />
      <Table 
        searchQuery={searchQuery}  
        performers={performers}
        setPerformers={setPerformers}
      />
    </div>
  )
}

export default Dashboard
