import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './AboutPanelContent.css'

const pages = [
  { id: 'intro' },
  { id: 'about' },
  { id: 'skills' },
  { id: 'personal' }
]

export default function AboutPanelContent() {
  const [pageIndex, setPageIndex] = useState(1)
  const introLeaving = false

  const goPrev = () => {
    setPageIndex((prev) => Math.max(prev - 1, 1))
  }

  const goNext = () => {
    setPageIndex((prev) => Math.min(prev + 1, pages.length - 1))
  }

  return (
    <div className="about-panel-shell">
      <div className="about-page-stage">
        {pageIndex === 0 && (
          <div className={`about-intro-card ${introLeaving ? 'leave' : 'show'}`}>
            <span className="about-intro-eyebrow">Hey there</span>
            <h3>I'm Hanna Pitino</h3>
<p>Nice to meet you.</p>
          </div>
        )}

        {pageIndex === 1 && (
          <div className="about-page about-page-show">
            <div className="about-photo-grid">
              <img src="/img/about/img1.webp" alt="Hanna portrait 1" className="about-photo about-photo-large" loading="lazy" decoding="async" />
              <img src="/img/about/img2.webp" alt="Hanna portrait 2" className="about-photo" loading="lazy" decoding="async" />
              <img src="/img/about/img3.webp" alt="Hanna portrait 3" className="about-photo" loading="lazy" decoding="async" />
            </div>

            <h3>Who I Am</h3>
              <p>
                I’m Hanna Pitino, a software developer with a strong interest in full-stack web
                development, interactive UI, and building polished digital experiences that combine
                technical problem solving with thoughtful design.
              </p>
              <p>
                My background includes front-end development, API integration, and 3D web presentation,
                and I enjoy creating projects that feel both visually engaging and technically well built.
                I’m especially drawn to work that lets me blend clean UI, modern web technologies, and
                user-focused interaction.
              </p>

              <div className="about-stats-row">
                <div className="about-stat">
                  <span className="about-stat-num">2</span>
                  <span className="about-stat-label">Contracts</span>
                </div>
                <div className="about-stat">
                  <span className="about-stat-num">6</span>
                  <span className="about-stat-label">Sites Shipped</span>
                </div>
                <div className="about-stat">
                  <span className="about-stat-num">B.S.</span>
                  <span className="about-stat-label">Computer Science</span>
                </div>
              </div>
          </div>
        )}
{pageIndex === 2 && (
  <div className="about-page about-page-show">
      <h3>Skills & Strengths</h3>

      <p>
        My strongest skills span full-stack development, with a focus on building
        polished front-end experiences, integrating RESTful APIs, and creating
        interactive web applications that balance technical depth with strong visual presentation.
      </p>

      <h4 className="skills-subtitle">Technologies</h4>

      <div className="skills-logo-grid">
        {[
          {
            src: '/icons/react.svg',
            label: 'React',
            usedIn: 'Used in insurance agency website, professor review website, and portfolio UI work.'
          },
          {
            src: '/icons/javascript.svg',
            label: 'JavaScript',
            usedIn: 'Used across insurance agency website, professor review website, and portfolio UI work.'
          },
          {
            src: '/icons/threejs.svg',
            label: 'Three.js',
            usedIn: 'Used in the 3D portfolio environment you are seeing right now!'
          },
          {
            src: '/icons/html.svg',
            label: 'HTML5',
            usedIn: 'Used to structure responsive and semantic front-end interfaces.'
          },
          {
            src: '/icons/sql.svg',
            label: 'SQL',
            usedIn: 'Used for querying and managing relational databases, including raw PostgreSQL in production projects.'
          },
          {
            src: '/icons/node.svg',
            label: 'Node.js',
            usedIn: 'Used in insurance agency website, professor review website, and water mitigation website.'
          },
                    {
            src: '/icons/git.svg',
            label: 'Git',
            usedIn: 'Used for version control across all of my projects.'
          },
         
          {
            src: '/icons/docker.svg',
            label: 'Docker',
            usedIn: 'Used to containerize all of my projects.'
          },

          {
            src: '/icons/jira.svg',
            label: 'Jira',
            usedIn: 'Used in 2.5D autoshooter and other team based projects.'
          },

        ].map((skill, index) => (
          <div
            key={skill.label}
            className="skill-logo-card"
            style={{ animationDelay: `${index * 0.06}s` }}
          >
            <div className="skill-tooltip">{skill.usedIn}</div>
            <img src={skill.src} alt={skill.label} />
            <span>{skill.label}</span>
          </div>
        ))}
      </div>

      <div className="about-strength-cards">
        <div className="about-strength-card">
          <span className="about-entry-num">01</span>
          <div>
            <h4>Full-Stack & API Work</h4>
            <p>Building and integrating RESTful APIs, structuring data flow, and connecting front-end interfaces to backend services in real-world web projects.</p>
          </div>
        </div>
        <div className="about-strength-card">
          <span className="about-entry-num">02</span>
          <div>
            <h4>Front-End Development</h4>
            <p>React-based UI development, responsive layouts, clean component structure, and creating polished experiences that feel intuitive and refined.</p>
          </div>
        </div>
        <div className="about-strength-card">
          <span className="about-entry-num">03</span>
          <div>
            <h4>Collaboration & Workflow</h4>
            <p>Comfortable with Git, Jira, Docker, and deployment tooling while iterating on features, debugging, and improving usability and performance.</p>
          </div>
        </div>
      </div>
  </div>
)}
{pageIndex === 3 && (
  <div className="about-page about-page-show">
      <h3>Beyond the Work</h3>

      {/* IMAGE GRID */}
      <div className="personal-photo-grid">
        <img src="/img/personal/1.webp" alt="Hobby 1" loading="lazy" decoding="async" />
        <img src="/img/personal/2.webp" alt="Hobby 2" loading="lazy" decoding="async" />
        <img src="/img/personal/3.webp" alt="Hobby 3" loading="lazy" decoding="async" />
      </div>

      {/* TEXT */}
      <p>
        Outside of coding, I spend a lot of my free time doing 3D modeling and character design.
        Bringing ideas to life visually is something I really enjoy, whether that is a character concept or just something I had in my head.
      </p>

      <p>
        I also have a genuine love for animals and enjoy getting outside whenever I can.
        Some of my best days involve both.
      </p>

      {/* CARDS */}
      <div className="personal-interests-grid">
        <div className="personal-interest-card">
          <span className="about-entry-num">01</span>
          <h4>Creative Projects</h4>
          <p>In my free time I am really into 3D modeling and character design, blurring the line between art and code.</p>
        </div>
        <div className="personal-interest-card">
          <span className="about-entry-num">02</span>
          <h4>Baking</h4>
          <p>My most famous recipe is a strawberry shortcake cheesecake. I treat every bake like a project, iterating until it is perfect.</p>
        </div>
        <div className="personal-interest-card">
          <span className="about-entry-num">03</span>
          <h4>Aesthetic Design</h4>
          <p>I have always had a passion for aesthetic design and bringing a strong visual sense to everything I build.</p>
        </div>
        <div className="personal-interest-card">
          <span className="about-entry-num">04</span>
          <h4>Animals and Outdoors</h4>
          <p>I have a deep love for animals and the outdoors. Honestly some of my best days involve both.</p>
        </div>
      </div>
  </div>
)}
      </div>

      {pageIndex > 0 && (
  <div className="about-nav about-nav-visible">
    <button
      className="about-nav-arrow"
      onClick={goPrev}
      disabled={pageIndex <= 1}
      type="button"
      aria-label="Previous"
    >
      <ChevronLeft size={18} strokeWidth={1.8} />
    </button>

    <div className="about-nav-dots">
      {[1, 2, 3].map((dotPage) => (
        <button
          key={dotPage}
          className={`about-dot ${pageIndex === dotPage ? 'active' : ''}`}
          onClick={() => setPageIndex(dotPage)}
          type="button"
          aria-label={`Go to page ${dotPage}`}
        />
      ))}
    </div>

    <button
      className="about-nav-arrow"
      onClick={goNext}
      disabled={pageIndex >= 3}
      type="button"
      aria-label="Next"
    >
      <ChevronRight size={18} strokeWidth={1.8} />
    </button>
  </div>
)}
    </div>
  )
}
