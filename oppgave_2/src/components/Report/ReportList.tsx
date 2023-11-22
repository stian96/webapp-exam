"use client"

import Link from "next/link"
import "@/style/button.scss"

import ReportCard from "../Report/ReportCard"

export default function ReportLits() {
    const reportIds = ["1", "2", "3"]
    return (
        <div>
            {reportIds.map((id) => (
                <div key={id} className="mb-8">
                    <ReportCard id={id} />
                </div>

            ))}
        </div>
    );
}
