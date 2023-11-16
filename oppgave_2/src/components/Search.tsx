import "../style/search.scss"

const Search = () => {
    return(
    <div className="search flex justify-center items-center gap-2">
        <input className="search__input" placeholder="Search for performer..." />
        <button className="search__button" type="button">Search</button>
    </div>
    )
}

export default Search