"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { GameLayout } from "@/components/games/game-layout"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import typingQuotes from "@/data/typing-quotes.json"

const QUOTES = typingQuotes.quotes

export default function TypingTestPage() {
  const [quote, setQuote] = useState("")
  const [input, setInput] = useState("")
  const [timer, setTimer] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [message, setMessage] = useState("")
  const [showMessage, setShowMessage] = useState(false)
  const [testLength, setTestLength] = useState<"short" | "medium" | "long" | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)

  const instructions =
    "Type the displayed text as quickly and accurately as possible. Your typing speed (words per minute) and accuracy will be calculated when you complete the text."

  const getRandomQuote = () => {
    let selectedQuotes: string[] = []

    if (testLength === "short") {
      // Get one short quote
      selectedQuotes = [QUOTES[Math.floor(Math.random() * QUOTES.length)]]
    } else if (testLength === "medium") {
      // Get two quotes
      const firstIndex = Math.floor(Math.random() * QUOTES.length)
      let secondIndex
      do {
        secondIndex = Math.floor(Math.random() * QUOTES.length)
      } while (secondIndex === firstIndex)

      selectedQuotes = [QUOTES[firstIndex], QUOTES[secondIndex]]
    } else {
      // Get three quotes
      const indices = new Set<number>()
      while (indices.size < 3) {
        indices.add(Math.floor(Math.random() * QUOTES.length))
      }

      selectedQuotes = Array.from(indices).map((index) => QUOTES[index])
    }

    return selectedQuotes.join(" ")
  }

  const startTest = () => {
    const newQuote = getRandomQuote()
    setQuote(newQuote)
    setInput("")
    setTimer(0)
    setIsActive(true)
    setIsFinished(false)
    setWpm(0)
    setAccuracy(100)
    setMessage("")
    setShowMessage(false)

    // Focus the input field
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 0)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInput(value)

    // Count errors
    let currentErrors = 0
    for (let i = 0; i < value.length; i++) {
      if (i >= quote.length || value[i] !== quote[i]) {
        currentErrors++
      }
    }

    // Calculate accuracy
    const acc = value.length > 0 ? Math.max(0, 100 - (currentErrors / value.length) * 100) : 100
    setAccuracy(Math.round(acc))

    // Check if test is complete
    if (value.length >= quote.length) {
      finishTest()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    showTemporaryMessage("Pasting is disabled!")
  }

  const showTemporaryMessage = (msg: string) => {
    setMessage(msg)
    setShowMessage(true)
    setTimeout(() => {
      setShowMessage(false)
    }, 5000)
  }

  const finishTest = () => {
    setIsActive(false)
    setIsFinished(true)

    // Calculate WPM: (characters typed / 5) / (time in minutes)
    // 5 characters is the average word length
    const minutes = timer / 60
    const words = input.length / 5
    const calculatedWpm = Math.round(words / minutes)

    setWpm(calculatedWpm)
  }

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive) {
      interval = setInterval(() => {
        setTimer((timer) => timer + 1)
      }, 1000)
    } else if (!isActive && interval) {
      clearInterval(interval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const resetTest = () => {
    startTest()
  }

  const renderQuoteWithHighlight = () => {
    const characters = quote.split("")

    return (
      <div className="mb-6 rounded-md border bg-card p-4 text-lg leading-relaxed">
        {characters.map((char, index) => {
          let className = ""

          if (index < input.length) {
            className = input[index] === char ? "bg-green-200 dark:bg-green-900" : "bg-red-200 dark:bg-red-900"
          }

          return (
            <span key={index} className={className}>
              {char}
            </span>
          )
        })}
      </div>
    )
  }

  if (!testLength) {
    return (
      <GameLayout title="Typing Speed Test" instructions={instructions}>
        <div className="flex h-full flex-col items-center justify-center">
          <Card className="w-full max-w-md p-6 text-center">
            <h2 className="mb-6 text-2xl font-bold">Choose Test Length</h2>
            <div className="flex flex-col gap-4">
              <Button
                size="lg"
                onClick={() => {
                  setTestLength("short")
                  setTimeout(startTest, 0)
                }}
                className="text-lg"
              >
                Short (~30 seconds)
              </Button>
              <Button
                size="lg"
                onClick={() => {
                  setTestLength("medium")
                  setTimeout(startTest, 0)
                }}
                className="text-lg"
              >
                Medium (~1 minute)
              </Button>
              <Button
                size="lg"
                onClick={() => {
                  setTestLength("long")
                  setTimeout(startTest, 0)
                }}
                className="text-lg"
              >
                Long (~2 minutes)
              </Button>
            </div>
          </Card>
        </div>
      </GameLayout>
    )
  }

  return (
    <GameLayout title="Typing Speed Test" instructions={instructions} onReset={resetTest}>
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Badge variant="outline" className="text-lg">
            Time: {formatTime(timer)}
          </Badge>
          <Badge variant="outline" className="text-lg">
            WPM: {isFinished ? wpm : "..."}
          </Badge>
          <Badge variant="outline" className="text-lg">
            Accuracy: {accuracy}%
          </Badge>
        </div>

        {showMessage && (
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {renderQuoteWithHighlight()}

        <div className="mb-4">
          <Progress value={(input.length / quote.length) * 100} className="h-2" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onPaste={handlePaste}
          disabled={isFinished}
          className="mb-6 w-full rounded-md border bg-background px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="Start typing..."
        />

        {isFinished && (
          <div className="rounded-md border bg-card p-4 text-center">
            <h2 className="mb-2 text-xl font-bold">Test Complete!</h2>
            <p className="mb-4">
              Your typing speed is <span className="font-bold">{wpm} WPM</span> with{" "}
              <span className="font-bold">{accuracy}%</span> accuracy.
            </p>
            <Button onClick={resetTest}>Try Again</Button>
          </div>
        )}

        <Button
          variant="outline"
          className="mt-6"
          onClick={() => {
            setTestLength(null)
            setIsActive(false)
          }}
        >
          Change Test Length
        </Button>
      </div>
    </GameLayout>
  )
}
