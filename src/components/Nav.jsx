import { useState, useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext.jsx'
import './Nav.css'

function Nav() {
  const { theme, setTheme } = useTheme()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <nav className="nav">
      <div className="nav__inner">
        <a href="#" className="nav__logo">
          <span className="nav__ticker ticker">$BULL</span>
        </a>
        <div className="nav__actions">
          <div
              className={`nav__mode-wrap ${dropdownOpen ? 'nav__mode-wrap--open' : ''}`}
              ref={dropdownRef}
            >
            <button
              type="button"
              className="nav__mode-btn"
              onClick={() => setDropdownOpen((o) => !o)}
              aria-expanded={dropdownOpen}
              aria-haspopup="listbox"
              aria-label="Theme mode"
            >
              Mode
              <svg className="nav__mode-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {dropdownOpen && (
              <ul
                className="nav__dropdown"
                role="listbox"
                aria-label="Theme options"
              >
                <li role="option">
                  <button
                    type="button"
                    className={`nav__dropdown-item ${theme === 'light' ? 'nav__dropdown-item--active' : ''}`}
                    onClick={() => {
                      setTheme('light')
                      setDropdownOpen(false)
                    }}
                  >
                    Light
                  </button>
                </li>
                <li role="option">
                  <button
                    type="button"
                    className={`nav__dropdown-item ${theme === 'dark' ? 'nav__dropdown-item--active' : ''}`}
                    onClick={() => {
                      setTheme('dark')
                      setDropdownOpen(false)
                    }}
                  >
                    Dark
                  </button>
                </li>
              </ul>
            )}
          </div>
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="nav__x"
            aria-label="X (Twitter)"
          >
            <svg className="nav__x-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Nav
