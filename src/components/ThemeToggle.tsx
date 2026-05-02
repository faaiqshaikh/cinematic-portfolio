"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative rounded-full bg-transparent p-2 hover:bg-accent transition-all duration-300 group flex items-center justify-center"
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 text-foreground transition-all dark:-rotate-90 dark:scale-0 group-hover:text-amber-500" />
      <Moon className="absolute h-5 w-5 text-foreground transition-all rotate-90 scale-0 dark:rotate-0 dark:scale-100 group-hover:text-blue-400" />
    </button>
  )
}
