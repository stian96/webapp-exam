import "../../style/filters.scss"

const Filters = () => {
    return (
        <div className="filter">
            <select className="filter__dropdown" name="Tag">
                <option value="" disabled selected>Tag</option>
                <option value="tag1">Tag 1</option>
                <option value="tag2">Tag 2</option>
                <option value="tag3">Tag 3</option>
            </select>
            <select className="filter__dropdown" name="Report Status">
                <option value="" disabled selected>Report Status</option>
                <option value="status1">Status 1</option>
                <option value="status2">Status 2</option>
                <option value="status3">Status 3</option>
            </select>
            <select className="filter__dropdown" name="Sort By">
                <option value="" disabled selected>Sort By</option>
                <option value="sort1">Sort 1</option>
                <option value="sort2">Sort 2</option>
                <option value="sort3">Sort 3</option>
            </select>
        </div>
    )
}

export default Filters