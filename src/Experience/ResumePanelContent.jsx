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
          <span className="resume-contact-dot">●</span>
          <a href="https://linkedin.com/in/hanna-pitino" target="_blank" rel="noopener noreferrer">linkedin.com/in/hanna-pitino</a>
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
            <span>Bachelor of Science in Computer Science</span>
            <span>Orlando, FL</span>
          </div>
        </div>
      </div>

      <div className="resume-section">
        <h2 className="resume-section-title">Experience</h2>

        <div className="resume-entry">
          <div className="resume-entry-header">
            <span className="resume-entry-title">Full-Stack Developer, Contract</span>
            <span className="resume-entry-date">Feb 2026 – Present</span>
          </div>
          <div className="resume-entry-sub">
            <span>Apex Mitigation LLC</span>
            <span>Port Saint Lucie, FL</span>
          </div>
          <ul className="resume-bullets">
            <li>Shipped a multipage Laravel and Blade marketing site for a water and fire damage restoration company, owning the full stack from PHP 8.4 backend to a custom responsive UI with no external framework dependencies.</li>
            <li>Built a Resend backed contact pipeline with server side validation that routes inbound client leads to ownership within seconds of submission, replacing a flow that previously lost lead inquiries entirely.</li>
            <li>Reduced initial page weight by roughly 50 percent through video compression, asset optimization, and Blade partial refactoring, holding mobile load under 2 seconds.</li>
          </ul>
        </div>

        <div className="resume-entry">
          <div className="resume-entry-header">
            <span className="resume-entry-title">Full-Stack Developer, Contract</span>
            <span className="resume-entry-date">Nov 2025 – Feb 2026</span>
          </div>
          <div className="resume-entry-sub">
            <span>Coastal View Insurance Agency</span>
            <span>Palm Beach, FL</span>
          </div>
          <ul className="resume-bullets">
            <li>Designed, built, and deployed a production insurance agency site serving live client traffic, using Node.js and Express on the backend with a fully responsive HTML and CSS frontend.</li>
            <li>Cut spam form submissions by 90 percent by layering rate limiting, server side validation, and request hardening on the public contact endpoint.</li>
            <li>Owned end to end deployment including DNS configuration, SSL/TLS provisioning, and HTTPS hardening, taking the site from local dev to publicly accessible production.</li>
          </ul>
        </div>
      </div>

      <div className="resume-section">
        <h2 className="resume-section-title">Projects</h2>

        <div className="resume-entry">
          <div className="resume-entry-header">
            <span className="resume-entry-title">Full-Stack Admin Dashboard</span>
            <span className="resume-entry-date">May 2026</span>
          </div>
          <div className="resume-entry-sub">
            <span className="resume-entry-tech">React, JavaScript, PostgreSQL</span>
          </div>
          <ul className="resume-bullets">
            <li>Modeled a normalized PostgreSQL schema across three relational tables to support 24/7 care coordination, including domain specific fields for service type, visit status, and multi day scheduling for overlapping caregivers and clients.</li>
            <li>Engineered real-time dashboard analytics including week-over-week trend tracking, daily visit counts, and a live cancellation banner, giving operations staff a one screen view of agency health.</li>
          </ul>
        </div>

        <div className="resume-entry">
          <div className="resume-entry-header">
            <span className="resume-entry-title">3D Portfolio Environment</span>
            <span className="resume-entry-date">Mar 2026</span>
          </div>
          <div className="resume-entry-sub">
            <span className="resume-entry-tech">Three.js, React, Blender</span>
          </div>
          <ul className="resume-bullets">
            <li>Engineered an interactive 3D portfolio in Three.js and React combining real-time rendering with dynamic UI overlays for project navigation.</li>
            <li>Improved rendering performance by ~40 percent through baked lighting, geometry simplification, and texture driven materials, holding over 60 fps on mid range hardware.</li>
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
            <span className="resume-skill-label">Frameworks</span>
            <span className="resume-skill-value">React, Node.js, Express, Three.js, Laravel and Blade</span>
          </div>
          <div className="resume-skill-row">
            <span className="resume-skill-label">Databases</span>
            <span className="resume-skill-value">PostgreSQL, MySQL</span>
          </div>
          <div className="resume-skill-row">
            <span className="resume-skill-label">Cloud and Infrastructure</span>
            <span className="resume-skill-value">AWS, Docker, Railway, Azure DevOps, DNS, SSL/TLS</span>
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
