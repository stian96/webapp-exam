"use client"
import React from "react"
import { useState } from "react"
import Link from "next/link"
import Performer from "../Performer"
import "../../style/table.scss"

const Table = () => {
    const [editMode, setEditMode] = useState<any>(null)

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

    return(
        <table className="table w-full max-w-7xl mx-auto border">
            <tbody className="table__body">
                {performers.map((performer, index) => (
                    <React.Fragment key={`performer-fragment-${index}`}>
                        <tr>
                            <td className="table__body-data flex justify-between p-4">
                                {performer.id}
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
                                <Performer performer={performer} />
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