"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { GameLayout } from "@/components/games/game-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowDown, ArrowUp, Check } from "lucide-react"

type Difficulty = "easy" | "medium" | "hard"
type GameStatus = "playing" | "won" | "lost"
type ProximityLevel = "exact" | "very-close" | "close" | "far"

export default function NumberGuessPage() {
  const [targetNumber, setTargetNumber] = useState(0)
  const [guess, setGuess] = useState("")
  const [guesses, setGuesses] = useState<number[]>([])
  const [feedback, setFeedback] = useState("")
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing")
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null)
  const [maxGuesses, setMaxGuesses] = useState(0)
  const [range, setRange] = useState({ min: 0, max: 0 })
  const [stats, setStats] = useState({
    gamesPlayed: 0,
    gamesWon: 0,
    bestScore: Number.POSITIVE_INFINITY,
  })

  const instructions =
    "I'm thinking of a number within a specific range. Try to guess it in as few attempts as possible. After each guess, I'll tell you if your guess is too high, too low, or correct. The color of your guess indicates how close you are - red (far), orange (getting closer), yellow (very close), and green (correct)."

  useEffect(() => {
    const savedStats = localStorage.getItem("numberGuessStats")
    if (savedStats) {
      setStats(JSON.parse(savedStats))
    }
  }, [])

  const initializeGame = () => {
    const min = 1
    let max = 100
    let maxAttempts = 10

    if (difficulty === "easy") {
      max = 50
      maxAttempts = 10
    } else if (difficulty === "medium") {
      max = 100
      maxAttempts = 7
    } else if (difficulty === "hard") {
      max = 1000
      maxAttempts = 10
    }

    const number = Math.floor(Math.random() * (max - min + 1)) + min

    setTargetNumber(number)
    setGuess("")
    setGuesses([])
    setFeedback(`I'm thinking of a number between ${min} and ${max}...`)
    setGameStatus("playing")
    setMaxGuesses(maxAttempts)
    setRange({ min, max })
  }

  const handleGuessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const value = e.target.value.replace(/\D/g, "")
    setGuess(value)
  }

  const submitGuess = () => {
    if (!guess) return

    const numberGuess = Number.parseInt(guess)

    // Validate guess is in range
    if (numberGuess < range.min || numberGuess > range.max) {
      setFeedback(`Please enter a number between ${range.min} and ${range.max}.`)
      return
    }

    const newGuesses = [...guesses, numberGuess]
    setGuesses(newGuesses)
    setGuess("")

    // Check if correct
    if (numberGuess === targetNumber) {
      setFeedback("Correct! You guessed the number!")
      setGameStatus("won")
      updateStats(true, newGuesses.length)
    }
    // Too high
    else if (numberGuess > targetNumber) {
      setFeedback("Too high! Try a lower number.")
    }
    // Too low
    else {
      setFeedback("Too low! Try a higher number.")
    }

    // Check if out of guesses
    if (newGuesses.length >= maxGuesses && numberGuess !== targetNumber) {
      setFeedback(`Game over! The number was ${targetNumber}.`)
      setGameStatus("lost")
      updateStats(false, 0)
    }
  }

  const updateStats = (won: boolean, attempts: number) => {
    const newStats = { ...stats }
    newStats.gamesPlayed += 1

    if (won) {
      newStats.gamesWon += 1
      newStats.bestScore = Math.min(newStats.bestScore, attempts)
    }

    setStats(newStats)
    localStorage.setItem("numberGuessStats", JSON.stringify(newStats))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      submitGuess()
    }
  }

  const resetGame = () => {
    initializeGame()
  }

  const getFeedbackIcon = () => {
    const lastGuess = guesses[guesses.length - 1]

    if (!lastGuess) return null

    if (lastGuess === targetNumber) {
      return <Check className="h-6 w-6 text-green-600" />
    } else if (lastGuess > targetNumber) {
      return <ArrowDown className="h-6 w-6 text-red-500" />
    } else {
      return <ArrowUp className="h-6 w-6 text-red-500" />
    }
  }

  // Determine how close a guess is to the target number
  const getProximityLevel = (guess: number): ProximityLevel => {
    if (guess === targetNumber) return "exact"

    const totalRange = range.max - range.min
    const difference = Math.abs(guess - targetNumber)
    const percentageDifference = (difference / totalRange) * 100

    if (percentageDifference <= 2) return "very-close" // Within 2% of range
    if (percentageDifference <= 10) return "close" // Within 10% of range
    return "far"
  }

  // Get badge variant based on proximity
  const getBadgeVariant = (guess: number) => {
    const proximity = getProximityLevel(guess)

    switch (proximity) {
      case "exact":
        return "green" // Green
      case "very-close":
        return "yellow" // Yellow
      case "close":
        return "orange" // Orange
      case "far":
        return "red" // Red
      default:
        return "outline"
    }
  }

  if (!difficulty) {
    return (
      <GameLayout title="Number Guessing Game" instructions={instructions}>
        <div className="flex h-full flex-col items-center justify-center">
          <Card className="w-full max-w-md p-6 text-center">
            <h2 className="mb-6 text-2xl font-bold">Choose Difficulty</h2>
            <div className="flex flex-col gap-4">
              <Button
                size="lg"
                onClick={() => {
                  setDifficulty("easy")
                  setTimeout(initializeGame, 0)
                }}
                className="text-lg"
              >
                Easy (1-50, 10 guesses)
              </Button>
              <Button
                size="lg"
                onClick={() => {
                  setDifficulty("medium")
                  setTimeout(initializeGame, 0)
                }}
                className="text-lg"
              >
                Medium (1-100, 7 guesses)
              </Button>
              <Button
                size="lg"
                onClick={() => {
                  setDifficulty("hard")
                  setTimeout(initializeGame, 0)
                }}
                className="text-lg"
              >
                Hard (1-1000, 10 guesses)
              </Button>
            </div>
          </Card>
        </div>
      </GameLayout>
    )
  }

  return (
    <GameLayout title="Number Guessing Game" instructions={instructions} onReset={resetGame}>
      <div className="mx-auto max-w-md">
        <div className="mb-6 flex justify-between">
          <Badge variant="outline">Games: {stats.gamesPlayed}</Badge>
          <Badge variant="outline">Wins: {stats.gamesWon}</Badge>
          <Badge variant="outline">Best: {stats.bestScore === Number.POSITIVE_INFINITY ? "-" : stats.bestScore}</Badge>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Range: {range.min} - {range.max}
              </span>
              <Badge>
                {guesses.length} / {maxGuesses} Guesses
              </Badge>
            </div>

            <div className="mb-6 flex items-center gap-2">
              <div className="flex-1 text-lg">{feedback}</div>
              {getFeedbackIcon()}
            </div>

            {gameStatus === "playing" && (
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={guess}
                  onChange={handleGuessChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter your guess"
                  className="text-lg"
                  autoFocus
                />
                <Button onClick={submitGuess}>Guess</Button>
              </div>
            )}

            {gameStatus !== "playing" && (
              <Button className="w-full" onClick={resetGame}>
                Play Again
              </Button>
            )}
          </CardContent>
        </Card>

        {guesses.length > 0 && (
          <div>
            <h3 className="mb-2 font-semibold">Previous Guesses</h3>
            <div className="flex flex-wrap gap-2">
              {guesses.map((guess, index) => {
                const variant = getBadgeVariant(guess)
                return (
                  <Badge key={index} variant={variant}>
                    {guess}
                    {guess > targetNumber && " ↓"}
                    {guess < targetNumber && " ↑"}
                    {guess === targetNumber && " ✓"}
                  </Badge>
                )
              })}
            </div>
          </div>
        )}

        <Button variant="outline" className="mt-6 w-full" onClick={() => setDifficulty(null)}>
          Change Difficulty
        </Button>
      </div>
    </GameLayout>
  )
}
