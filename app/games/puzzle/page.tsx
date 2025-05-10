"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { GameLayout } from "@/components/games/game-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shuffle } from "lucide-react"

type PuzzlePiece = {
  id: number
  currentPosition: number
  correctPosition: number
  image: string
}

export default function PuzzlePage() {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([])
  const [gridSize, setGridSize] = useState<3 | 4 | 5 | null>(null)
  const [moves, setMoves] = useState(0)
  const [timer, setTimer] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [draggedPiece, setDraggedPiece] = useState<number | null>(null)

  const instructions =
    "Drag and drop the puzzle pieces to arrange them in the correct order. The goal is to recreate the original image with the fewest moves possible."

  const initializeGame = () => {
    const totalPieces = gridSize! * gridSize!
    const newPieces: PuzzlePiece[] = []

    // Create pieces
    for (let i = 0; i < totalPieces; i++) {
      newPieces.push({
        id: i,
        currentPosition: i,
        correctPosition: i,
        image: `/placeholder.svg?height=100&width=100&text=${i + 1}`,
      })
    }

    // Shuffle pieces
    const shuffledPieces = [...newPieces]
    for (let i = shuffledPieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))

      // Swap current positions
      const temp = shuffledPieces[i].currentPosition
      shuffledPieces[i].currentPosition = shuffledPieces[j].currentPosition
      shuffledPieces[j].currentPosition = temp
    }

    setPieces(shuffledPieces)
    setMoves(0)
    setTimer(0)
    setIsActive(true)
    setIsComplete(false)
  }

  // Check if puzzle is complete
  useEffect(() => {
    if (pieces.length === 0) return

    const isCompleted = pieces.every((piece) => piece.currentPosition === piece.correctPosition)

    if (isCompleted && isActive) {
      setIsComplete(true)
      setIsActive(false)
    }
  }, [pieces, isActive])

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

  const handleDragStart = (e: React.DragEvent, id: number) => {
    setDraggedPiece(id)
    e.dataTransfer.setData("text/plain", id.toString())
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, targetId: number) => {
    e.preventDefault()

    if (draggedPiece === null) return

    // Find the pieces
    const sourceIndex = pieces.findIndex((p) => p.id === draggedPiece)
    const targetIndex = pieces.findIndex((p) => p.id === targetId)

    if (sourceIndex === -1 || targetIndex === -1) return

    // Swap positions
    const newPieces = [...pieces]
    const tempPosition = newPieces[sourceIndex].currentPosition
    newPieces[sourceIndex].currentPosition = newPieces[targetIndex].currentPosition
    newPieces[targetIndex].currentPosition = tempPosition

    setPieces(newPieces)
    setMoves(moves + 1)
    setDraggedPiece(null)
  }

  const resetGame = () => {
    initializeGame()
  }

  const renderPuzzle = () => {
    if (!gridSize) return null

    // Sort pieces by current position for rendering
    const sortedPieces = [...pieces].sort((a, b) => a.currentPosition - b.currentPosition)

    return (
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          width: `${gridSize * 80}px`,
          height: `${gridSize * 80}px`,
        }}
      >
        {sortedPieces.map((piece) => (
          <div
            key={piece.id}
            draggable
            onDragStart={(e) => handleDragStart(e, piece.id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, piece.id)}
            className={`flex h-[80px] w-[80px] items-center justify-center rounded-md border-2 ${piece.currentPosition === piece.correctPosition
                ? "border-green-600 bg-green-100 dark:bg-green-900/30"
                : "border-primary/50 bg-background"
              } cursor-move text-2xl font-bold transition-all duration-200 hover:border-primary`}
          >
            {piece.id + 1}
          </div>
        ))}
      </div>
    )
  }

  if (!gridSize) {
    return (
      <GameLayout title="Puzzle Game" instructions={instructions}>
        <div className="flex h-full flex-col items-center justify-center">
          <Card className="w-full max-w-md p-6 text-center">
            <h2 className="mb-6 text-2xl font-bold">Choose Puzzle Size</h2>
            <div className="flex flex-col gap-4">
              <Button
                size="lg"
                onClick={() => {
                  setGridSize(3)
                  setTimeout(initializeGame, 0)
                }}
                className="text-lg"
              >
                3x3 (Easy)
              </Button>
              <Button
                size="lg"
                onClick={() => {
                  setGridSize(4)
                  setTimeout(initializeGame, 0)
                }}
                className="text-lg"
              >
                4x4 (Medium)
              </Button>
              <Button
                size="lg"
                onClick={() => {
                  setGridSize(5)
                  setTimeout(initializeGame, 0)
                }}
                className="text-lg"
              >
                5x5 (Hard)
              </Button>
            </div>
          </Card>
        </div>
      </GameLayout>
    )
  }

  return (
    <GameLayout title="Puzzle Game" instructions={instructions} onReset={resetGame}>
      <div className="flex flex-col items-center">
        <div className="mb-6 flex items-center gap-4">
          <Badge variant="outline" className="text-lg">
            Moves: {moves}
          </Badge>
          <Badge variant="outline" className="text-lg">
            Time: {formatTime(timer)}
          </Badge>
        </div>

        <div className="mb-6 flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={resetGame} className="flex items-center gap-2">
            <Shuffle className="h-4 w-4" />
            Shuffle
          </Button>
        </div>

        {renderPuzzle()}

        {isComplete && (
          <div className="mt-8 text-center">
            <h2 className="mb-4 text-2xl font-bold">Puzzle Complete!</h2>
            <p className="mb-4">
              You solved the puzzle in {moves} moves and {formatTime(timer)}.
            </p>
            <Button onClick={resetGame}>Play Again</Button>
          </div>
        )}

        <Button
          variant="outline"
          className="mt-6"
          onClick={() => {
            setGridSize(null)
            setIsActive(false)
          }}
        >
          Change Puzzle Size
        </Button>
      </div>
    </GameLayout>
  )
}
