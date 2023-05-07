import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import * as Menubar from '@radix-ui/react-menubar'

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, systemTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const currentTheme = theme === 'system' ? systemTheme : theme

  return (
    <Menubar.Root>
      <Menubar.Menu>
        <Menubar.Trigger>
          <button
            type="button"
            aria-label="Botão para mudar o tema da aplicação"
            className="flex items-center mb-1.5"
          >
            {currentTheme === 'dark' ? (
              <Moon size={18} className="text-gray-400 mr-2" />
            ) : (
              <Sun size={18} className="text-gray-800 mr-2" />
            )}
          </button>
        </Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content className="bg-white shadow-lg rounded-lg py-2 w-32">
            <Menubar.Item
              className={`px-4 py-2 text-gray-800 hover:bg-gray-200 focus:bg-gray-200 ${
                currentTheme === 'light' ? 'bg-blue-200' : ''
              } ${currentTheme === 'light' ? 'focus:outline-none' : ''}`}
              onSelect={() => setTheme('light')}
            >
              <Sun size={18} className="text-gray-800 mr-2 inline-block" />
              <span className="text-gray-800">Light</span>
              {currentTheme === 'light' && (
                <Menubar.ItemIndicator>✓</Menubar.ItemIndicator>
              )}
            </Menubar.Item>
            <Menubar.Item
              className={`px-4 py-2 text-gray-800 hover:bg-gray-200 focus:bg-gray-200 outline-none ${
                currentTheme === 'dark' ? 'bg-blue-200' : ''
              }`}
              onSelect={() => setTheme('dark')}
            >
              <Moon size={18} className="text-gray-800 mr-2 inline-block" />
              <span className="text-gray-800">Dark</span>
              {currentTheme === 'dark' && (
                <Menubar.ItemIndicator>✓</Menubar.ItemIndicator>
              )}
            </Menubar.Item>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>
    </Menubar.Root>
  )
}

export default ThemeSwitch
