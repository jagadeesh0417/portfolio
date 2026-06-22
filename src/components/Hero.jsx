import { motion } from 'framer-motion'
import { FiArrowDown, FiDownload, FiEye } from 'react-icons/fi'
import { HiOutlineMail } from 'react-icons/hi'
import Typewriter from './Typewriter'
import Hero3D from './Hero3D'
import '../styles/Hero.css'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="hero">
      <div className="container">
        <motion.div
          className="hero-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="hero-content">
            <motion.div className="hero-badge" variants={itemVariants}>
              <span className="hero-badge-dot" />
              Available for opportunities
            </motion.div>

            <motion.h1 className="hero-title" variants={itemVariants}>
              <span className="hero-title-line">Hi, I'm</span>
              <span className="hero-title-line hero-title-gradient">
                S Jagadeeshwara Reddy
              </span>
            </motion.h1>

            <motion.div className="hero-subtitle" variants={itemVariants}>
              <Typewriter />
            </motion.div>

            <motion.div className="hero-actions" variants={itemVariants}>
              <button className="btn btn-primary" onClick={() => scrollTo('projects')}>
                <FiEye /> View Projects
              </button>
              <a href="/resume.pdf" download className="btn btn-secondary">
                <FiDownload /> Download Resume
              </a>
              <button className="btn btn-outline" onClick={() => scrollTo('contact')}>
                <HiOutlineMail /> Contact Me
              </button>
            </motion.div>
          </div>

          <motion.div
            className="hero-3d"
            variants={itemVariants}
          >
            <Hero3D />
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-scroll-indicator"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <span>Scroll</span>
          <div className="scroll-arrow" />
        </motion.div>
      </div>
    </section>
  )
}
