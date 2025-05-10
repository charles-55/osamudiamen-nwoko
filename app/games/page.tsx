"use client";

import { motion } from "framer-motion";
import { GameCard } from "@/components/games/game-card"

export default function GamesPage() {
  const games = [
    {
      title: "Tic-tac-toe",
      description: "The classic game of X's and O's. Challenge yourself against the computer or play with a friend.",
      icon: "grid-3x3",
      slug: "tic-tac-toe",
    },
    {
      title: "Memory Match",
      description: "Test your memory by matching pairs of cards. How quickly can you find all the matches?",
      icon: "brain",
      slug: "memory-match",
    },
    {
      title: "Typing Speed Test",
      description: "How fast can you type? Test your typing speed and accuracy with this challenge.",
      icon: "keyboard",
      slug: "typing-test",
    },
    {
      title: "Wordle Clone",
      description: "Guess the five-letter word in six tries. Each guess must be a valid word.",
      icon: "text",
      slug: "wordle",
    },
    {
      title: "Puzzle Game",
      description: "Drag and drop puzzle pieces to complete the image. Challenge your spatial reasoning skills.",
      icon: "puzzle",
      slug: "puzzle",
    },
    {
      title: "Number Guess",
      description: "I'm thinking of a number between 1 and 100. Can you guess it in the fewest attempts?",
      icon: "dice-5",
      slug: "number-guess",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="mb-8 text-center text-4xl font-bold">Games Collection</h1>
      <p className="mb-12 text-center text-lg text-muted-foreground">
        A collection of interactive games built with React and TypeScript
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((game, index) => (
          <motion.div
            key={game.slug}
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
            <GameCard game={game} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
