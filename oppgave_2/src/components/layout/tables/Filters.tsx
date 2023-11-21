import { useState } from "react"
import "@/style/filters.scss"

const Filters = () => {
    const [selectedTag, setSelectedTag] = useState("");
    const [selectedReportStatus, setSelectedReportStatus] = useState("");
    const [selectedSortBy, setSelectedSortBy] = useState("");

    return (
        <div className="filter">
            <select 
                className="filter__dropdown" 
                name="Tag"
                value={selectedTag}
                onChange={e => setSelectedTag(e.target.value)}
            >
                <option value="" disabled>Tag</option>
                <option value="tag1">Tag 1</option>
            </select>

            <select 
                className="filter__dropdown" 
                name="Report Status"
                value={selectedReportStatus}
                onChange={e => setSelectedReportStatus(e.target.value)}
            >
                <option value="" disabled>Report Status</option>
                <option value="status1">Status 1</option>
            </select>

            <select 
                className="filter__dropdown" 
                name="Sort By"
                value={selectedSortBy}
                onChange={e => setSelectedSortBy(e.target.value)}
             >
                <option value="" disabled>Sort By</option>
                <option value="sort1">Sort 1</option>
        </select>
    </div>
    )
}

export default Filters