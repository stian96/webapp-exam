"use client"
import { Header } from "@/components"
import ReportList from "@/components/Report/ReportList"
const Reports = ({ params }: { params: { performerId: string } }) => {

    return (
        <>
            <Header />
            <div className="min-w-screen-md mx-auto max-w-screen-lg mt-4">
                <ReportList />
            </div>
        </>


    )
}

export default Reports
