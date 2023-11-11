
const Table = () => {

    const performers = [
        { name: "Perfomer A", gender: "Male", sport: "Running" },
        { name: "Performer B", gender: "Female", sport: "Crossfit" },
        { name: "Performer C", gender: "Male", sport: "Football" },
        { name: "Performer D", gender: "Female", sport: "Handball" }
    ]

    return(
        <table className="table">
            <thead className="table__head">
                <tr className="table__head-row">
                    <th className="table__head-cell">Name</th>
                    <th className="table__head-cell">Gender</th>
                    <th className="table__head-cell">Sport</th>
                </tr>
            </thead>
            <tbody className="table__body">
                {performers.map((performer, index) => (
                    <tr key={index}>
                        <td>{performer.name}</td>
                        <td>{performer.gender}</td>
                        <td>{performer.sport}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table