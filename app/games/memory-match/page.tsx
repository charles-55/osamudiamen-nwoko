"use client"

import { useState, useEffect } from "react"
import { GameLayout } from "@/components/games/game-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Star, Zap, Music, Smile, Coffee, Sun, Moon, Cloud, Umbrella, Gift, Camera } from "lucide-react"

type CardType = {
  id: number
  icon: string
  isFlipped: boolean
  isMatched: boolean
}

export default function MemoryMatchPage() {
  const [cards, setCards] = useState<CardType[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [timer, setTimer] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard" | null>(null)

  const instructions =
    "Click on cards to flip them over and find matching pairs. The game is complete when all pairs have been found. Try to finish with the fewest moves and in the shortest time possible."

  const icons = [
    "heart",
    "star",
    "zap",
    "music",
    "smile",
    "coffee",
    "sun",
    "moon",
    "cloud",
    "umbrella",
    "gift",
    "camera",
  ]

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "heart":
        return <Heart className="h-8 w-8" />
      case "star":
        return <Star className="h-8 w-8" />
      case "zap":
        return <Zap className="h-8 w-8" />
      case "music":
        return <Music className="h-8 w-8" />
      case "smile":
        return <Smile className="h-8 w-8" />
      case "coffee":
        return <Coffee className="h-8 w-8" />
      case "sun":
        return <Sun className="h-8 w-8" />
      case "moon":
        return <Moon className="h-8 w-8" />
      case "cloud":
        return <Cloud className="h-8 w-8" />
      case "umbrella":
        return <Umbrella className="h-8 w-8" />
      case "gift":
        return <Gift className="h-8 w-8" />
      case "camera":
        return <Camera className="h-8 w-8" />
      default:
        return null
    }
  }

  const initializeGame = () => {
    let numPairs
    if (difficulty === "easy") numPairs = 6
    else if (difficulty === "medium") numPairs = 8
    else numPairs = 12

    const gameIcons = icons.slice(0, numPairs)

    // Create pairs of cards
    let cardDeck: CardType[] = []
    gameIcons.forEach((icon, index) => {
      cardDeck.push({ id: index * 2, icon, isFlipped: false, isMatched: false })
      cardDeck.push({ id: index * 2 + 1, icon, isFlipped: false, isMatched: false })
    })

    // Shuffle the cards
    cardDeck = shuffleArray(cardDeck)

    setCards(cardDeck)
    setFlippedCards([])
    setMoves(0)
    setGameOver(false)
    setTimer(0)
    setIsActive(true)
  }

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array: CardType[]) => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
        ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  const handleCardClick = (id: number) => {
    if (
      flippedCards.length === 2 ||
      cards.find((card) => card.id === id)?.isFlipped ||
      cards.find((card) => card.id === id)?.isMatched
    ) {
      return
    }

    const newCards = cards.map((card) => (card.id === id ? { ...card, isFlipped: true } : card))
    setCards(newCards)

    const newFlippedCards = [...flippedCards, id]
    setFlippedCards(newFlippedCards)

    // If two cards are flipped, check for a match
    if (newFlippedCards.length === 2) {
      setMoves(moves + 1)

      const firstCardId = newFlippedCards[0]
      const secondCardId = newFlippedCards[1]

      const firstCard = newCards.find((card) => card.id === firstCardId)
      const secondCard = newCards.find((card) => card.id === secondCardId)

      if (firstCard?.icon === secondCard?.icon) {
        // Cards matched
        setTimeout(() => {
          const matchedCards = newCards.map((card) =>
            card.id === firstCardId || card.id === secondCardId ? { ...card, isMatched: true } : card,
          )
          setCards(matchedCards)
          setFlippedCards([])

          // Check if all cards are matched
          if (matchedCards.every((card) => card.isMatched)) {
            setGameOver(true)
            setIsActive(false)
          }
        }, 500)
      } else {
        // Not a match, flip them back
        setTimeout(() => {
          const resetCards = newCards.map((card) =>
            card.id === firstCardId || card.id === secondCardId ? { ...card, isFlipped: false } : card,
          )
          setCards(resetCards)
          setFlippedCards([])
        }, 1000)
      }
    }
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

  const resetGame = () => {
    initializeGame()
  }

  if (!difficulty) {
    return (
      <GameLayout title="Memory Match" instructions={instructions}>
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
                Easy (6 pairs)
              </Button>
              <Button
                size="lg"
                onClick={() => {
                  setDifficulty("medium")
                  setTimeout(initializeGame, 0)
                }}
                className="text-lg"
              >
                Medium (8 pairs)
              </Button>
              <Button
                size="lg"
                onClick={() => {
                  setDifficulty("hard")
                  setTimeout(initializeGame, 0)
                }}
                className="text-lg"
              >
                Hard (12 pairs)
              </Button>
            </div>
          </Card>
        </div>
      </GameLayout>
    )
  }

  return (
    <GameLayout title="Memory Match" instructions={instructions} onReset={resetGame}>
      <div className="flex flex-col items-center">
        <div className="mb-6 flex items-center gap-4">
          <Badge variant="outline" className="text-lg">
            Moves: {moves}
          </Badge>
          <Badge variant="outline" className="text-lg">
            Time: {formatTime(timer)}
          </Badge>
        </div>

        <div
          className={`grid gap-4 ${difficulty === "easy"
              ? "grid-cols-3 sm:grid-cols-4"
              : difficulty === "medium"
                ? "grid-cols-4"
                : "grid-cols-4 sm:grid-cols-6"
            }`}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className={`relative h-20 w-20 cursor-pointer transition-all duration-300 ${card.isFlipped ? "rotate-y-180" : ""
                }`}
              onClick={() => handleCardClick(card.id)}
            >
              <div
                className={`absolute inset-0 flex items-center justify-center rounded-md border-2 ${card.isMatched
                    ? "border-green-600 bg-green-100 dark:bg-green-900"
                    : card.isFlipped
                      ? "border-primary bg-primary/10"
                      : "border-muted-foreground/20 bg-muted"
                  } transition-all duration-300 ${card.isFlipped ? "rotate-y-180 opacity-0" : "opacity-100"}`}
              >
                <span className="text-2xl">?</span>
              </div>
              <div
                className={`absolute inset-0 flex items-center justify-center rounded-md border-2 ${card.isMatched ? "border-green-600 bg-green-100 dark:bg-green-900" : "border-primary bg-primary/10"
                  } transition-all duration-300 ${card.isFlipped ? "opacity-100" : "rotate-y-180 opacity-0"}`}
              >
                {getIconComponent(card.icon)}
              </div>
            </div>
          ))}
        </div>

        {gameOver && (
          <div className="mt-8 text-center">
            <h2 className="mb-4 text-2xl font-bold">Congratulations!</h2>
            <p className="mb-4">
              You completed the game in {moves} moves and {formatTime(timer)}.
            </p>
            <Button onClick={resetGame}>Play Again</Button>
          </div>
        )}

        <Button
          variant="outline"
          className="mt-6"
          onClick={() => {
            setDifficulty(null)
            setIsActive(false)
          }}
        >
          Change Difficulty
        </Button>
      </div>
    </GameLayout>
  )
}
