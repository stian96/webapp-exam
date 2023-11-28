
type CheckBoxProps = {
    id: string
    value: string
}

const CheckBox = ({ id, value }: CheckBoxProps) => {

    return (
        <div className="checkbox-container">
            <input type="checkbox" id={id} name={id} value={value} />
            <label htmlFor={id}>{value}</label>
        </div>
    )
}

export default CheckBox