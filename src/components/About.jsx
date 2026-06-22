import { motion } from 'framer-motion'
import ProfileCard3D from './ProfileCard3D'
import '../styles/About.css'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <motion.div
          className="about-grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div className="about-3d" variants={fadeInUp}>
            <ProfileCard3D />
          </motion.div>

          <motion.div className="about-text" variants={fadeInUp}>
            <span className="section-label">About Me</span>
            <h2 className="section-title">
              Passionate about <span className="gradient-text">Technology</span>
            </h2>
            <p>
              I'm a passionate 2nd-year B.Tech student exploring Artificial Intelligence,
              Machine Learning, Full-Stack Development, and Cloud Technologies. I enjoy
              solving real-world problems through innovative technology solutions and
              continuously learning emerging technologies.
            </p>

            <motion.div
              className="about-stats"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { value: '2nd', label: 'Year B.Tech' },
                { value: '6+', label: 'Projects' },
                { value: '3+', label: 'Technologies' },
              ].map((stat) => (
                <motion.div key={stat.label} className="about-stat" variants={fadeInUp}>
                  <div className="about-stat-value">{stat.value}</div>
                  <div className="about-stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
