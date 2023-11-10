import Navigation from "./Navigation"

import "../style/header.scss"

const Header = () => {
    return(
    <div className="container flex flex-col gap-7">
        <div className="container__header">
            <h1 className="container__header-title">Dashboard</h1>
        </div>
        <Navigation />
    </div>
    )
}

export default Header