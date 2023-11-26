import React from "react"
import "@/style/input.scss"

type InputProps = {
    elements: string[]
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

// Reusable input component.
const Input = ({ elements, handleChange,  }: InputProps) => {

    return(
        <div className="input flex flex-col gap-5">
            {elements.map((element, index) => (
                <React.Fragment key={index}>
                    <div className="input__container flex items-center w-full">
                        <label className="input__label w-1/5 mr-4">{element}:</label>
                        <input 
                            className="input__value flex-grow" 
                            type="text" 
                            name={element === "Competition" ? "isCompetition" : element.toLocaleLowerCase()}
                            placeholder={
                                element === "Date" ? "yyyy-mm-dd" : `Enter ${element}...` &&
                                element === "Competition" ? "yes/no" : `Enter ${element}`
                            }
                            onChange={handleChange}
                        />
                    </div>
                </React.Fragment>
            ))}
        </div>
    )
}

export default Input