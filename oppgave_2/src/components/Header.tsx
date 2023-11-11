import Navigation from "./Navigation"

import "../style/header.scss"

const Header = () => {
    return(
    <div className="container flex justify-between items-center gap-7">
        <h1 className="container__title">Dashboard</h1>
        <Navigation />
    </div>
    )
}

export default Header