"use client"

import React, { useContext, useState } from "react"
import Link from "next/link"

import { ActivityContext } from "@/hooks/ActivityContext"
import { Performer as PerformerType } from "../../../types/performer"
import Performer from "../../data/Performer"

import "@/style/table.scss"

type TableProp = {
  searchQuery: string
  performers: PerformerType[]
  setPerformers: React.Dispatch<React.SetStateAction<PerformerType[]>>
}

const Table = ({ searchQuery, performers, setPerformers }: TableProp) => {
  const [editMode, setEditMode] = useState<any>(null)
  const { selectedActivities } = useContext(ActivityContext)

  const handleEditClick = (index: number) => {
    setEditMode(editMode === index ? null : index)
  }

  const search = searchQuery
  const filteredPerformers = performers.filter(
    (performer) =>
      (performer.id !== undefined && performer.id.includes(search)) ||
      (performer.userId !== undefined && performer.userId.includes(search)),
  )

  return (
    <div>
      <table className="mx-auto table w-full max-w-7xl border">
        <tbody className="table__body">
          {filteredPerformers.map((performer, index) => (
            <React.Fragment key={`performer-fragment-${index}`}>
              <tr>
                <td className="table__body-data flex justify-between p-4">
                  <div className="userId-container w-52">
                    {performer.userId}
                  </div>
                  <Link
                    className="table__body-link"
                    href={`/sessions/${performer.id}`}
                  >
                    Sessions
                  </Link>
                  <Link
                    className="table__body-link"
                    href={`/reports/${performer.id}`}
                  >
                    Reports
                  </Link>
                  <button
                    className="table__body-button"
                    type="button"
                    onClick={() => handleEditClick(index)}
                  >
                    {editMode === index ? "Hide" : "Show"}
                  </button>
                </td>
              </tr>
              {editMode === index && (
                <Performer
                  performer={performer}
                  performers={performers}
                  setPerformers={setPerformers}
                />
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {selectedActivities.length >= 2 && (
        <Link href="/analysis">
          <button className="table__compare-button fixed bottom-4 right-4 text-white">
            Compare Activities
          </button>
        </Link>
      )}
    </div>
  )
}

export default Table
