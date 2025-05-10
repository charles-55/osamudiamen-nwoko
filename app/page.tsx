import { About, Contact, Hero, Projects, Skills, WorkExperience } from "@/components/portfolio-sections"

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

