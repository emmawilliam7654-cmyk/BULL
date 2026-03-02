import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import LoadingScreen from './components/LoadingScreen.jsx'
import './index.css'

// Apply saved theme immediately so dark is default and refresh keeps user's choice
const savedTheme = localStorage.getItem('theme') || 'dark'
document.documentElement.setAttribute('data-theme', savedTheme)

function Root() {
  const [loading, setLoading] = useState(true)
  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />
  }
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
