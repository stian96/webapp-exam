"use client"

import { useState } from "react"

import Header from "@/components/Header"
import Search from "@/components/Search"
import Table from "@/components/tables/Table"

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div>
      <Header />
      <Search setSearchQuery={setSearchQuery} />
      <Table searchQuery={searchQuery} />
    </div>
  )
}

export default Dashboard
