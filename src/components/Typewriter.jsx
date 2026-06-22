import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const phrases = [
  'Building intelligent solutions with AI, Web Development, and Emerging Technologies.',
  'Crafting scalable web applications with modern frameworks.',
  'Exploring the frontiers of Machine Learning and AI.',
  'Turning complex problems into elegant solutions.',
]

export default function Typewriter({ text, phrases: customPhrases, speed = 50, delay = 2000 }) {
  const [displayText, setDisplayText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const activePhrases = customPhrases || phrases

  useEffect(() => {
    const currentPhrase = activePhrases[phraseIndex]
    let timeout

    if (!isDeleting && displayText === currentPhrase) {
      timeout = setTimeout(() => setIsDeleting(true), delay)
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false)
      setPhraseIndex((prev) => (prev + 1) % activePhrases.length)
    } else {
      timeout = setTimeout(
        () => {
          setDisplayText(
            isDeleting
              ? currentPhrase.substring(0, displayText.length - 1)
              : currentPhrase.substring(0, displayText.length + 1)
          )
        },
        isDeleting ? speed / 2 : speed
      )
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, phraseIndex, activePhrases, speed, delay])

  return (
    <motion.span
      className="typewriter-text"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayText}
      <motion.span
        className="typewriter-cursor"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut' }}
        style={{ 
          display: 'inline-block',
          width: '2px',
          height: '1em',
          background: 'var(--accent-cyan)',
          marginLeft: '2px',
          verticalAlign: 'text-bottom'
        }}
      />
    </motion.span>
  )
}
