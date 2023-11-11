import Link from "next/link"
import "../style/table.scss"

const Table = () => {

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
                    <tr key={index}>
                        <td className="table__body-data flex justify-between p-4">
                            {performer.name}
                            <Link className="table__body-link" href="/sessions">Sessions</Link>
                            <Link className="table__body-link" href="/reports">Reports</Link>
                            <button className="table__body-button" type="button">Edit</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table