"use client";

import Link from "next/link"
import { motion } from "framer-motion";
import { Brain, Dice5, Grid3X3, Keyboard, Puzzle, Text } from "lucide-react"

interface GameCardProps {
  game: {
    title: string
    description: string
    icon: string
    slug: string
  }
}

export function GameCard({ game }: GameCardProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "grid-3x3":
        return <Grid3X3 className="h-12 w-12" />
      case "brain":
        return <Brain className="h-12 w-12" />
      case "keyboard":
        return <Keyboard className="h-12 w-12" />
      case "text":
        return <Text className="h-12 w-12" />
      case "puzzle":
        return <Puzzle className="h-12 w-12" />
      case "dice-5":
        return <Dice5 className="h-12 w-12" />
      default:
        return null
    }
  }

  return (
    <Link href={`/games/${game.slug}`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-violet-100/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <motion.div
        className="w-14 h-14 mb-4 flex items-center justify-center mx-auto relative z-10"
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <div className="absolute inset-0 bg-violet-500/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
        <div className="text-3xl text-violet-600 dark:text-violet-400 relative z-10">
          {getIcon(game.icon)}
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
        {game.title}
      </motion.span>

      <p className="text-sm text-muted-foreground text-center">{game.description}</p>

      <div className="absolute inset-0 rounded-2xl border border-violet-400/20 dark:border-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </Link>
  )
}
