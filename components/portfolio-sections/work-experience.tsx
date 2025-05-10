"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"
import workData from "@/data/work.json"

export function WorkExperience() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = 400
    const newPosition =
      direction === "left"
        ? Math.max(scrollPosition - scrollAmount, 0)
        : Math.min(scrollPosition + scrollAmount, container.scrollWidth - container.clientWidth)

    container.scrollTo({
      left: newPosition,
      behavior: "smooth",
    })

    setScrollPosition(newPosition)
  }

  return (
    <section id="experience" className="bg-muted py-20">
      <div className="container px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center text-3xl font-bold tracking-tight"
        >
          Work Experience
        </motion.h2>

        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {workData.map((job, index) => (
              <Card key={index} className="min-w-[300px] max-w-[400px] flex-shrink-0 md:min-w-[350px]">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="relative h-12 w-12 overflow-hidden rounded-md">
                      <div className="flex h-full w-full items-center justify-center bg-primary/10 text-xl font-bold text-primary">
                        {job.company.charAt(0)}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {job.startDate} - {job.endDate || "Present"}
                    </div>
                  </div>
                  <h3 className="mb-1 text-xl font-semibold">{job.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{job.company}</p>
                  <p className="mb-4 text-sm">{job.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.slice(0, 4).map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                    {job.skills.length > 4 && <Badge variant="outline">+{job.skills.length - 4}</Badge>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {scrollPosition > 0 && (
            <Button
              variant="secondary"
              size="icon"
              className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full md:flex"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Scroll left</span>
            </Button>
          )}

          {scrollPosition < workData.length - 1 && (
            <Button
              variant="secondary"
              size="icon"
              className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full md:flex"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Scroll right</span>
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}

