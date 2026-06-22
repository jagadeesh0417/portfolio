import { useEffect, useState } from 'react'
import '../styles/LoadingScreen.css'

export default function LoadingScreen({ onLoaded }) {
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHidden(true)
      setTimeout(() => onLoaded?.(), 800)
    }, 2200)
    return () => clearTimeout(timer)
  }, [onLoaded])

  return (
    <div className={`loading-screen ${isHidden ? 'hidden' : ''}`}>
      <div className="loading-logo">SJ</div>
      <div className="loading-bar">
        <div className="loading-bar-fill" />
      </div>
      <div className="loading-text">LOADING</div>
    </div>
  )
}
