"use client"
import React from "react"
import { useState } from "react"
import Link from "next/link"
import Performer from "../components/Performer"
import "../style/table.scss"

const Table = () => {
    const [editMode, setEditMode] = useState<any>(null)

    const handleEditClick = (index: number) => {
        setEditMode(editMode === index ? null : index)
    }

    const performers = [
        { name: "Performer A", gender: "Male", sport: "Running" },
        { name: "Performer B", gender: "Female", sport: "Crossfit" },
        { name: "Performer C", gender: "Male", sport: "Football" },
        { name: "Performer D", gender: "Female", sport: "Handball" }
    ]

    return(
        <table className="table w-full max-w-7xl mx-auto border">
            <tbody className="table__body">
                {performers.map((performer, index) => (
                    <React.Fragment key={`performer-fragment-${index}`}>
                        <tr>
                            <td className="table__body-data flex justify-between p-4">
                                {performer.name}
                                <Link className="table__body-link" href="/sessions">Sessions</Link>
                                <Link className="table__body-link" href="/reports">Reports</Link>
                                <button 
                                className="table__body-button" 
                                type="button"
                                onClick={() => handleEditClick(index)}>Edit</button>
                            </td>
                        </tr>
                        {editMode === index && (
                            <tr>
                                <td colSpan={1}>
                                    <Performer name={performer.name} />
                                </td>
                            </tr>
                        )}
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    )
}

export default Table