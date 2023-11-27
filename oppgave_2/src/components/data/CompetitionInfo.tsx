import { Goal } from "@/types/classes/goal"
import "@/style/popup.scss"
import { PriorityEnum } from "@/enums/PriorityEnum"

type CompetitionProp = {
    data: {
        label: string
        value?: string | null | PriorityEnum
    }[]
}

const CompetitionInfo = ({ data }: CompetitionProp) => {

    return (
        <div className="flex flex-col gap-3">
            {data.map((item, index) => (
                <span className="info" key={index}>
                    <b>{item.label}:</b> {item.value}
                </span>
            ))}
        </div>
    )
}

export default CompetitionInfo