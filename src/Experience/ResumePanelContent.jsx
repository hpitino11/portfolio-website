import { useLayoutEffect, useRef } from 'react'
import './ResumePanelContent.css'

export default function ResumePanelContent() {
  const docRef = useRef(null)

  useLayoutEffect(() => {
    const doc = docRef.current
    if (!doc) return

    // Grab scroll container once - we'll pin it to overflow:hidden so any
    // sub-pixel over-extension from the nudge clips silently, no scrollbar.
    const scrollContainer = doc.closest('.info-panel-content')
    if (scrollContainer) scrollContainer.style.overflowY = 'hidden'

    const fit = () => {
      // Reset first so scrollHeight reflects true natural size
      doc.style.zoom = '1'
      void doc.offsetHeight

      // Walk up to info-panel-inner and compute available height from first principles.
      // Measuring info-panel-content.clientHeight is unreliable because flex:1 without
      // min-height:0 lets it grow to content size instead of the container size.
      const panelInner = doc.closest('.info-panel-inner')
      if (!panelInner) return

      const cs     = window.getComputedStyle(panelInner)
      const pt     = parseFloat(cs.paddingTop)    || 0
      const pb     = parseFloat(cs.paddingBottom) || 0
      const innerH = panelInner.getBoundingClientRect().height

      const header  = panelInner.querySelector('.info-panel-header')
      const actions = panelInner.querySelector('.resume-actions-bottom')

      // getBoundingClientRect does NOT include margins - read them explicitly
      const headerH  = header  ? header.getBoundingClientRect().height
        + (parseFloat(window.getComputedStyle(header).marginBottom)  || 0) : 0
      const actionsH = actions ? actions.getBoundingClientRect().height
        + (parseFloat(window.getComputedStyle(actions).marginTop) || 0) : 0

      const available = innerH - pt - pb - headerH - actionsH
      const natural   = doc.scrollHeight

      if (available > 0) {
        const base = available / natural
        // Aesthetic nudge: large screens (zoom > 1) feel slightly too big,
        // small screens (zoom < 1) feel slightly too small.
        const scale = base > 1 ? base * 0.92 : base * 1.04
        doc.style.zoom = String(scale)
      }
    }

    // rAF ensures the panel slide-in has committed its final CSS values
    const id = requestAnimationFrame(fit)
    window.addEventListener('resize', fit)
    return () => {
      cancelAnimationFrame(id)
      window.removeEventListener('resize', fit)
      if (scrollContainer) scrollContainer.style.overflowY = ''
    }
  }, [])

  return (
    <div className="resume-doc" ref={docRef}>

      <div className="resume-doc-header">
        <h1 className="resume-name">Hanna Pitino</h1>
        <p className="resume-contact">
          <span>(561) 800-9423</span>
          <span className="resume-contact-dot">●</span>
          <a href="mailto:hapitino@gmail.com">hapitino@gmail.com</a>
          <span className="resume-contact-dot">●</span>
          <a href="https://hannapitino.com" target="_blank" rel="noopener noreferrer">hannapitino.com</a>
        </p>
      </div>

      <div className="resume-section">
        <h2 className="resume-section-title">Education</h2>
        <div className="resume-entry">
          <div className="resume-entry-header">
            <span className="resume-entry-title">University of Central Florida</span>
            <span className="resume-entry-date">Aug 2022 – Aug 2025</span>
          </div>
          <div className="resume-entry-sub">
            <span>B.S. Computer Science | Provost Scholar</span>
            <span>Orlando, FL</span>
          </div>
        </div>
      </div>

      <div className="resume-section">
        <h2 className="resume-section-title">Experience</h2>

        <div className="resume-entry">
          <div className="resume-entry-header">
            <span className="resume-entry-title">Full-Stack Developer, Freelance</span>
            <span className="resume-entry-date">Feb 2026 – Present</span>
          </div>
          <div className="resume-entry-sub">
            <span>Apex Mitigation LLC</span>
            <span>Port Saint Lucie, FL</span>
          </div>
          <ul className="resume-bullets">
            <li>Built and shipped a PHP/Laravel marketing site from zero to production with no external UI framework dependencies.</li>
            <li>Integrated a Resend-backed contact pipeline with server-side validation, replacing a broken form that was losing client leads.</li>
            <li>Cut page weight by ~50% via asset optimization and template refactoring, hitting sub-2s mobile load times.</li>
          </ul>
        </div>

        <div className="resume-entry">
          <div className="resume-entry-header">
            <span className="resume-entry-title">Full-Stack Developer, Freelance</span>
            <span className="resume-entry-date">Nov 2025 – Feb 2026</span>
          </div>
          <div className="resume-entry-sub">
            <span>Coastal View Insurance Agency</span>
            <span>Palm Beach, FL</span>
          </div>
          <ul className="resume-bullets">
            <li>Built and deployed a full-stack insurance agency site with React frontend and Node.js/Express REST API.</li>
            <li>Cut spam submissions by 90% via rate limiting, server-side validation, and request hardening on the contact endpoint.</li>
          </ul>
        </div>

        <div className="resume-entry">
          <div className="resume-entry-header">
            <span className="resume-entry-title">Software Engineer, Internship</span>
            <span className="resume-entry-date">Apr 2025 – Aug 2025</span>
          </div>
          <div className="resume-entry-sub">
            <span>Mission to Enceladus</span>
            <span>Brownsville, TX</span>
          </div>
          <ul className="resume-bullets">
            <li>Redesigned inventory data transmission in Unreal Engine 5, eliminating redundant transfers to improve performance across modular UI components.</li>
            <li>Built modular inventory UI systems with real-time gameplay data integration, debugging and iterating in an Agile team environment.</li>
          </ul>
        </div>
      </div>

      <div className="resume-section">
        <h2 className="resume-section-title">Projects</h2>

        <div className="resume-entry">
          <div className="resume-entry-header">
            <span className="resume-entry-title">Mewcha | Boba Cafe Ordering App</span>
            <span className="resume-entry-date">Jun 2026</span>
          </div>
          <div className="resume-entry-sub">
            <span className="resume-entry-tech">React, TypeScript, Node.js, Express, PostgreSQL</span>
          </div>
          <ul className="resume-bullets">
            <li>Shipped a full-stack ordering platform with a React/TypeScript storefront and admin dashboard, secured with JWT auth and role-based middleware guards.</li>
            <li>Designed a normalized PostgreSQL schema with Knex migrations for cart state and order history, backed by a protected REST API.</li>
          </ul>
        </div>

        <div className="resume-entry">
          <div className="resume-entry-header">
            <span className="resume-entry-title">Roomfolio | 3D Interactive Portfolio</span>
            <span className="resume-entry-date">Mar 2026</span>
          </div>
          <div className="resume-entry-sub">
            <span className="resume-entry-tech">React, Three.js, Blender</span>
          </div>
          <ul className="resume-bullets">
            <li>Built a real-time 3D portfolio in React and Three.js from scratch, combining custom scene composition and dynamic UI overlays.</li>
            <li>Improved render performance by ~40% via baked lighting and geometry simplification, maintaining 60+ fps on mid-range hardware.</li>
          </ul>
        </div>
      </div>

      <div className="resume-section">
        <h2 className="resume-section-title">Technical Skills</h2>
        <div className="resume-skills-list">
          <div className="resume-skill-row">
            <span className="resume-skill-label">Languages</span>
            <span className="resume-skill-value">JavaScript, TypeScript, HTML/CSS, SQL, Java, PHP</span>
          </div>
          <div className="resume-skill-row">
            <span className="resume-skill-label">Frontend</span>
            <span className="resume-skill-value">React, Three.js, CSS Modules, Responsive Design, Component Architecture</span>
          </div>
          <div className="resume-skill-row">
            <span className="resume-skill-label">Backend</span>
            <span className="resume-skill-value">Node.js, Express, REST APIs, PostgreSQL, MySQL, Knex</span>
          </div>
          <div className="resume-skill-row">
            <span className="resume-skill-label">Cloud & Infra</span>
            <span className="resume-skill-value">Railway, AWS, Docker, DNS, SSL/TLS</span>
          </div>
          <div className="resume-skill-row">
            <span className="resume-skill-label">Tools</span>
            <span className="resume-skill-value">Git, Jira, Postman, Figma, Blender</span>
          </div>
        </div>
      </div>

    </div>
  )
}
