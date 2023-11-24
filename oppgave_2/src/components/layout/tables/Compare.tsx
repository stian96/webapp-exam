import Activity from "./Activity"
import Filters from "./Filters"

import "@/style/compare.scss"

type CompareProps = {
  performerId: string
}

const Compare = ({ performerId }: CompareProps) => {
  // TODO: Replace dummy data.
  const activities = ["1", "2", "3"]

  return (
    <table className="compare">
      <tbody className="compare__body">
        <tr className="compare__body-row flex items-center justify-between">
          <td className="compare__body-data">Compare</td>
          <td className="compare__body-data filter-container flex items-center justify-end gap-8">
            <span>Filters</span>
            <Filters />
          </td>
        </tr>
        <tr className="activity-table">
          <td className="mb-5">
            {activities.map((activity, index) => (
              <Activity key={index} id={activity} />
            ))}
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default Compare
