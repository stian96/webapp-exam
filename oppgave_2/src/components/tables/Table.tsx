"use client"
import React, { useState, useContext } from "react"
import Link from "next/link"
import Performer from "@/components/Performer"
import { ActivityContext } from "@/hooks/ActivityContext"

import "@/style/table.scss"

type TableProp = {
    searchQuery: string
}

const Table = ({ searchQuery }: TableProp) => {
    const [editMode, setEditMode] = useState<any>(null)
    const { selectedActivities } = useContext(ActivityContext)

    const handleEditClick = (index: number) => {
        setEditMode(editMode === index ? null : index)
    }

    // TODO: Replace dummy data.
    const performers = [
        { id: "Performer A", name: "Jake", gender: "Male", sport: "Running" },
        { id: "Performer B", name: "Karen", gender: "Female", sport: "Crossfit" },
        { id: "Performer C", name: "Josh", gender: "Male", sport: "Football" },
        { id: "Performer D", name: "Betty", gender: "Female", sport: "Handball" }
    ]

    const search = searchQuery.toLocaleLowerCase()
    const filteredPerformers = performers.filter((performer) => performer.id.toLocaleLowerCase().includes(search))

    return(
        <table className="table w-full max-w-7xl mx-auto border">
            <tbody className="table__body">
                {filteredPerformers.map((performer, index) => (
                    <React.Fragment key={`performer-fragment-${index}`}>
                        <tr>
                            <td className="table__body-data flex justify-between p-4">
                                {performer.id}
                                <Link className="table__body-link" href="/sessions">Sessions</Link>
                                <Link className="table__body-link" href="/reports">Reports</Link>
                                <button 
                                className="table__body-button" 
                                type="button"
                                onClick={() => handleEditClick(index)}>Show</button>
                            </td>
                        </tr>
                        {editMode === index && (
                        <Performer performer={performer} />
                    )}
                </React.Fragment>
                ))}
            </tbody>
            { selectedActivities.length == 2 && (
            <td className="table__compare flex justify-end">
                <button className="table__compare-button">
                    Compare Activities
                </button>
            </td>
            )}
        </table>
    )
}

export default Table