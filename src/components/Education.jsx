import { motion } from 'framer-motion'
import { FiBookOpen } from 'react-icons/fi'
import '../styles/Education.css'

const education = [
  {
    degree: 'B.Tech in Computer Science & Engineering',
    institution: 'Presidency University, Bangalore',
    year: '2024 - 2028',
    details: [
      { label: 'Year', value: '2nd' },
      { label: 'CGPA', value: '6.5' },
    ],
    current: true,
  },
  {
    degree: 'Intermediate (XII)',
    institution: 'Chaitanya, Bangalore',
    year: '2022 - 2024',
    details: [
      { label: 'Percentage', value: '75%' },
    ],
    current: false,
  },
  {
    degree: 'SSC (X)',
    institution: 'Keshava Reddy School',
    year: '2022',
    details: [
      { label: 'Percentage', value: '100%' },
    ],
    current: false,
  },
]

const fadeIn = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Education() {
  return (
    <section id="education" className="education">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Education</span>
          <h2 className="section-title">Academic <span className="gradient-text">Journey</span></h2>
        </motion.div>

        <div className="education-timeline">
          {education.map((item, i) => (
            <motion.div
              key={item.degree}
              className="education-item"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <div className={`education-dot ${item.current ? 'current' : ''}`} />
              <div className="glass-card education-card">
                <h3 className="degree">
                  {item.current && <FiBookOpen style={{ marginRight: 8, color: 'var(--accent-cyan)', verticalAlign: 'middle' }} />}
                  {item.degree}
                </h3>
                <p className="institution">{item.institution}</p>
                <div className="details">
                  <span className="detail-tag">{item.year}</span>
                  {item.details.map((d) => (
                    <span key={d.label} className="detail-tag">
                      {d.label}: {d.value}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
