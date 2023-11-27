import { Goal } from "@/types/classes/goal"
import { Performer } from "@/types/performer"
import React from "react"
import "../../style/input.scss"

type InputEditProps = {
    elements: string[]
    errors: Record<string, string>
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    performer: Performer
}

const InputEdit = ({ elements, errors, handleChange, performer  }: InputEditProps) => {

    return(
        <div className="input flex flex-col gap-3">
            {elements.map((element, index) => (
                <React.Fragment key={index}>
                    <div className="input__container flex items-center w-full">
                        <label className="input__label w-1/5 mr-4">{element}</label>
                        <input 
                            className="input__value flex-grow mr-4" 
                            type="text" 
                            name={element === "User ID" ? "userId" : element.toLocaleLowerCase()}
                            value={`${performer[element === "User ID" ? "userId" : element.toLocaleLowerCase() as keyof Performer]}`}
                            placeholder={
                                errors[element === "User ID" ? "userId" : element.toLocaleLowerCase()]
                                        ? errors[element === "User ID" ? "userId" : element.toLocaleLowerCase()]
                                        : `Enter ${element}...`
                            }
                            onChange={handleChange}
                        />
                        {errors[element === "User ID" ? "userId" : element.toLocaleLowerCase()] && (
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

export default InputEdit