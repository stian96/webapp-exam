"use client"

import Link from "next/link"

import "@/style/card.scss"
import "@/style/report.scss"

import { Icons } from "@/components/icons"

export default function ReportLits() {
    const reportIds = ["1", "2", "3"]
    return (
        <div className="mt-24">
            {reportIds.map((id) => (
                <Link key={id} href={`/reports/${id}`} passHref>
                    <div className="card card__ReportList">
                        <Icons.clipboard size={22} />
                        Report {id}
                    </div>
                </Link>

            ))}
        </div>
    );
}
