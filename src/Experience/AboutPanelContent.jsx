import { useEffect, useState } from 'react'
import './AboutPanelContent.css'

const pages = [
  { id: 'intro' },
  { id: 'about' },
  { id: 'skills' },
  { id: 'personal' }
]

export default function AboutPanelContent() {
  const [pageIndex, setPageIndex] = useState(0)
  const [introPlayed, setIntroPlayed] = useState(false)
  const [introLeaving, setIntroLeaving] = useState(false)

  useEffect(() => {
    if (introPlayed) return

    const leaveTimer = setTimeout(() => {
      setIntroLeaving(true)
    }, 1800)

    const nextTimer = setTimeout(() => {
      setPageIndex(1)
      setIntroPlayed(true)
    }, 2500)

    return () => {
      clearTimeout(leaveTimer)
      clearTimeout(nextTimer)
    }
  }, [introPlayed])

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
              <img src="/img/about/img1.jpg" alt="Hanna portrait 1" className="about-photo about-photo-large" />
              <img src="/img/about/img2.jpg" alt="Hanna portrait 2" className="about-photo" />
              <img src="/img/about/img3.jpg" alt="Hanna portrait 3" className="about-photo" />
            </div>

            <div className="about-copy-card">
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
</div>
          </div>
        )}
{pageIndex === 2 && (
  <div className="about-page about-page-show">
    <div className="about-copy-card">
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
            src: '/icons/css.svg',
            label: 'CSS3',
            usedIn: 'Used for styling, layout, animations, and UI polish across my web projects.'
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

      <div className="skills-detail-list">
        <div>
          <h4>Full-Stack & API Work</h4>
          <p>
            Experience building and integrating RESTful APIs, handling client-server
            communication, structuring data flow, and connecting front-end interfaces
            to backend services in real-world web projects.
          </p>
        </div>

        <div>
          <h4>Front-End Development</h4>
          <p>
            Strong focus on React-based UI development, responsive layouts, clean
            component structure, modern styling, and creating polished user experiences
            that feel intuitive and refined.
          </p>
        </div>


        <div>
          <h4>Collaboration & Workflow</h4>
          <p>
            Comfortable working with Git, Jira, Docker, and cloud/deployment-related
            tools while iterating on features, debugging issues, and improving usability
            and performance.
          </p>
        </div>
      </div>
    </div>
  </div>
)}
{pageIndex === 3 && (
  <div className="about-page about-page-show">
    <div className="about-copy-card">

      <h3>Beyond the Work</h3>

      {/* IMAGE GRID */}
      <div className="personal-photo-grid">
        <img src="/img/personal/1.png" alt="Hobby 1" />
        <img src="/img/personal/2.jpg" alt="Hobby 2" />
        <img src="/img/personal/3.png" alt="Hobby 3" />
      </div>

      {/* TEXT */}
      <p>
        Outside of development, I spend a lot of time exploring creative ideas and refining visual details.
        I enjoy building things that feel intentional, whether that’s a web project, a 3D scene, or a concept I want to bring to life.
      </p>

      <p>
        I’m especially drawn to interactive experiences, games, digital design, and immersive environments.
        A lot of what inspires me creatively also carries into my work as a developer.
      </p>

      {/* CARDS */}
      <div className="personal-interests-grid">
        <div className="personal-interest-card">
          <h4>Creative Projects</h4>
          <p>3D environments, visual concepts, UI polish, and iterative design work.</p>
        </div>

        <div className="personal-interest-card">
          <h4>Interactive Media</h4>
          <p>Games, immersive experiences, and design-driven projects.</p>
        </div>

        <div className="personal-interest-card">
          <h4>Aesthetic Design</h4>
          <p>Modern spaces, cohesive visuals, and clean presentation.</p>
        </div>

        <div className="personal-interest-card">
          <h4>Iteration & Growth</h4>
          <p>Refining work over time and continuously improving ideas.</p>
        </div>
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
      ←
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
      →
    </button>
  </div>
)}
    </div>
  )
}