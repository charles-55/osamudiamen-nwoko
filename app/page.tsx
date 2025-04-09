import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { WorkExperience } from "@/components/work-experience"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <WorkExperience />
      <Skills />
      <Projects />
      <Contact />
    </main>
  )
}

