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

  useEffect(() => {
    const fetch = async () => {
      const users = await fetchPerformers("/api/users/getUsers")
      setPerformers(users)
    }
    fetch()
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
