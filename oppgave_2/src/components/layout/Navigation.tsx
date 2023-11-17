import Link from "next/link"

import "@/style/navigation.scss"

import { FileText, HelpCircle, Home, User } from "lucide-react"

const Navigation = () => {
  // Maybe we can place this in its own file later.
  const navElements = [
    { name: "Home", path: "/", icon: <Home /> },
    { name: "Create Template", path: "/create-template", icon: <FileText /> },
    { name: "Create Question", path: "/create-question", icon: <HelpCircle /> },
    { name: "Create Performer", path: "/create-performer", icon: <User /> },
  ]

  return (
    <div className="navigation">
      <ul className="navigation__list flex justify-between">
        {navElements.map((element, index) => (
          <li key={index} className="navigation__list-item">
            <Link href={element.path} className="flex gap-2">
              {element.icon}
              {element.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Navigation
