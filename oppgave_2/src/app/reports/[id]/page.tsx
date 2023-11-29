"use client"

import ReportCard from "@/components/Report/ReportCard";
import "@/style/card.scss"
import { Header } from "@/components"
import Link from "next/link";

const ReportDetail = ({ params }) => {
    const { id } = params;

    return (
        <>
            <Link href="/">
                <Header title={"Report"} />
            </Link>
            <div className="min-w-screen-md mx-auto max-w-screen-lg mt-4">
                <ReportCard id={id as string} />
            </div>

        </>

    );
}

export default ReportDetail;