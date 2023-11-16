import Filters from "./Filters"
import "../../style/compare.scss"

const Compare = () => {
    return (
        <table className="compare mt-5">
            <tbody className="compare__body">
                <tr className="compare__body-row flex justify-between">
                    <td className="compare__body-data">Compare</td>
                    <td className="compare__body-data flex justify-end items-center gap-8">
                        Filters
                        <Filters />
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default Compare