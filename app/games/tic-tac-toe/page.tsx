"use client"

import { useState, useEffect } from "react"
import { GameLayout } from "@/components/games/game-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Player = "X" | "O" | null
type Board = Player[]

export default function TicTacToePage() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState<boolean>(true)
  const [winner, setWinner] = useState<Player | "draw" | null>(null)
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 })
  const [gameMode, setGameMode] = useState<"friend" | "computer" | null>(null)

  const instructions =
    "Take turns placing X's and O's on the board. The first player to get three in a row (horizontally, vertically, or diagonally) wins the game. If all squares are filled and no player has three in a row, the game is a draw."

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
    setWinner(null)
  }

  const handleClick = (index: number) => {
    // Don't allow moves on filled squares or when game is over
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = isXNext ? "X" : "O"
    setBoard(newBoard)
    setIsXNext(!isXNext)
  }

  const checkWinner = (squares: Board): Player | "draw" | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ]

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }

    // Check for draw
    if (squares.every((square) => square !== null)) {
      return "draw"
    }

    return null
  }

  // Computer move
  useEffect(() => {
    if (gameMode === "computer" && !isXNext && !winner) {
      const timeoutId = setTimeout(() => {
        makeComputerMove()
      }, 500)
      return () => clearTimeout(timeoutId)
    }
  }, [isXNext, winner, gameMode])

  // Check for winner after each move
  useEffect(() => {
    const result = checkWinner(board)
    if (result) {
      setWinner(result)
      // Update scores
      if (result === "X") {
        setScores((prev) => ({ ...prev, X: prev.X + 1 }))
      } else if (result === "O") {
        setScores((prev) => ({ ...prev, O: prev.O + 1 }))
      } else if (result === "draw") {
        setScores((prev) => ({ ...prev, draws: prev.draws + 1 }))
      }
    }
  }, [board])

  const makeComputerMove = () => {
    // Simple AI: first try to win, then block, then take center, then random
    const newBoard = [...board]
    const emptySquares = newBoard
      .map((square, index) => (square === null ? index : null))
      .filter((val) => val !== null) as number[]

    if (emptySquares.length === 0) return

    // Try to find a winning move
    for (const index of emptySquares) {
      const boardCopy = [...newBoard]
      boardCopy[index] = "O"
      if (checkWinner(boardCopy) === "O") {
        handleClick(index)
        return
      }
    }

    // Try to block X from winning
    for (const index of emptySquares) {
      const boardCopy = [...newBoard]
      boardCopy[index] = "X"
      if (checkWinner(boardCopy) === "X") {
        handleClick(index)
        return
      }
    }

    // Take center if available
    if (emptySquares.includes(4)) {
      handleClick(4)
      return
    }

    // Take a random empty square
    const randomIndex = Math.floor(Math.random() * emptySquares.length)
    handleClick(emptySquares[randomIndex])
  }

  const renderSquare = (index: number) => {
    return (
      <Button
        variant="outline"
        className="h-20 w-20 text-3xl font-bold"
        onClick={() => handleClick(index)}
        disabled={!!board[index] || !!winner || (gameMode === "computer" && !isXNext)}
      >
        {board[index]}
      </Button>
    )
  }

  const getStatus = () => {
    if (winner === "draw") {
      return "Game ended in a draw!"
    } else if (winner) {
      return `Winner: ${winner}`
    } else {
      return `Next player: ${isXNext ? "X" : "O"}`
    }
  }

  const startNewGame = () => {
    resetGame()
  }

  if (!gameMode) {
    return (
      <GameLayout title="Tic-tac-toe" instructions={instructions}>
        <div className="flex h-full flex-col items-center justify-center">
          <Card className="w-full max-w-md p-6 text-center">
            <h2 className="mb-6 text-2xl font-bold">Choose Game Mode</h2>
            <div className="flex flex-col gap-4">
              <Button size="lg" onClick={() => setGameMode("friend")} className="text-lg">
                Play with a Friend
              </Button>
              <Button size="lg" onClick={() => setGameMode("computer")} className="text-lg">
                Play against Computer
              </Button>
            </div>
          </Card>
        </div>
      </GameLayout>
    )
  }

  return (
    <GameLayout title="Tic-tac-toe" instructions={instructions} onReset={startNewGame}>
      <div className="flex flex-col items-center justify-center">
        <div className="mb-6 flex items-center gap-4">
          <Badge variant="outline" className="text-lg">
            X: {scores.X}
          </Badge>
          <Badge variant="outline" className="text-lg">
            O: {scores.O}
          </Badge>
          <Badge variant="outline" className="text-lg">
            Draws: {scores.draws}
          </Badge>
        </div>

        <div className="mb-6 text-xl font-semibold">{getStatus()}</div>

        <div className="grid grid-cols-3 gap-2">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>

        {winner && (
          <Button className="mt-6" onClick={startNewGame}>
            Play Again
          </Button>
        )}

        <Button
          variant="outline"
          className="mt-6"
          onClick={() => {
            setGameMode(null)
            resetGame()
          }}
        >
          Change Game Mode
        </Button>
      </div>
    </GameLayout>
  )
}
