import { motion } from 'framer-motion'
import { FiAward, FiCode } from 'react-icons/fi'
import AnimatedCounter from './AnimatedCounter'
import '../styles/Achievements.css'

const achievements = [
  {
    icon: <FiAward />,
    value: 1,
    label: 'Hackathons Participated',
    suffix: '+',
  },
  {
    icon: <FiCode />,
    value: 3,
    label: 'Coding Challenges Solved',
    suffix: '+',
  },
  {
    icon: <FiAward />,
    value: 2,
    label: 'Certifications',
    suffix: '+',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export default function Achievements() {
  return (
    <section id="achievements" className="achievements">
      <div className="container">
        <motion.div
          className="achievements-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Achievements</span>
          <h2 className="section-title">
            My <span className="gradient-text">Achievements</span>
          </h2>
          <p className="section-subtitle">
            Milestones and accomplishments in my journey so far.
          </p>
        </motion.div>

        <motion.div
          className="achievements-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {achievements.map((item) => (
            <motion.div
              key={item.label}
              className="glass-card achievement-card"
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <span className="achievement-icon">{item.icon}</span>
              <div className="achievement-value">
                <AnimatedCounter target={item.value} suffix={item.suffix} duration={2000} />
              </div>
              <div className="achievement-label">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
