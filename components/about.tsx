"use client"

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card"
import { FileText, GraduationCap } from "lucide-react"

export function About() {
  return (
    <section id="about" className="py-20">
      <div className="container px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center text-3xl font-bold tracking-tight text-white"
        >
          About Me
        </motion.h2>
        <div className="grid gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-4 text-xl font-semibold">Who I Am</h3>
            <p className="mb-6 text-muted-foreground">
              I am a passionate software developer with a strong foundation in software engineering. I enjoy solving
              complex problems and creating efficient, elegant solutions. My approach combines technical expertise with
              creative thinking to deliver high-quality software that meets user needs.
            </p>
            <p className="text-muted-foreground">
              When I'm not coding, I'm constantly learning about new technologies and best practices to stay at the
              forefront of the rapidly evolving tech landscape. I believe in writing clean, maintainable code and
              collaborating effectively with teams to build exceptional products.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="gap-2 items-center md:items-start grid grid-cols-1"
          >
            <Card>
              <CardContent className="flex items-start gap-4 p-6">
                <div className="rounded-full bg-primary/10 p-3">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Bachelor of Engineering, Software Engineering</h4>
                  <p className="text-sm text-muted-foreground">Carleton University</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-start gap-4 p-6">
                <div className="rounded-full bg-primary/10 p-3">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Agile with Atlassian Jira</h4>
                  <p className="text-sm text-muted-foreground">Coursera</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-start gap-4 p-6">
                <div className="rounded-full bg-primary/10 p-3">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Python Basics for Data Science</h4>
                  <p className="text-sm text-muted-foreground">IBM</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

