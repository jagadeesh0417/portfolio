import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FiMail, FiPhone, FiMapPin, FiSend, FiLinkedin, FiGithub,
} from 'react-icons/fi'
import { FaXTwitter } from 'react-icons/fa6'
import '../styles/Contact.css'

const contactInfo = [
  { icon: <FiMail />, title: 'Email', text: 'rjagadeeswara66@gmail.com', href: 'mailto:rjagadeeswara66@gmail.com' },
  { icon: <FiPhone />, title: 'Phone', text: '+91 9848579053', href: 'tel:+919848579053' },
  { icon: <FiMapPin />, title: 'Location', text: 'Bangalore, Karnataka', href: null },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email'
    if (!form.subject.trim()) errs.subject = 'Subject is required'
    if (!form.message.trim()) errs.message = 'Message is required'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      setSubmitted(true)
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Contact</span>
          <h2 className="section-title">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="section-subtitle">
            Have a question, project idea, or just want to say hi? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="contact-grid">
          <motion.form
            className="glass-card contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  padding: '12px 16px',
                  background: 'rgba(6, 182, 212, 0.1)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  borderRadius: 8,
                  color: 'var(--accent-cyan)',
                  marginBottom: 20,
                  fontSize: '0.9rem',
                }}
              >
                Message sent successfully! I'll get back to you soon.
              </motion.div>
            )}

            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Your name" value={form.name} onChange={handleChange('name')} />
              {errors.name && <div className="error">{errors.name}</div>}
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="your@email.com" value={form.email} onChange={handleChange('email')} />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input type="text" placeholder="What's this about?" value={form.subject} onChange={handleChange('subject')} />
              {errors.subject && <div className="error">{errors.subject}</div>}
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea placeholder="Your message..." value={form.message} onChange={handleChange('message')} />
              {errors.message && <div className="error">{errors.message}</div>}
            </div>

            <button type="submit" className="btn btn-primary submit-btn">
              <FiSend /> Send Message
            </button>
          </motion.form>

          <motion.div
            className="contact-info"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {contactInfo.map((item) => (
              <div key={item.title} className="glass-card contact-info-item">
                <div className="contact-info-icon">{item.icon}</div>
                <div className="contact-info-text">
                  <h4>{item.title}</h4>
                  {item.href ? (
                    <a href={item.href} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                      {item.text}
                    </a>
                  ) : (
                    <p>{item.text}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="glass-card contact-info-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <h4 style={{ fontSize: '0.9rem', marginBottom: 12, color: 'var(--accent-cyan)' }}>Follow Me</h4>
              <div className="contact-social">
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
          </motion.div>
        </div>

        <motion.div
          className="glass-card contact-map"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.7!2d77.6!3d13.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAwJzAwLjAiTiA3N8KwMzYnMDAuMCJF!5e0!3m2!1sen!2sin!4v1"
            title="Location Map"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  )
}
