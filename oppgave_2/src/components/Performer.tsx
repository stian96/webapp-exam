import Goals from "./tables/Goals"
import EditPopup from "./EditPopup"
import { useState } from "react"
import { Performer } from "../components/tables/Table"
import "../style/performer.scss"

export type PerformerProps = {
    performer: {
        id: string,
        name: string,
        gender: string,
        sport: string
    }
    performers: Performer[]
    setPerformers: React.Dispatch<React.SetStateAction<Performer[]>>
}

const Performer = ({ performer, performers, setPerformers }: PerformerProps) => {
    const [editPerformer, setEditPerformer] = useState(performer)

    const updatePerformer = () => {
        const updatedPerformers = performers.map((p) => p.id === performer.id ? editPerformer : p)
        setPerformers(updatedPerformers)
    }

    return(
    <>
        <EditPopup 
            editPerformer={editPerformer} 
            setEditPerformer={setEditPerformer}
            handleSave={updatePerformer}
        />
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