import { useState } from "react"
import { Goals, EditPopup } from "@/components"
import { Performer } from "@/types/performer"
import { updatePerformerInDatabase } from "@/lib/api"
import "@/style/performer.scss"

export type PerformerProps = {
    performer: Performer
    performers: Performer[]
    setPerformers: React.Dispatch<React.SetStateAction<Performer[]>>
}

const Performer = ({ performer, performers, setPerformers }: PerformerProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const updatePerformer = async (updatedPerformer: Performer) => {
        const success = await updatePerformerInDatabase(updatedPerformer);
        if (success) {
            const updatedPerformers = performers.map(p => p.id === updatedPerformer.id ? updatedPerformer : p);
            setPerformers(updatedPerformers);
        } else {
            console.error(`Failed to update performer with ID: ${updatedPerformer.userId}`);
        }
    }

    const handleEditClick = () => {
        setIsEditing(true); 
    };

    const handleSave = async (updated: Performer) => {
        await updatePerformer(updated);
        setIsEditing(false);
    };    

    return (
        <tr>
            <td>
                <EditPopup 
                    editPerformer={performer} 
                    setEditPerformer={(updated) => updatePerformer(updated)}
                    handleSave={handleSave}
                />
                <div className="performer w-full">
                    <p className="performer__name">ID: {performer.userId}</p>
                    <p className="performer__gender">Gender: {performer.gender}</p>
                    <p className="performer__sport">Sport: {performer.sport}</p>
                    {!isEditing && (
                        <button onClick={handleEditClick}>Edit</button>
                    )}
                    <Goals performerId={performer.id} />
                </div>
            </td>
        </tr>
    );
}

export default Performer