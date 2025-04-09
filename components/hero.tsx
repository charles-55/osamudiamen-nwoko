"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown, Github, Linkedin } from "lucide-react"
import { ScrollLink } from "./scroll-link"
import Image from "next/image"

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted px-4 text-center">
      <div className="mb-6 overflow-hidden rounded-full border-4 border-primary/20 w-[200px] h-[200px]">
        <Image
          src="/profile.jpg"
          alt="Osamudiamen Nwoko"
          width={200}
          height={200}
          className="h-[200px] w-[200px] object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="max-w-3xl space-y-6">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Osamudiamen Nwoko</h1>
        <p className="text-xl text-muted-foreground md:text-2xl">
          Software Developer crafting elegant solutions to complex problems
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <button onClick={() => scrollToSection("contact")}>Contact Me</button>
          </Button>
          <Button asChild variant="outline" size="lg">
            <button onClick={() => scrollToSection("projects")}>View Projects</button>
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-4 py-4">
        <a href="https://github.com/charles-55" target="_blank" rel="noopener noreferrer">
          <Github className="h-7 w-7" />
          <span className="sr-only">GitHub</span>
        </a>
        <a href="https://www.linkedin.com/in/osamudiamen-nwoko/" target="_blank" rel="noopener noreferrer">
          <Linkedin className="h-7 w-7" />
          <span className="sr-only">LinkedIn</span>
        </a>
      </div>
      <div className="absolute bottom-8 animate-bounce">
        <button onClick={() => scrollToSection("about")} className="flex items-center justify-center rounded-full p-2">
          <ChevronDown className="h-8 w-8" />
        </button>
      </div>
    </section>
  )
}

