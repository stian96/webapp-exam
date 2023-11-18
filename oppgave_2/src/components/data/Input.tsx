import React from "react"
import "../../style/input.scss"

type InputProps = {
    elements: string[]
}

// Reusable input component.
const Input = ({ elements }: InputProps) => {

    return(
        <div className="input flex flex-col gap-3">
            {elements.map((element, index) => (
                <React.Fragment key={index}>
                    <label className="input__label">{element}</label>
                    <input className="input__value" type="text" placeholder="..." />
                </React.Fragment>
            ))}
        </div>
    )
}

export default Input