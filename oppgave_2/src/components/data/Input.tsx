import React from "react"
import "../../style/input.scss"

type InputProps = {
    elements: string[]
    fieldMapping: Record<string, string>
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

// Reusable input component.
const Input = ({ elements, handleChange, fieldMapping }: InputProps) => {

    return(
        <div className="input flex flex-col gap-3">
            {elements.map((element, index) => (
                <React.Fragment key={index}>
                    <label className="input__label">{element}</label>
                    <input 
                        className="input__value" 
                        type="text" 
                        name={fieldMapping[element]}
                        placeholder="..."
                        onChange={handleChange}
                    />
                </React.Fragment>
            ))}
        </div>
    )
}

export default Input