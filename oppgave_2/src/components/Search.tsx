import React from "react"
import "../style/search.scss"

type SearchQueryProps = {
    searchQuery: string,
    setSearchQuery: (text: string) => void
}

const Search = ({ searchQuery, setSearchQuery }: SearchQueryProps) => {

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target !== null)
            setSearchQuery(event.target.value)

    }

    return(
    <div className="search flex justify-center items-center gap-2">
        <input 
            className="search__input" 
            placeholder="Search for performer..."
            onChange={handleInputChange}
        />
        <button className="search__button" type="button">Search</button>
    </div>
    )
}

export default Search