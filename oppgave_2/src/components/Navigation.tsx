import "../style/navigation.scss"

const Navigation = () => {
    const navElements = ["Home", "Create Template", "Create Question", "Create Performer"]

    return(
        <div className="navigation m-auto">
            <ul className="navigation__list flex justify-between">
                { navElements.map((element, index) => (
                    <li key={index} className="navigation__list-item px-12">
                        {element}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Navigation