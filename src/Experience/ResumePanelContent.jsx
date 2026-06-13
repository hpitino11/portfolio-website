import './ResumePanelContent.css'

export default function ResumePanelContent() {
  return (
    <div className="resume-doc">

      <div className="resume-doc-header">
        <h1 className="resume-name">Hanna Pitino</h1>
        <p className="resume-contact">
          <span>(561) 800-9423</span>
          <span className="resume-contact-dot">●</span>
          <a href="mailto:hapitino@gmail.com">hapitino@gmail.com</a>
          <span className="resume-contact-dot">●</span>
          <a href="https://hannapitino.com" target="_blank" rel="noopener noreferrer">hannapitino.com</a>
        </p>
        <p className="resume-summary">
          Full-stack React and Node.js developer with a strong design sensibility, two production client sites, and a portfolio that spans JWT-authenticated apps, real-time dashboards, and a 3D interactive environment.
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
            <li>Delivered a full-stack marketing site using a PHP/Laravel backend and a custom responsive frontend, taking the project from zero to production with no external UI framework dependencies.</li>
            <li>Integrated a Resend-backed contact pipeline with server-side validation that routes client leads to ownership in seconds, replacing a broken flow that had been losing inquiries entirely.</li>
            <li>Reduced page weight by ~50% through video compression, asset optimization, and template refactoring, achieving sub-2-second mobile load times.</li>
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
            <li>Built and deployed a production site for an insurance agency using React, Node.js, and Express, delivering a fully responsive frontend and RESTful API backend for live client use.</li>
            <li>Cut spam form submissions by 90% with rate limiting, server-side validation, and request hardening on the public-facing contact endpoint.</li>
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
            <li>Shipped a full-stack ordering platform with a React/TypeScript storefront and separate admin dashboard, implementing JWT authentication with role-based middleware guards to enforce access control across both interfaces.</li>
            <li>Designed a normalized PostgreSQL schema with Knex migrations supporting customization, cart state, and order history, plus a RESTful Node.js/Express API with protected admin routes.</li>
          </ul>
        </div>

        <div className="resume-entry">
          <div className="resume-entry-header">
            <span className="resume-entry-title">CareCalendar | Caregiving Operations Dashboard</span>
            <span className="resume-entry-date">May 2026</span>
          </div>
          <div className="resume-entry-sub">
            <span className="resume-entry-tech">React, Node.js, Express, PostgreSQL</span>
          </div>
          <ul className="resume-bullets">
            <li>Developed a caregiving operations dashboard including a React frontend and Node.js/PostgreSQL backend, modeling a 3-table relational schema for service tracking, visit status, and multi-day scheduling.</li>
            <li>Engineered real-time analytics including week-over-week trends, daily visit counts, and a live cancellation banner, giving operations staff a one-screen view of agency health.</li>
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
            <li>Created a real-time 3D portfolio environment in React and Three.js from scratch with no starter template, combining custom scene composition and dynamic UI overlays.</li>
            <li>Improved rendering performance by ~40% through baked lighting, geometry simplification, and texture-driven materials, holding 60+ fps on mid-range hardware.</li>
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
            <span className="resume-skill-value">React, Three.js, CSS Modules, Responsive Design, Component-Based Architecture</span>
          </div>
          <div className="resume-skill-row">
            <span className="resume-skill-label">Backend</span>
            <span className="resume-skill-value">Node.js, Express, REST APIs, PostgreSQL, MySQL, Knex</span>
          </div>
          <div className="resume-skill-row">
            <span className="resume-skill-label">Cloud & Infrastructure</span>
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
