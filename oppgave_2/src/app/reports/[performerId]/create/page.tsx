"use client"

import ReportCard from "@/components/Report/ReportCard"

import "@/style/card.scss"

import { Header } from "@/components"

const ReportDetail = ({ params }: { params: { performerId: string } }) => {
  return (
    <>
      <Header title={"Create Report"} />
      <div className="min-w-screen-md mx-auto mt-4 max-w-screen-lg">
        <ReportCard id={params.performerId} />
      </div>
    </>
  )
}

export default ReportDetail
