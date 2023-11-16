import "../style/goals.scss"

const Goals = () => {
    return(
    <table className="goals w-full">
        <tbody className="goals-body">
            <tr>
                <td className="goals__body-data flex justify-between p-4">
                    Goals
                    <button className="goals__body-button" type="button">Create</button>
                </td>
            </tr>
        </tbody>
    </table>
    )
}

export default Goals