import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiCode, FiUsers } from 'react-icons/fi'
import { DiPython, DiJava, DiHtml5, DiCss3, DiMysql } from 'react-icons/di'
import {
  SiC, SiJavascript, SiReact, SiNodedotjs, SiTensorflow, SiOpenai, SiGit,
} from 'react-icons/si'
import '../styles/Skills.css'

const techSkills = [
  { name: 'Python', icon: <DiPython />, level: '75%' },
  { name: 'Java', icon: <DiJava />, level: '70%' },
  { name: 'C', icon: <SiC />, level: '75%' },
  { name: 'HTML', icon: <DiHtml5 />, level: '85%' },
  { name: 'CSS', icon: <DiCss3 />, level: '80%' },
  { name: 'JavaScript', icon: <SiJavascript />, level: '75%' },
  { name: 'React', icon: <SiReact />, level: '70%' },
  { name: 'Node.js', icon: <SiNodedotjs />, level: '65%' },
  { name: 'Machine Learning', icon: <SiTensorflow />, level: '60%' },
  { name: 'Artificial Intelligence', icon: <SiOpenai />, level: '55%' },
  { name: 'SQL', icon: <DiMysql />, level: '70%' },
  { name: 'Git & GitHub', icon: <SiGit />, level: '75%' },
]

const softSkills = [
  { name: 'Problem Solving', level: '85%' },
  { name: 'Teamwork', level: '80%' },
  { name: 'Communication', level: '75%' },
  { name: 'Leadership', level: '70%' },
  { name: 'Time Management', level: '80%' },
]

function SkillCard({ skill, index }) {
  const [inView, setInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      className="glass-card skill-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      {skill.icon && <span className="skill-icon">{skill.icon}</span>}
      <span className="skill-name">{skill.name}</span>
      <div className="skill-bar">
        <div
          className={`skill-bar-fill ${inView ? 'animate' : ''}`}
          style={{ '--skill-level': skill.level }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="container">
        <motion.div
          className="skills-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Skills & Expertise</span>
          <h2 className="section-title">My <span className="gradient-text">Skills</span></h2>
          <p className="section-subtitle">
            Technologies and tools I work with to build amazing digital experiences.
          </p>
        </motion.div>

        <div className="skills-category">
          <h3 className="skills-category-title">
            <FiCode /> Technical Skills
          </h3>
          <div className="skills-grid">
            {techSkills.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </div>
        </div>

        <div className="skills-category">
          <h3 className="skills-category-title">
            <FiUsers /> Soft Skills
          </h3>
          <div className="skills-grid">
            {softSkills.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
