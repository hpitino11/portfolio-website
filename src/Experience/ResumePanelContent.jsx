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
          <span className="resume-contact-dot">●</span>
          <a href="https://linkedin.com/in/hanna-pitino/" target="_blank" rel="noopener noreferrer">linkedin.com/in/hanna-pitino</a>
        </p>
      </div>

      <p className="resume-summary">
        Full-stack developer specializing in React, TypeScript, and Node.js, with experience building and deploying
        production websites, REST APIs, customer inquiry systems, and interactive 3D web applications. Improved page
        performance by 57% and reduced automated form submissions by 90% through frontend optimization and backend validation.
      </p>

      <div className="resume-section">
        <h2 className="resume-section-title">Education</h2>
        <div className="resume-entry">
          <div className="resume-entry-header">
            <span className="resume-entry-title">University of Central Florida</span>
            <span className="resume-entry-date">Aug 2022 – Jul 2025</span>
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
            <span className="resume-entry-title">Freelance Full-Stack Developer</span>
            <span className="resume-entry-date">Feb 2026 – Present</span>
          </div>
          <div className="resume-entry-sub">
            <span>Apex Mitigation LLC</span>
            <span>Port Saint Lucie, FL</span>
          </div>
          <ul className="resume-bullets">
            <li>Designed and shipped a full-stack marketing website from the ground up. Client had no existing email system for lead capture; architected complete contact pipeline infrastructure using PHP/Laravel backend with Resend integration.</li>
            <li>Reduced mobile load time from 4.2s to 1.8s by compressing video, optimizing images, and refactoring frontend templates. Implemented server-side validation and error handling on responsive frontend.</li>
          </ul>
        </div>

        <div className="resume-entry">
          <div className="resume-entry-header">
            <span className="resume-entry-title">Freelance Full-Stack Developer</span>
            <span className="resume-entry-date">Nov 2025 – Feb 2026</span>
          </div>
          <div className="resume-entry-sub">
            <span>Coastal View Insurance Agency</span>
            <span>Palm Beach, FL</span>
          </div>
          <ul className="resume-bullets">
            <li>Built and deployed production web application (React frontend, Node.js/Express backend) handling live customer traffic. Implemented fully responsive UI with RESTful API for insurance inquiry submissions.</li>
            <li>Reduced malicious form submissions by 90% through multi-layer spam prevention: rate limiting, server-side validation, and honeypot fields. Maintained data integrity for legitimate customer inquiries.</li>
          </ul>
        </div>

        <div className="resume-entry">
          <div className="resume-entry-header">
            <span className="resume-entry-title">Software Engineering Intern</span>
            <span className="resume-entry-date">Apr 2025 – Aug 2025</span>
          </div>
          <div className="resume-entry-sub">
            <span>Mission to Enceladus</span>
            <span>Brownsville, TX</span>
          </div>
          <ul className="resume-bullets">
            <li>Optimized inventory data synchronization in real-time multiplayer game built in Unreal Engine 5. Identified and eliminated redundant client-server data transfers, reducing network payload by ~40% on inventory system calls.</li>
            <li>Improved player experience by reducing latency in inventory interactions during active multiplayer sessions. Debugged complex state synchronization across game engine, network layer, and UI systems in Agile environment.</li>
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
            <li>Shipped a complete full-stack ordering platform with separate storefront and admin dashboards. Implemented JWT authentication with role-based middleware to enforce access control across both interfaces.</li>
            <li>Designed a normalized PostgreSQL schema with Knex migrations supporting product customization, shopping cart state, and order history, plus a RESTful Node.js/Express API with protected admin routes.</li>
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
            <li>Built real-time 3D environment from scratch using React and Three.js without starter templates or off-the-shelf 3D libraries. Implemented custom scene composition, dynamic UI overlays, and complete Blender asset pipeline.</li>
            <li>Optimized rendering for broad hardware compatibility through baked lighting, geometry simplification, and material compression. Maintained approximately 60 FPS on tested midrange desktop hardware.</li>
          </ul>
        </div>
      </div>

      <div className="resume-section">
        <h2 className="resume-section-title">Technical Skills</h2>
        <div className="resume-skills-list">
          <div className="resume-skill-row">
            <span className="resume-skill-label">Languages</span>
            <span className="resume-skill-value">JavaScript, TypeScript, HTML/CSS, SQL, PHP</span>
          </div>
          <div className="resume-skill-row">
            <span className="resume-skill-label">Frontend</span>
            <span className="resume-skill-value">React, Three.js, TypeScript, CSS Modules</span>
          </div>
          <div className="resume-skill-row">
            <span className="resume-skill-label">Backend</span>
            <span className="resume-skill-value">Node.js, Express, REST APIs, PostgreSQL, MySQL, Knex</span>
          </div>
          <div className="resume-skill-row">
            <span className="resume-skill-label">Tools & Platforms</span>
            <span className="resume-skill-value">Railway, Docker, DNS/SSL, Git, Postman, Figma, Blender, Unreal Engine 5</span>
          </div>
        </div>
      </div>

    </div>
  )
}
