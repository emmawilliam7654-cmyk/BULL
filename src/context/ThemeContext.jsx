import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const ThemeContext = createContext(null)

const THEME_KEY = 'theme'
const THEME_TRANSITION_MS = 550

const getStoredTheme = () => localStorage.getItem(THEME_KEY) || 'dark'

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getStoredTheme)

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const setTheme = useCallback((nextTheme) => {
    if (nextTheme === theme) return
    const el = document.documentElement
    el.classList.add('theme-transition')
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setThemeState(nextTheme)
        setTimeout(() => el.classList.remove('theme-transition'), THEME_TRANSITION_MS)
      })
    })
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
