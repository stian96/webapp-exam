import "@/style/checkbox.scss"

type CheckBoxProps = {
    id: string
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    checked: boolean
}

const CheckBox = ({ id, value, onChange, checked }: CheckBoxProps) => {

    return (
        <div className="checkbox-container flex items-center gap-3">
            <input 
                className="checkbox-container__input" 
                type="checkbox" 
                id={id} 
                name={id} 
                value={value}
                onChange={onChange}
                checked={checked} 
            />
            <label className="checkbox-container__label" htmlFor={id}>{value}</label>
        </div>
    )
}

export default CheckBox