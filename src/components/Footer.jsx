import { motion } from 'framer-motion'
import { FiLinkedin, FiGithub, FiHeart } from 'react-icons/fi'
import { FaXTwitter } from 'react-icons/fa6'
import '../styles/Footer.css'

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const scrollTo = (href) => {
    const el = document.getElementById(href.slice(1))
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>
              <span>SJ</span>.dev
            </h3>
            <p>
              Building intelligent solutions with AI, Web Development, and
              Emerging Technologies. Always eager to learn and create.
            </p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-social">
            <h4>Connect</h4>
            <div className="footer-social-icons">
              <a href="https://www.linkedin.com/in/sangireddyjagadeeshwarareddy" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FiLinkedin />
              </a>
              <a href="https://github.com/jagadeesh0417" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FiGithub />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaXTwitter />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-divider" />

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p>
            &copy; 2026 S Jagadeeshwara Reddy. All Rights Reserved.
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            Made with <FiHeart style={{ color: '#ec4899' }} /> by SJ
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
