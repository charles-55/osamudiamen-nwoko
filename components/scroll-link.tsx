"use client"

import type React from "react"

import type { ReactNode } from "react"

interface ScrollLinkProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function ScrollLink({ href, children, className, onClick }: ScrollLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    // Handle external links
    if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener,noreferrer")
      return
    }

    // Handle internal anchor links
    const targetId = href.replace(/.*#/, "")
    const element = document.getElementById(targetId)

    if (element) {
      // Scroll to the element with smooth behavior
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })

      // Update URL without reload
      window.history.pushState(null, "", href)
    }

    // Call additional onClick handler if provided
    if (onClick) onClick()
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}

