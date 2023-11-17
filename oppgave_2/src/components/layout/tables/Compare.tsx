import Filters from "./Filters"
import Activity from "./Activity"
import "@/style/compare.scss"

const Compare = () => {

    // TODO: Replace dummy data.
    const activities = [1, 2, 3]
    
    return (
        <table className="compare">
            <tbody className="compare__body">
                <tr className="compare__body-row flex justify-between items-center">
                    <td className="compare__body-data">Compare</td>
                    <td className="compare__body-data filter-container flex justify-end items-center gap-8">
                        <span>Filters</span>
                        <Filters />
                    </td>
                </tr>
                <tr className="activity-table">
                    <div className="mb-5">
                        { activities.map((activity, index) =>  (
                            <Activity key={index} id={activity} />
                        ))}
                    </div>
                </tr>
            </tbody>
        </table>
    )
}

export default Compare