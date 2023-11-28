
type CheckBoxProps = {
    type: string
    id: string
    value: string
    labelValue: string
}

const CheckBox = ({ type, id, value, labelValue }: CheckBoxProps) => {

    return (
        <div className="checkbox-container">
            <input type={type} id={id} name={id} value={value} />
            <label htmlFor={id}>{labelValue}</label>
        </div>
    )
}

export default CheckBox