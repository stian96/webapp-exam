import { Performer } from "@/types/performer"
import React from "react"
import "@/style/input.scss"

type InputEditProps = {
    elements: string[]
    errors: Record<string, string>
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    performer: Performer
}

const InputEdit = ({ elements, errors, handleChange, performer  }: InputEditProps) => {

    const transformedElements = elements.map((element) => {
        let key
        switch (element) {
            case "User ID": key = "userId" 
                break
            case "Heart Rate": key = "heartRate"
                break
            default: key = element.toLocaleLowerCase()
        }
        return { original: element, key}
    })

    return(
        <div className="input flex flex-col gap-3">
            {transformedElements.map(({ original, key }, index)=> (
                <React.Fragment key={index}>
                    <div className="input__container flex items-center w-full">
                        <label className="input__label w-1/5 mr-4">{original}</label>
                        <input 
                            className="input__value flex-grow mr-4" 
                            type="text" 
                            name={key}
                            value={`${performer[key as keyof Performer]}`}
                            placeholder={ errors[key] ? errors[key] : `Enter ${key}...` }
                            onChange={handleChange}
                        />
                        {errors[key] && (<span className="error-message">{"*"}</span>)}
                    </div>
                </React.Fragment>
            ))}
        </div>
    )
}

export default InputEdit