import { useEffect, useRef } from 'react'

export default function Cursor() {
  const cursorRef = useRef(null)
  const trailRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const trail = trailRef.current
    if (!cursor) return

    let mouseX = 0, mouseY = 0
    let cursorX = 0, cursorY = 0

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
    }

    const onMouseEnter = () => {
      cursor.style.opacity = '1'
      if (trail) trail.style.opacity = '0.5'
    }

    const onMouseLeave = () => {
      cursor.style.opacity = '0'
      if (trail) trail.style.opacity = '0'
    }

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.15
      cursorY += (mouseY - cursorY) * 0.15
      if (trail) {
        trail.style.transform = `translate(${cursorX - 20}px, ${cursorY - 20}px)`
      }
      requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseleave', onMouseLeave)
    animate()

    const handleHoverables = () => {
      const hoverables = document.querySelectorAll('a, button, .btn, .glass-card, .skill-card, .achievement-card, .contact-info-item')
      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'))
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'))
      })
    }
    handleHoverables()

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor"
        style={{
          position: 'fixed',
          width: '8px',
          height: '8px',
          background: 'var(--accent-cyan)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s, height 0.2s, opacity 0.3s',
          opacity: 0,
          boxShadow: '0 0 10px var(--accent-cyan), 0 0 20px rgba(6, 182, 212, 0.3)',
        }}
      />
      <div
        ref={trailRef}
        className="cursor-trail"
        style={{
          position: 'fixed',
          width: '40px',
          height: '40px',
          border: '1px solid rgba(6, 182, 212, 0.3)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'opacity 0.3s',
          opacity: 0,
        }}
      />
      <style>{`
        .custom-cursor.hover {
          width: 16px !important;
          height: 16px !important;
          background: rgba(6, 182, 212, 0.5) !important;
        }
        @media (max-width: 768px) {
          .custom-cursor, .cursor-trail { display: none !important; }
        }
      `}</style>
    </>
  )
}
