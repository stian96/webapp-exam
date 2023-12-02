"use client"

import ReportCard from "@/components/Report/ReportCard";
import "@/style/card.scss"
import { Header } from "@/components"

const ReportDetail = ({ params }) => {
    const { id } = params;

    return (
        <>
            <Header title={"Report"} />
            <div className="min-w-screen-md mx-auto max-w-screen-lg mt-4">
                <ReportCard id={id as string} />
            </div>

        </>

    );
}

export default ReportDetail;