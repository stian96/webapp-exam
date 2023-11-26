import React from "react"
import "@/style/input.scss"

type InputProps = {
    elements: string[]
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    errors: Record<string, string>
}

// Reusable input component.
const Input = ({ elements, handleChange, errors }: InputProps) => {

    return (
        <div className="input flex flex-col gap-5">
            {elements.map((element, index) => (
                <React.Fragment key={index}>
                    <div className="input__container flex items-center w-full">
                        <label className="input__label w-1/5 mr-4">{element}:</label>
                        <input 
                            className="input__value flex-grow mr-2"
                            type="text" 
                            name={element === "Competition" ? "isCompetition" : element.toLocaleLowerCase()}
                            placeholder={
                                errors[element.toLocaleLowerCase()]
                                    ? errors[element.toLocaleLowerCase()]
                                    : element === "Date" ? "yyyy-mm-dd" : `Enter ${element}...` 
                            }
                            onChange={handleChange}
                        />
                        {errors[element.toLocaleLowerCase()] && (
                            <span className="error-message">
                                {"*"}
                            </span>
                        )}
                    </div>
                </React.Fragment>
            ))}
        </div>
    )
}

export default Input