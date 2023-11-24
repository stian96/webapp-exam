import { useState } from "react"

import "@/style/filters.scss"

type FiltersProps = {
  tags: string[]
  types: string[]
}

const Filters = ({ tags, types }: FiltersProps) => {
  const [selectedTag, setSelectedTag] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [selectedReportStatus, setSelectedReportStatus] = useState("")
  const [selectedSortBy, setSelectedSortBy] = useState("")

  return (
    <div className="filter">
      <select
        className="filter__dropdown"
        name="Tag"
        value={selectedTag}
        onChange={(e) => setSelectedTag(e.target.value)}
      >
        <option value="" disabled>
          Tag
        </option>
        <option value="None">None</option>
        {tags.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>

      <select
        className="filter__dropdown"
        name="Tag"
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="" disabled>
          Type
        </option>
        <option value="None">None</option>
        {types.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>

      <select
        className="filter__dropdown"
        name="Report Status"
        value={selectedReportStatus}
        onChange={(e) => setSelectedReportStatus(e.target.value)}
      >
        <option value="" disabled>
          Report Status
        </option>
        <option value="No report">No report</option>
        <option value="NO">No</option>
        <option value="LOW">Low</option>
        <option value="NORMAL">Normal</option>
        <option value="HIGH">High</option>
      </select>

      <select
        className="filter__dropdown"
        name="Sort By"
        value={selectedSortBy}
        onChange={(e) => setSelectedSortBy(e.target.value)}
      >
        <option value="" disabled>
          Sort By
        </option>
        <option value="Date Asc">Date Asc</option>
        <option value="Date Desc">Date Desc</option>
      </select>
    </div>
  )
}

export default Filters
