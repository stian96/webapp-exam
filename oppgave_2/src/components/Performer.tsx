import { Goals, EditPopup } from "@/components"
import { useState } from "react"
import { Performer } from "../types/performer"
import "../style/performer.scss"

export type PerformerProps = {
    performers: Performer[]
    setPerformers: React.Dispatch<React.SetStateAction<Performer[]>>
}

const Performer = ({ performers, setPerformers }: PerformerProps) => {
    const [editPerformer, setEditPerformer] = useState(performers[0])  

    const updatePerformer = () => {
        const updatedPerformers = performers.map((p) => p.id === performers[0].id ? editPerformer : p)
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
            <p className="performer__name">ID: {editPerformer.userId}</p>
            <p className="performer__gender">Gender: {editPerformer.gender}</p>
            <p className="performer__sport">Sport: {editPerformer.sport}</p>
            <Goals />
        </div>
    </>
    )
}

export default Performer