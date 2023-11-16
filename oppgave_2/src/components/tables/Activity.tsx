import "../../style/activity.scss"

type ActivityProps = {
    id: string
}

const Activity = ({ id }: ActivityProps) => {
    const buttons = ["Duplicate", "Edit", "Delete", "Create Report"]

    return (
        <div className="activity-cont flex justify-between items-center gap-8 px-8">
            <input className="activity-cont__checkbox p-2" 
                type="checkbox" 
                id="activityCheckbox" 
                name="activityCheckbox" 
            />
            <div className="activity flex justify-between w-full">
                <span className="activity__id">{ id }</span>
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