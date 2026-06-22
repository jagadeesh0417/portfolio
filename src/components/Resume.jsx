import { motion } from 'framer-motion'
import { FiDownload, FiEye, FiCalendar, FiMapPin } from 'react-icons/fi'
import '../styles/Resume.css'

const experiences = [
  {
    title: 'Full Stack Developer Intern',
    org: 'Building Personal Projects',
    period: '2025 - Present',
    type: 'Self-Learning',
  },
  {
    title: 'AI/ML Explorer',
    org: 'Academic Projects',
    period: '2024 - Present',
    type: 'Self-Learning',
  },
  {
    title: 'Web Development Learner',
    org: 'Online Courses & Bootcamps',
    period: '2024 - Present',
    type: 'Self-Learning',
  },
]

export default function Resume() {
  return (
    <section id="resume" className="resume">
      <div className="container">
        <motion.div
          className="resume-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Resume</span>
          <h2 className="section-title">
            My <span className="gradient-text">Resume</span>
          </h2>
          <p className="section-subtitle">
            Download my resume or view my professional journey below.
          </p>
        </motion.div>

        <div className="resume-content">
          <motion.div
            className="glass-card resume-preview"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h4>Professional Timeline</h4>
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                className="resume-timeline-item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="title">{exp.title}</div>
                <div className="org">{exp.org}</div>
                <div className="period">
                  <FiCalendar size={12} style={{ marginRight: 4 }} />
                  {exp.period}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="resume-actions"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a href="/resume.pdf" download className="btn btn-primary">
              <FiDownload /> Download Resume (PDF)
            </a>
            <button className="btn btn-secondary" onClick={() => window.open('/resume.pdf', '_blank')}>
              <FiEye /> View Online
            </button>
            <div className="glass-card" style={{ padding: 24 }}>
              <h4 style={{ fontSize: '0.95rem', marginBottom: 12, color: 'var(--accent-cyan)' }}>
                Quick Info
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                <span><FiMapPin size={12} style={{ marginRight: 6 }} /> Bangalore, Karnataka</span>
                <span><FiCalendar size={12} style={{ marginRight: 6 }} /> Available for internships</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
