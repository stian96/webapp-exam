import { IntensityZone } from "@/types/performer"

type DropDownProps = {
    selectedZone: IntensityZone | "all"
    handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const DropDown = ({ selectedZone, handleSelectChange }: DropDownProps) => {

    return (
        <>
            <select className="unique" value={selectedZone} onChange={handleSelectChange}>
                <option value="all">All Zones</option>
                <option value={IntensityZone.Zone1}>Zone 1</option>
                <option value={IntensityZone.Zone2}>Zone 2</option>
                <option value={IntensityZone.Zone3}>Zone 3</option>
                <option value={IntensityZone.Zone4}>Zone 4</option>
                <option value={IntensityZone.Zone5}>Zone 5</option>
            </select>
        </>
    )
}

export default DropDown