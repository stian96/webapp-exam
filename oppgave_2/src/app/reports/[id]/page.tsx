"use client"

import ReportCard from "@/components/report/ReportCard";
import "@/style/card.scss"
import { Header } from "@/components"

const ReportDetail = ({ params }) => {
    //const router = useRouter();
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