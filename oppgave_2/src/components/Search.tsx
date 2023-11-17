"use client"
import React, { useState } from "react"
import "../style/search.scss"

type SearchQueryProps = {
    setSearchQuery: (text: string) => void
}

const Search = ({ setSearchQuery }: SearchQueryProps) => {
    const [localQuery, setLocalQuery] = useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalQuery(event.target.value);
    };


    const handleSearch = () => {
        setSearchQuery(localQuery)
    }

    return(
    <div className="search flex justify-center items-center gap-2">
        <input 
            className="search__input" 
            placeholder="Search for performer..."
            value={localQuery}
            onChange={handleInputChange}
        />
        <button 
            className="search__button" 
            type="button"
            onClick={handleSearch}>
                Search
        </button>
    </div>
    )
}

export default Search