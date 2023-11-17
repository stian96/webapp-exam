"use client"
import { useState } from "react"
import Header from "@/components/Header"
import Search from "@/components/Search"
import Table from "../components/tables/Table"
import { ActivityProvider } from "@/hooks/ActivityContext"

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("")

  // TODO: Replace dummy data with data from db
  const [performers, setPerformers] = useState([
    { id: "Performer A", name: "Jake", gender: "Male", sport: "Running" },
    { id: "Performer B", name: "Karen", gender: "Female", sport: "Crossfit" },
    { id: "Performer C", name: "Josh", gender: "Male", sport: "Football" },
    { id: "Performer D", name: "Betty", gender: "Female", sport: "Handball" }
  ]);

  return(
    <ActivityProvider>
      <Header />
      <Search setSearchQuery={setSearchQuery}/>
      <Table 
        searchQuery={searchQuery} 
        performers={performers}
        setPerformers={setPerformers}
      />
    </ActivityProvider>
  )
}

export default Dashboard
