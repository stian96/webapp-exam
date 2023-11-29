import { useState, useEffect } from "react"

const useScrollDirection = () => {
    const [isScrolling, setIsScrolling] = useState(true)

    useEffect(() => {
        let lastPos = 0
        const event = "scroll"

        const handleScroll = () => {
            const currentPos = window.scrollY
            
            if (currentPos > lastPos)
                setIsScrolling(false)
            else
                setIsScrolling(true)

            lastPos = currentPos
        }
        window.addEventListener(event, handleScroll)
        return () => window.removeEventListener(event, handleScroll)
    }, [])

    return isScrolling
}

export default useScrollDirection