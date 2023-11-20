import React from "react"
import "../../style/input.scss"

type InputProps = {
    elements: string[]
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

// Reusable input component.
const Input = ({ elements, handleChange,  }: InputProps) => {

    return(
        <div className="input flex flex-col gap-3">
            {elements.map((element, index) => (
                <React.Fragment key={index}>
                    <label className="input__label">{element}</label>
                    <input 
                        className="input__value" 
                        type="text" 
                        name={element.toLocaleLowerCase()}
                        placeholder={
                            element === "Date" ? "yyyy-mm-dd" : `Enter ${element}...` &&
                            element === "Competition" ? "yes/no" : `Enter ${element}`
                        }
                        onChange={handleChange}
                    />
                </React.Fragment>
            ))}
        </div>
    )
}

export default Input