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
            <span className="resume-entry-title">Full-Stack Developer (Contract)</span>
            <span className="resume-entry-date">Feb 2026 – Present</span>
          </div>
          <div className="resume-entry-sub">
            <span>Apex Mitigation LLC</span>
            <span>Port Saint Lucie, FL</span>
          </div>
          <ul className="resume-bullets">
            <li>Built and deployed a full-stack marketing website for a water damage restoration company using Laravel (PHP 8.4) and Blade templating, covering multiple pages including service pages, project gallery, pricing, FAQ, and contact.</li>
            <li>Integrated a contact form with transactional email delivery via Resend, routing client lead inquiries directly from the site.</li>
            <li>Implemented a fully responsive mobile layout with custom CSS and optimized site performance through video compression and reduced template overhead.</li>
          </ul>
        </div>

        <div className="resume-entry">
          <div className="resume-entry-header">
            <span className="resume-entry-title">Full-Stack Developer (Contract)</span>
            <span className="resume-entry-date">Nov 2025 – Feb 2026</span>
          </div>
          <div className="resume-entry-sub">
            <span>Coastal View Insurance Agency</span>
            <span>Palm Beach, FL</span>
          </div>
          <ul className="resume-bullets">
            <li>Built and deployed a production-grade insurance website using HTML/CSS, Node.js and Express, delivering a fully responsive UI and backend API system for real client use.</li>
            <li>Reduced spam submissions by 90% by implementing rate limiting, validation logic, and secure request handling.</li>
            <li>Configured DNS, SSL/TLS, and hosting infrastructure, successfully launching a publicly accessible site with end-to-end HTTPS security.</li>
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
            <li>Designed and built a full-stack caregiving operations dashboard from scratch, modeling a PostgreSQL schema across three relational tables with domain-specific fields including service type, visit status, and multi-day scheduling support for 24/7 care arrangements.</li>
            <li>Engineered real-time dashboard stats including week-over-week trend tracking, daily visit counts, and cancellation banners with live date context.</li>
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
            <li>Engineered an interactive 3D portfolio experience using Three.js and React, combining real-time rendering with dynamic UI interactions to showcase projects in an immersive environment.</li>
            <li>Achieved ~40% improvement in rendering performance by optimizing scene complexity through baked lighting, efficient geometry, and texture-driven rendering techniques.</li>
          </ul>
        </div>
      </div>

      <div className="resume-section">
        <h2 className="resume-section-title">Technical Skills</h2>
        <div className="resume-skills-list">
          <div className="resume-skill-row">
            <span className="resume-skill-label">Languages</span>
            <span className="resume-skill-value">HTML/CSS, JavaScript/TypeScript, Java, SQL, PHP</span>
          </div>
          <div className="resume-skill-row">
            <span className="resume-skill-label">Frameworks & Libraries</span>
            <span className="resume-skill-value">React, ThreeJS, Bootstrap, Express, Laravel</span>
          </div>
          <div className="resume-skill-row">
            <span className="resume-skill-label">Web & Deployment</span>
            <span className="resume-skill-value">DNS configuration, SSL/TLS setup, Railway</span>
          </div>
          <div className="resume-skill-row">
            <span className="resume-skill-label">Tools & Platforms</span>
            <span className="resume-skill-value">Git, Jira, Postman, Docker, AWS, Azure DevOps</span>
          </div>
          <div className="resume-skill-row">
            <span className="resume-skill-label">Systems & Concepts</span>
            <span className="resume-skill-value">Object-Oriented Design, Data Structures, Algorithms, RESTful APIs, Agile Development</span>
          </div>
        </div>
      </div>

    </div>
  )
}
