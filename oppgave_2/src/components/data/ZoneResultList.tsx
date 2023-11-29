import { IntensityZone } from "@/types/performer"

type ZoneProps = {
    option: boolean
    array: number[]
    all: boolean
    key: string
    title: string
    selectedZone: IntensityZone | "all"
}

const ZoneResultList = ({ option, array, all, key, title, selectedZone }: ZoneProps) => {

    const mapSelectedZone = (zone: IntensityZone | "all") => {
        let result = ""
        switch (Number(zone)) {
            case 50: result = "Zone 1"
                break
            case 60: result = "Zone 2"
                break
            case 70: result = "Zone 3"
                break
            case 80: result = "Zone 4"
                break
            case 90: result = "Zone 5"
                break
            default: result = "Unknown"
        }
        return result
    }

    return (
        <>
            { option && array.length > 0 && (
                <div className="flex flex-col">
                    <h1 className="mb-4">{title}</h1>
                    { array.map((item, index) => (
                        <span className="flex mb-2" key={`${key}-${index}`} >
                            {all ? `Zone: ${index + 1}` : mapSelectedZone(selectedZone)}: {item.toFixed(1)}
                        </span>
                    ))}
                </div>
            )}
        </>
    )
}

export default ZoneResultList