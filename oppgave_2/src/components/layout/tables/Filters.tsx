import { ChangeEvent, useState } from "react"

import "@/style/filters.scss"

type FiltersProps = {
  tags: string[]
  types: string[]
  sortAsc: () => void
  sortDesc: () => void
}

const Filters = ({ tags, types, sortAsc, sortDesc }: FiltersProps) => {
  const [selectedTag, setSelectedTag] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [selectedReportStatus, setSelectedReportStatus] = useState("")
  const [selectedSortBy, setSelectedSortBy] = useState("")

  const handleSortBy = (event: ChangeEvent<HTMLInputElement>) => {
    const sortByString = event.target.value
    setSelectedSortBy(event.target.value)

    if (sortByString == "Date Asc") {
      sortAsc()
    } else if (sortByString == "Date Desc") {
      sortDesc()
    }
  }

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
        onChange={(e) => {
          handleSortBy(e)
        }}
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
