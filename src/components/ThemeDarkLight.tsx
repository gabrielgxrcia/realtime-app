'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { useState } from 'react'
import React from 'react'

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, systemTheme } = useTheme()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const currentTheme = theme === 'system' ? systemTheme : theme

  const handleThemeChange = (value: string) => {
    setTheme(value)
  }

  return (
    <Select onValueChange={handleThemeChange} value={currentTheme}>
      <SelectTrigger>
        <div className="flex items-center">
          {currentTheme === 'dark' ? (
            <Moon size={18} className="text-gray-400 mr-2" />
          ) : (
            <Sun size={18} className="text-gray-800 mr-2" />
          )}
        </div>
      </SelectTrigger>
      <SelectContent className="dark:bg-zinc-900 dark:border-zinc-800">
        <SelectItem
          className="dark:hover:bg-zinc-800 cursor-pointer"
          value="light"
        >
          Light
        </SelectItem>
        <SelectItem
          className="dark:hover:bg-zinc-800 cursor-pointer"
          value="dark"
        >
          Dark
        </SelectItem>
        <SelectItem
          className="dark:hover:bg-zinc-800 cursor-pointer"
          value="system"
        >
          System
        </SelectItem>
      </SelectContent>
    </Select>
  )
}

export default ThemeSwitch
