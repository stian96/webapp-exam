import Navigation from "./Navigation"
import Image from "next/image"

import "../style/header.scss"

const Header = () => {

    return(
    <div className="container flex justify-between items-center gap-7">
        <div className="container__left flex items-center">
            <Image className="container__logo" src="/logo.png" alt="Logo" width={60} height={60}/>
            <h1 className="container__title">Dashboard</h1>
        </div>
        <Navigation />
    </div>
    )
}

export default Header