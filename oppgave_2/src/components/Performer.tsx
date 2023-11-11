import "../style/performer.scss"

type PerformerProps = {
    name: string
}

const Performer = ({ name }: PerformerProps) => {
    return(
        <div className="performer w-full">
            <p className="performer__name">{name}</p>
        </div>
    )
}

export default Performer