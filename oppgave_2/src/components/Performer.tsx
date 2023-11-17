import Goals from "./tables/Goals"
import "../style/performer.scss"

type PerformerProps = {
    performer: {
        name: string,
        gender: string,
        sport: string
    }
}

const Performer = ({ performer }: PerformerProps) => {
    return(
    <>
        <button className="button float-right">Edit</button>
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