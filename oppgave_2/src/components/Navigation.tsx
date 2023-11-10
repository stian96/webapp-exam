import Link from "next/link"
import "../style/navigation.scss"

const Navigation = () => {

    const navElements = [
        { name: "Home", path:"/" },
        { name: "Create Template", path: "/create-template" },
        { name: "Create Question", path: "/create-question" },
        { name: "Create Performer", path: "/create-performer" }
    ]

    return(
        <div className="navigation">
            <ul className="navigation__list flex justify-between">
                { navElements.map((element, index) => (
                    <li key={index} className="navigation__list-item px-12">
                        <Link href={element.path}>
                            {element.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Navigation