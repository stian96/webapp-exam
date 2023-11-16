import Filters from "./Filters"
import "../../style/compare.scss"

const Compare = () => {
    return (
        <table className="compare mt-5">
            <tbody className="compare__body">
                <tr className="compare__body-row flex justify-between items-center">
                    <td className="compare__body-data">Compare</td>
                    <td className="compare__body-data filter-container flex justify-end items-center gap-8">
                        <span>Filters</span>
                        <Filters />
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default Compare