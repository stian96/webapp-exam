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
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <Table />
    </ActivityProvider>
  )
}

export default Dashboard
