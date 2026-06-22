import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Education from './components/Education'
import Achievements from './components/Achievements'
import Resume from './components/Resume'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ParticleBackground from './components/ParticleBackground'
import LoadingScreen from './components/LoadingScreen'
import Cursor from './components/Cursor'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark'
    }
    return 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onLoaded={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Cursor />
          <ParticleBackground />
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <main style={{ position: 'relative', zIndex: 1 }}>
            <Hero />
            <About />
            <Skills />
            <Education />
            <Achievements />
            <Resume />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      )}
    </>
  )
}
