"use client"

import Link from "next/link"

import "@/style/card.scss"
import "@/style/report.scss"

import { Icons } from "@/components/icons"

export default function ReportLists() {

  //Added this id for now to see how the component is rendering
    const reportIds = ["76170371-59fa-47ba-b42c-97736c888891", "2", "3"]

    console.log("reportid ", reportIds)
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
