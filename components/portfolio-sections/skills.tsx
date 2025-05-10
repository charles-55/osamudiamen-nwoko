"use client";

import { motion } from "framer-motion";
import { SiAmazon, SiAngular, SiApple, SiArduino, SiC, SiDjango, SiDocker, SiExpress, SiFirebase, SiFlutter, SiGithub, SiGithubactions, SiGooglecloud, SiJavascript, SiJira, SiLinux, SiMongodb, SiMysql, SiNestjs, SiNextdotjs, SiNodedotjs, SiPhp, SiPostgresql, SiPostman, SiPython, SiReact, SiSpringboot, SiSwift, SiTailwindcss, SiTypescript } from "react-icons/si";

const technologies = [
  { name: "React", icon: <SiReact className="w-10 h-10 text-blue-500" /> },
  { name: "Next.js", icon: <SiNextdotjs className="w-10 h-10 text-black dark:text-white" /> },
  { name: "Angular", icon: <SiAngular className="w-10 h-10 text-red-600" /> },
  { name: "React Native", icon: <SiReact className="w-10 h-10 text-blue-500" /> },
  { name: "TypeScript", icon: <SiTypescript className="w-10 h-10 text-blue-600" /> },
  { name: "JavaScript", icon: <SiJavascript className="w-10 h-10 text-yellow-500" /> },
  { name: "Python", icon: <SiPython className="w-10 h-10 text-yellow-500" /> },
  { name: "C", icon: <SiC className="w-10 h-10 text-blue-600" /> },
  { name: "Swift", icon: <SiSwift className="w-10 h-10 text-orange-500" /> },
  { name: "Node.js", icon: <SiNodedotjs className="w-10 h-10 text-green-600" /> },
  { name: "Express.js", icon: <SiExpress className="w-10 h-10 text-green-600" /> },
  { name: "Nest.js", icon: <SiNestjs className="w-10 h-10 text-red-600" /> },
  { name: "Django", icon: <SiDjango className="w-10 h-10 text-green-600" /> },
  { name: "Spring Boot", icon: <SiSpringboot className="w-10 h-10 text-green-600" /> },
  { name: "PostgreSQL", icon: <SiPostgresql className="w-10 h-10 text-blue-700" /> },
  { name: "MySQL", icon: <SiMysql className="w-10 h-10 text-blue-700" /> },
  { name: "MongoDB", icon: <SiMongodb className="w-10 h-10 text-green-700" /> },
  { name: "PHP", icon: <SiPhp className="w-10 h-10 text-purple-600" /> },
  { name: "AWS", icon: <SiAmazon className="w-10 h-10 text-black dark:text-white" /> },
  { name: "GCP", icon: <SiGooglecloud className="w-10 h-10 text-blue-600" /> },
  { name: "Firebase", icon: <SiFirebase className="w-10 h-10 text-orange-600" /> },
  { name: "Docker", icon: <SiDocker className="w-10 h-10 text-blue-600" /> },
  { name: "GitHub", icon: <SiGithub className="w-10 h-10 text-black dark:text-white" /> },
  { name: "GitHub Actions", icon: <SiGithubactions className="w-10 h-10 text-black dark:text-white" /> },
  { name: "Jira", icon: <SiJira className="w-10 h-10 text-blue-600" /> },
  { name: "Flutter", icon: <SiFlutter className="w-10 h-10 text-blue-600" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="w-10 h-10 text-blue-400" /> },
  { name: "macOS", icon: <SiApple className="w-10 h-10 text-black dark:text-white" /> },
  { name: "Linux", icon: <SiLinux className="w-10 h-10 text-yellow-500" /> },
  { name: "Postman", icon: <SiPostman className="w-10 h-10 text-orange-600" /> },
];

export function Skills() {
  return (
    <section id="skills" className="py-20">
      <div className="container px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center text-3xl font-bold tracking-tight text-white"
        >
          Skills
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4 mx-auto sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 max-w-screen-2xl"
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{
                duration: 0.3,
                delay: 0.05 * index,
                hover: { duration: 0.2 }
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-white/80 to-white/20 dark:from-neutral-900/90 dark:to-neutral-800/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)] border border-neutral-100 dark:border-neutral-700/80 backdrop-blur-sm hover:border-violet-400/50 dark:hover:border-violet-500/50 group transition-all duration-300"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-violet-100/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <motion.div
                className="w-14 h-14 mb-4 flex items-center justify-center mx-auto relative z-10"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="absolute inset-0 bg-violet-500/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                <div className="text-3xl text-violet-600 dark:text-violet-400 relative z-10">
                  {tech.icon}
                </div>
              </motion.div>

              <motion.span
                className="block text-center font-medium text-neutral-700 dark:text-neutral-300 text-lg bg-clip-text bg-gradient-to-r from-neutral-600 to-neutral-900 dark:from-neutral-300 dark:to-neutral-100 relative"
                whileHover={{
                  backgroundImage: "linear-gradient(to right, #7c3aed, #a78bfa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                {tech.name}
              </motion.span>

              <div className="absolute inset-0 rounded-2xl border border-violet-400/20 dark:border-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
