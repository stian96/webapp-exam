"use client"
import { Header } from "@/components"
import ReportList from "@/components/Report/ReportList"
import Link from "next/link"

const Reports = ({ params }: { params: { id: string } }) => {

    return (
        <>
            <Link href="/">
                <Header title={"All Reports"} />
            </Link>
            <div className="min-w-screen-md mx-auto max-w-screen-lg mt-4">
                <ReportList />
            </div>
        </>


    )
}

export default Reports
