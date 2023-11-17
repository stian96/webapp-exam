import Goals from "./tables/Goals"
import EditPopup from "./EditPopup"
import { useState } from "react"
import "../style/performer.scss"

export type PerformerProps = {
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
        <EditPopup editPerformer={editPerformer} setEditPerformer={setEditPerformer}/>
        <div className="performer w-full">
            <p className="performer__name">Name: {editPerformer.name}</p>
            <p className="performer__gender">Gender: {editPerformer.gender}</p>
            <p className="performer__sport">Sport: {editPerformer.sport}</p>
            <Goals />
        </div>
    </>
    )
}

export default Performer