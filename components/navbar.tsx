"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Menu, X } from "lucide-react"
import { Logo } from "./logo"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <Logo />
        <nav className="hidden md:flex md:items-center md:gap-6">
          <button className="text-sm font-medium hover:text-primary" onClick={() => scrollToSection("about")}>
            About
          </button>
          <button className="text-sm font-medium hover:text-primary" onClick={() => scrollToSection("experience")}>
            Experience
          </button>
          <button className="text-sm font-medium hover:text-primary" onClick={() => scrollToSection("projects")}>
            Projects
          </button>
          <button className="text-sm font-medium hover:text-primary" onClick={() => scrollToSection("contact")}>
            Contact
          </button>
          <div className="flex items-center gap-4">
            <a href="https://github.com/charles-55" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/osamudiamen-nwoko/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </nav>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 bg-background">
            <div className="container flex h-16 items-center justify-between px-4">
              <Logo />
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                <X className="h-6 w-6" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>
            <nav className="container flex flex-col items-center gap-6 px-4 py-8 bg-background/75">
              <button
                className="text-lg font-medium"
                onClick={() => {
                  scrollToSection("about");
                  closeMenu()
                }}
              >
                About
              </button>
              <button
                className="text-lg font-medium"
                onClick={() => {
                  scrollToSection("experience");
                  closeMenu()
                }}
              >
                Experience
              </button>
              <button
                className="text-lg font-medium"
                onClick={() => {
                  scrollToSection("projects");
                  closeMenu()
                }}
              >
                Projects
              </button>
              <button
                className="text-lg font-medium"
                onClick={() => {
                  scrollToSection("contact");
                  closeMenu()
                }}
              >
                Contact
              </button>
              <div className="mt-4 flex items-center gap-6">
                <a href="https://github.com/charles-55" target="_blank" rel="noopener noreferrer">
                  <Github className="h-6 w-6" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/osamudiamen-nwoko/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-6 w-6" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

