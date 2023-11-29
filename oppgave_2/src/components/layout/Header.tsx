"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import Navigation from "./Navigation"

import "@/style/header.scss"

type HeaderProps = {
  title: string
}

const Header = ({ title }: HeaderProps) => {
  const [isScrolling, setIsScrolling] = useState(true)
  let lastScrollPos = 0

  useEffect(() => {
    const event = "scroll"
    const handleScroll = () => {
      const currentPos = window.scrollY

      if (currentPos > lastScrollPos) 
        setIsScrolling(false)
      else 
        setIsScrolling(true)
      
      lastScrollPos = currentPos <= 0 ? 0 : currentPos
    }
    window.addEventListener(event, handleScroll)
    return () => window.removeEventListener(event, handleScroll)
  }, [])

  return (
    <div className={`container flex items-center justify-between gap-7 ${!isScrolling ? 'hide' : ''}`}>
      <div className="container__left flex items-center">
        {/* Logo generated by: OpenAI. (2023). ChatGPT [DALL-E] https://chat.openai.com/g/g-2fkFE8rbu-dall-e */}
        <Image
          className="container__logo"
          src="/logo.png"
          alt="Logo"
          width={60}
          height={60}
          priority
        />
        <h1 className="container__title">{title}</h1>
      </div>
      <Navigation />
    </div>
  )
}

export default Header
