"use client"

import React from 'react'
import { cn } from '@/lib/utils'

interface SkipLink {
  href: string
  label: string
}

interface SkipLinksProps {
  links: SkipLink[]
  className?: string
}

export function SkipLinks({ links, className }: SkipLinksProps) {
  return (
    <div className={cn("sr-only focus-within:not-sr-only", className)}>
      <nav aria-label="Skip navigation links">
        <ul className="flex flex-col gap-1 p-2 bg-primary text-primary-foreground">
          {links.map((link, index) => (
            <li key={index}>
              <a
                href={link.href}
                className={cn(
                  "inline-block px-3 py-2 rounded",
                  "focus:outline-none focus:ring-2 focus:ring-offset-2",
                  "focus:ring-white focus:bg-primary-foreground focus:text-primary",
                  "hover:bg-primary-foreground hover:text-primary",
                  "transition-colors duration-200"
                )}
                onClick={(e) => {
                  e.preventDefault()
                  const target = document.querySelector(link.href)
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' })
                    // Set focus to target if it's focusable
                    if (target instanceof HTMLElement) {
                      target.focus()
                    }
                  }
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}