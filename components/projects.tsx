"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion";
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, PlusIcon } from "lucide-react"
import projectsData from "@/data/projects.json"

export function Projects() {
  const [visibleProjects, setVisibleProjects] = useState(6)

  const showMoreProjects = () => {
    setVisibleProjects((prev) => Math.min(prev + 3, projectsData.length))
  }

  return (
    <section id="projects" className="bg-muted py-20">
      <div className="container px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center text-3xl font-bold tracking-tight"
        >
          Projects
        </motion.h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projectsData.slice(0, visibleProjects).map((project, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative h-48 w-full">
                <Image src={project.image || "/logo.png"} alt={project.title} fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <h3 className="mb-2 text-xl font-semibold">{project.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{project.description}</p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.skills.slice(0, 3).map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                  {project.skills.length > 3 && <Badge variant="outline">+{project.skills.length - 3}</Badge>}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between p-6 pt-0">
                {project.link && (
                  <Button asChild variant="outline" size="sm">
                    <Link href={project.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Project
                    </Link>
                  </Button>
                )}
                {project.github && (
                  <Button asChild variant="ghost" size="sm">
                    <Link href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Source Code
                    </Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        {visibleProjects < projectsData.length && (
          <div className="mt-10 flex justify-center">
            <Button onClick={showMoreProjects}><PlusIcon />Load More</Button>
          </div>
        )}
      </div>
    </section>
  )
}

