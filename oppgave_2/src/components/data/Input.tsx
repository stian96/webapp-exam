import React from "react"
import { PriorityEnum } from "@/enums/PriorityEnum"
import "@/style/input.scss"

type InputProps = {
    elements: {
        name: string
        type: string
    }[]
    handleChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void
    errors: Record<string, string>
}

// Reusable input component.
const Input = ({ elements, handleChange, errors }: InputProps) => {

    return (
        <div className="input flex flex-col gap-5">
            {elements.map((element, index) => (
                <React.Fragment key={index}>
                    <div className="input__container flex items-center w-full">
                        <label className="input__label w-1/5 mr-4">{element.name}:</label>
                        {element.type === "select" ? (
                            <select
                                className="input__value flex-grow mr-2"
                                name={element.name}
                                onChange={handleChange}
                            >
                                {Object.values(PriorityEnum).map((value) => (
                                    <option key={value} value={value}>{`Priority: ${value}`}</option>
                                ))}
                            </select>

                        ): (
                            <h1>Hello</h1>
                        )}
                        <input 
                            className="input__value flex-grow mr-2"
                            type={element.type} 
                            name={element.name === "Competition" ? "isCompetition" : element.name.toLocaleLowerCase()}
                            placeholder={
                                errors[element.name.toLocaleLowerCase()]
                                    ? errors[element.name.toLocaleLowerCase()]
                                    : element.name === "Date" ? "yyyy-mm-dd" : `Enter ${element}...` 
                            }
                            onChange={handleChange}
                        />
                        {errors[element.name.toLocaleLowerCase()] && (
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