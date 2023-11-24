import { ChangeEvent, useState } from "react"

import "@/style/filters.scss"

type FiltersProps = {
  tags: string[]
  types: string[]
  sortAsc: () => void
  sortDesc: () => void
  filterType: (type: string) => void
  filterTag: (tag: string) => void
  filterReport: (reportStatus: string) => void
  resetResults: () => void
}

const Filters = ({
  tags,
  types,
  sortAsc,
  sortDesc,
  filterType,
  filterTag,
  filterReport,
  resetResults,
}: FiltersProps) => {
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

  const handleType = (event: ChangeEvent<HTMLInputElement>) => {
    const typeString = event.target.value
    setSelectedType(event.target.value)

    filterType(typeString)
  }

  const handleTag = (event: ChangeEvent<HTMLInputElement>) => {
    const tagString = event.target.value
    setSelectedTag(event.target.value)

    filterTag(tagString)
  }

  const handleReport = (event: ChangeEvent<HTMLInputElement>) => {
    const reportString = event.target.value
    setSelectedReportStatus(event.target.value)

    filterReport(reportString)
  }

  const handleReset = () => {
    setSelectedTag("")
    setSelectedReportStatus("")
    setSelectedSortBy("")
    setSelectedType("")

    resetResults()
  }

  return (
    <div className="filter">
      <button
        onClick={handleReset}
        className="mr-4 h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white"
      >
        X
      </button>
      <select
        className="filter__dropdown"
        name="Tag"
        value={selectedTag}
        onChange={(e) => {
          handleTag(e)
        }}
      >
        <option value="" disabled>
          Tag
        </option>
        {tags.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>

      <select
        className="filter__dropdown"
        name="Type"
        value={selectedType}
        onChange={(e) => {
          handleType(e)
        }}
      >
        <option value="" disabled>
          Type
        </option>
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
        onChange={(e) => {
          handleReport(e)
        }}
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
