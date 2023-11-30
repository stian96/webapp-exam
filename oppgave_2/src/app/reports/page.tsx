"use client"
import { Header } from "@/components"
import ReportList from "@/components/Report/ReportList"

const Reports = ({ params }: { params: { id: string } }) => {

    return (
        <>
            <Header title={"All Reports"} />
            <div className="min-w-screen-md mx-auto max-w-screen-lg mt-4">
                <ReportList />
            </div>
        </>


    )
}

export default Reports
