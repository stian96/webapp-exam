import "@/style/checkbox.scss"

type CheckBoxProps = {
    id: string
    value: string
}

const CheckBox = ({ id, value }: CheckBoxProps) => {

    return (
        <div className="checkbox-container flex items-center gap-3">
            <input className="checkbox-container__input" type="checkbox" id={id} name={id} value={value} />
            <label className="checkbox-container__label" htmlFor={id}>{value}</label>
        </div>
    )
}

export default CheckBox