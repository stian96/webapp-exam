import { useContext } from "react"
import { ActivityContext } from "@/hooks/ActivityContext"

import "@/style/activity.scss"

type ActivityProps = {
    id: number
}

const Activity = ({ id }: ActivityProps) => {
    const { selectedActivities, toggleActivity } = useContext(ActivityContext)

    const buttons = ["Duplicate", "Edit", "Delete", "Create Report"]

    const handleChange = () => {
        toggleActivity(id)
    }

    const isChecked = selectedActivities.includes(id)

    return (
        <div className="activity-cont flex justify-between items-center gap-8 px-8">
            <input 
                className="activity-cont__checkbox p-2" 
                type="checkbox" 
                id={`activityCheckbox-${id}`}
                name="activityCheckbox"
                onChange={handleChange}
                checked={isChecked}
            />
            <div className="activity flex justify-between w-full">
                <span className="activity__id">{`Activity ${id}`}</span>
                <div className="activity__container flex gap-5">
                    {buttons.map((name, index) => (
                        <button className="activity__container-button" key={index}>{name}</button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Activity