import { useState } from "react"
import { Goals, EditPopup } from "@/components"
import { Performer } from "@/types/performer"
import { updatePerformerInDatabase } from "@/lib/api"
import "@/style/performer.scss"

export type PerformerProps = {
    performers: Performer[]
    setPerformers: React.Dispatch<React.SetStateAction<Performer[]>>
}

const Performer = ({ performers, setPerformers }: PerformerProps) => {
    const [editPerformer, setEditPerformer] = useState(performers[0])  

    const updatePerformer = async () => {
        const success = await updatePerformerInDatabase(editPerformer)
        if (success) {
            const updatedPerformers = performers.map((p) => p.id === performers[0].id ? editPerformer : p)
            setPerformers(updatedPerformers)
        }
        else {
            console.error(`Failed to update performer with ID: ${editPerformer.userId}`)
        }
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