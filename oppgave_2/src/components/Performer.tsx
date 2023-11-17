import Goals from "./tables/Goals"
import EditPopup from "./EditPopup"
import { useState } from "react"
import "../style/performer.scss"

type PerformerProps = {
    performer: {
        name: string,
        gender: string,
        sport: string
    }
}

const Performer = ({ performer }: PerformerProps) => {
    const [editPerformer, setEditPerformer] = useState(performer)

    return(
    <>
        <EditPopup/>
        <div className="performer w-full">
            <p className="performer__name">Name: {performer.name}</p>
            <p className="performer__gender">Gender: {performer.gender}</p>
            <p className="performer__sport">Sport: {performer.sport}</p>
            <Goals />
        </div>
    </>
    )
}

export default Performer