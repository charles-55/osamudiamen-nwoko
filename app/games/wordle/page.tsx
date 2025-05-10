"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { GameLayout } from "@/components/games/game-layout"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import wordleData from "@/data/wordle-words.json"

const WORDS = wordleData.words
const MAX_ATTEMPTS = 6
const WORD_LENGTH = 5

type GameStatus = "playing" | "won" | "lost"

export default function WordlePage() {
  const [targetWord, setTargetWord] = useState("")
  const [guesses, setGuesses] = useState<string[]>([])
  const [currentGuess, setCurrentGuess] = useState("")
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing")
  const [message, setMessage] = useState("")
  const [showMessage, setShowMessage] = useState(false)
  const [stats, setStats] = useState({
    played: 0,
    won: 0,
    currentStreak: 0,
    maxStreak: 0,
    distribution: [0, 0, 0, 0, 0, 0],
  })

  const instructions =
    "Guess the 5-letter word in six tries. Each guess must be a valid 5-letter word. After each guess, the color of the tiles will change to show how close your guess was to the word. Green means the letter is in the correct spot, yellow means the letter is in the word but in the wrong spot, and gray means the letter is not in the word."

  useEffect(() => {
    startNewGame()
    // Load stats from localStorage
    const savedStats = localStorage.getItem("wordleStats")
    if (savedStats) {
      setStats(JSON.parse(savedStats))
    }
  }, [])

  const startNewGame = () => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)]
    setTargetWord(randomWord)
    setGuesses([])
    setCurrentGuess("")
    setGameStatus("playing")
    setMessage("")
    setShowMessage(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (gameStatus !== "playing") return

    if (e.key === "Enter") {
      submitGuess()
    } else if (e.key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1))
    } else if (/^[a-zA-Z]$/.test(e.key) && currentGuess.length < WORD_LENGTH) {
      setCurrentGuess((prev) => prev + e.key.toLowerCase())
    }
  }

  const handleKeyPress = (key: string) => {
    if (gameStatus !== "playing") return

    if (key === "Enter") {
      submitGuess()
    } else if (key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1))
    } else if (/^[a-zA-Z]$/.test(key) && currentGuess.length < WORD_LENGTH) {
      setCurrentGuess((prev) => prev + key.toLowerCase())
    }
  }

  const submitGuess = () => {
    // Check if the guess is complete
    if (currentGuess.length !== WORD_LENGTH) {
      showTemporaryMessage("Word must be 5 letters")
      return
    }

    // Check if the word is in our list
    if (!WORDS.includes(currentGuess)) {
      showTemporaryMessage("Not in word list")
      return
    }

    // Add the guess to the list
    const newGuesses = [...guesses, currentGuess]
    setGuesses(newGuesses)
    setCurrentGuess("")

    // Check if the guess is correct
    if (currentGuess === targetWord) {
      setGameStatus("won")
      updateStats(true, newGuesses.length)
      showTemporaryMessage("Magnificent!")
    }
    // Check if out of attempts
    else if (newGuesses.length >= MAX_ATTEMPTS) {
      setGameStatus("lost")
      updateStats(false, 0)
      showTemporaryMessage(`The word was: ${targetWord}`)
    }
  }

  const updateStats = (won: boolean, attempts: number) => {
    const newStats = { ...stats }
    newStats.played += 1

    if (won) {
      newStats.won += 1
      newStats.currentStreak += 1
      newStats.maxStreak = Math.max(newStats.maxStreak, newStats.currentStreak)
      newStats.distribution[attempts - 1] += 1
    } else {
      newStats.currentStreak = 0
    }

    setStats(newStats)
    localStorage.setItem("wordleStats", JSON.stringify(newStats))
  }

  const showTemporaryMessage = (msg: string) => {
    setMessage(msg)
    setShowMessage(true)
    setTimeout(() => {
      setShowMessage(false)
    }, 5000)
  }

  const getLetterStatus = (letter: string, position: number, guess: string) => {
    // If the letter is in the correct position
    if (targetWord[position] === letter) {
      return "correct"
    }

    // If the letter is in the word but wrong position
    if (targetWord.includes(letter)) {
      // Count occurrences in target word
      const targetCount = targetWord.split("").filter((l) => l === letter).length

      // Count correct positions of this letter before this position
      const correctPositions = guess
        .split("")
        .filter((l, i) => l === letter && targetWord[i] === letter && i <= position).length

      // Count present positions of this letter before this position
      const presentPositions = guess.split("").filter((l, i) => {
        return l === letter && targetWord[i] !== letter && targetWord.includes(letter) && i <= position
      }).length

      // If we've already marked enough of this letter
      if (correctPositions + presentPositions > targetCount) {
        return "absent"
      }

      return "present"
    }

    // Letter is not in the word
    return "absent"
  }

  const renderGuessRow = (guess: string, isCurrentGuess: boolean, index: number) => {
    const cells = []

    for (let i = 0; i < WORD_LENGTH; i++) {
      const letter = guess[i] || ""
      let className = "flex h-12 w-12 items-center justify-center rounded-md border text-xl font-bold uppercase"

      if (isCurrentGuess) {
        className += " border-primary/50 bg-background"
      } else if (letter) {
        const status = getLetterStatus(letter, i, guess)
        if (status === "correct") {
          className += " border-green-600 bg-green-600 text-white dark:bg-green-600"
        } else if (status === "present") {
          className += " border-yellow-500 bg-yellow-500 text-white dark:bg-yellow-600"
        } else {
          className += " border-gray-400 bg-gray-400 text-white dark:bg-gray-600"
        }
      } else {
        className += " border-gray-200 bg-background dark:border-gray-700"
      }

      cells.push(
        <div key={i} className={className}>
          {letter}
        </div>,
      )
    }

    return <div key={index} className="mb-2 flex justify-center gap-2">{cells}</div>
  }

  const renderKeyboard = () => {
    const rows = [
      ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
      ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
      ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
    ]

    // Track letter statuses
    const letterStatus: Record<string, string> = {}

    guesses.forEach((guess) => {
      guess.split("").forEach((letter, i) => {
        const status = getLetterStatus(letter, i, guess)

        // Only upgrade status (absent -> present -> correct)
        if (
          !letterStatus[letter] ||
          (letterStatus[letter] === "absent" && (status === "present" || status === "correct")) ||
          (letterStatus[letter] === "present" && status === "correct")
        ) {
          letterStatus[letter] = status
        }
      })
    })

    return (
      <div className="mt-4">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="mb-2 flex justify-center gap-1">
            {row.map((key) => {
              let className = "flex items-center justify-center rounded px-2 py-3 font-medium uppercase"

              if (key === "Enter" || key === "Backspace") {
                className += " px-3 text-xs"
              } else {
                const status = letterStatus[key]
                if (status === "correct") {
                  className += " bg-green-600 text-white dark:bg-green-600"
                } else if (status === "present") {
                  className += " bg-yellow-500 text-white dark:bg-yellow-600"
                } else if (status === "absent") {
                  className += " bg-gray-400 text-white dark:bg-gray-700"
                } else {
                  className += " bg-gray-200 dark:bg-gray-500"
                }
              }

              return (
                <button
                  key={key}
                  className={className}
                  onClick={() => handleKeyPress(key)}
                  style={{ minWidth: key === "Enter" || key === "Backspace" ? "65px" : "30px" }}
                >
                  {key === "Backspace" ? "⌫" : key}
                </button>
              )
            })}
          </div>
        ))}
      </div>
    )
  }

  return (
    <GameLayout title="Wordle" instructions={instructions} onReset={startNewGame}>
      <div className="mx-auto max-w-md" onKeyDown={handleKeyDown} tabIndex={0}>
        <div className="mb-4 flex justify-between">
          <Badge variant="outline">Games: {stats.played}</Badge>
          <Badge variant="outline">Win %: {stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : 0}%</Badge>
          <Badge variant="outline">Streak: {stats.currentStreak}</Badge>
          <Badge variant="outline">Max Streak: {stats.maxStreak}</Badge>
        </div>

        {showMessage && (
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        <div className="mb-4">
          {guesses.map((guess, i) => renderGuessRow(guess, false, i))}

          {guesses.length < MAX_ATTEMPTS && gameStatus === "playing" && renderGuessRow(currentGuess, true, guesses.length)}

          {/* Add empty rows to fill up to MAX_ATTEMPTS */}
          {Array.from({ length: MAX_ATTEMPTS - guesses.length - (gameStatus === "playing" ? 1 : 0) }).map((_, i) =>
            renderGuessRow("", false, i),
          )}
        </div>

        {renderKeyboard()}

        {gameStatus !== "playing" && (
          <div className="mt-6 text-center">
            <p className="mb-4 text-lg font-semibold">
              {gameStatus === "won"
                ? `You won in ${guesses.length} ${guesses.length === 1 ? "try" : "tries"}!`
                : `Better luck next time! The word was ${targetWord}.`}
            </p>
            <Button onClick={startNewGame}>Play Again</Button>
          </div>
        )}
      </div>
    </GameLayout>
  )
}
