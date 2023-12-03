"use client"

import ReportCard from "@/components/Report/ReportCard"

import "@/style/card.scss"

import { Header } from "@/components"

const ReportDetail = ({ params }) => {
  const { performerId } = params

  return (
    <>
      <Header title={"Report"} />
      <div className="min-w-screen-md mx-auto mt-4 max-w-screen-lg">
        <ReportCard id={performerId as string} />
      </div>
    </>
  )
}

export default ReportDetail
