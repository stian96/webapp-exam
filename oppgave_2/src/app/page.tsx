"use client"
import { useState } from "react"
import Header from "@/components/Header"
import Search from "@/components/Search"
import Table from "@/components/tables/Table"
import { ActivityProvider } from "@/hooks/ActivityContext"

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("")

  return(
    <ActivityProvider>
      <Header />
      <Search setSearchQuery={setSearchQuery}/>
      <Table searchQuery={searchQuery}/>
    </ActivityProvider>
  )
}

export default Dashboard
