"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface GameLayoutProps {
  title: string
  children: React.ReactNode
  instructions?: string
  onReset?: () => void
}

export function GameLayout({ title, children, instructions, onReset }: GameLayoutProps) {
  const [showInstructions, setShowInstructions] = useState(false)

  return (
    <div className="container mx-auto mt-12 flex min-h-[calc(100vh-4rem)] flex-col px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/games">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to games</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        <div className="flex items-center gap-2">
          {instructions && (
            <Button variant="outline" onClick={() => setShowInstructions(!showInstructions)}>
              {showInstructions ? "Hide Instructions" : "How to Play"}
            </Button>
          )}
          {onReset && (
            <Button variant="outline" onClick={onReset}>
              New Game
            </Button>
          )}
        </div>
      </div>

      {instructions && showInstructions && (
        <div className="mb-6 rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
          <h2 className="mb-2 font-semibold">How to Play</h2>
          <p>{instructions}</p>
        </div>
      )}

      <div className="flex-1">{children}</div>
    </div>
  )
}
