import { useState } from 'react'
import { ArrowLeft, ChevronLeft, ChevronRight, X } from 'lucide-react'
import './ProjectsPanelContent.css'

export const projects = [
  {
    id: 'apex',
    title: 'Apex Mitigation',
    preview: '/img/preview/apexmit.webp',
    images: [
      '/img/projects/apex.webp',
      '/img/projects/apex-2.webp',
      '/img/projects/apex-3.webp',
      '/img/projects/apex-4.webp'
    ],
    tooltip:
      'Production website for a water and fire damage restoration company, built with Laravel and deployed end-to-end.',
    tools: ['Laravel', 'PHP 8.4', 'Docker', 'HTTPS/SSL', 'HTML/CSS'],
    description: [
      'A freelance contract project building a production website for Apex Mitigation LLC, a water and fire damage restoration company. Delivered a fully responsive, multi-page site using Laravel (PHP 8.4) with a working lead generation contact form routed directly to the client.',
      'Handled the complete end-to-end deployment pipeline, including containerization with Docker and HTTPS setup. This project covered everything from initial development to live production deployment, ensuring a reliable, secure, and professional web presence for the client.'
    ],
    websiteUrl: 'https://apexmitigation.com',
    websiteLabel: 'Visit Live Site',
    category: 'Freelance',
    comingSoon: false
  },
  {
    id: 'insurance',
    title: 'Insurance Agency Website',
    preview: '/img/preview/CoastalView.webp',
    images: [
      '/img/projects/insurance.webp',
      '/img/projects/insurance-2.webp',
      '/img/projects/insurance-3.webp'
    ],
    tooltip:
      'Custom client website with responsive UI, polished branding, and a modern professional web presence.',
    tools: ['React', 'JavaScript', 'HTML/CSS', 'Bootstrap', 'Node.js'],
    description: [
      'A professional website built for a real insurance agency client. This project focused on translating business needs into a polished and modern web presence, with responsive layouts, custom branding, and production-minded deployment.',
      'I handled the entire development lifecycle from initial design concepts to final deployment. This included designing the UI, building the front-end, and configuring hosting, DNS, and SSL. I also implemented a contact form using a backend API to securely handle user submissions, ensuring reliable client communication and proper data flow between the front-end and server.'
    ],
    websiteUrl: 'https://coastalviewins.com/',
    websiteLabel: 'Visit Live Site',
    category: 'Freelance',
    comingSoon: false
  },
  {
    id: 'myanimerec',
    title: 'MyAnimeRec',
    preview: '/img/projects/myanime1.webp',
    images: [
      '/img/projects/myanime1.webp',
      '/img/projects/myanime2.webp',
      '/img/projects/myanime3.webp'
    ],
    tooltip:
      'AI-powered anime recommendation platform that generates personalized picks from saved titles, ratings, and free-text preferences.',
    tools: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Anthropic API'],
    description: [
      'A full-stack app that generates personalized anime recommendations by combining a user\'s saved titles and ratings from PostgreSQL with free-text preferences, prompting the Claude API for structured JSON output that is validated, parsed, and persisted with full recommendation history.',
      'Integrated the AniList API for search and discovery and secured the backend with JWT authentication, bcrypt password hashing, and both per-request and daily rate limiting to protect the AI endpoint from abuse.'
    ],
    category: 'Personal',
    comingSoon: false
  },
  {
    id: 'mewcha',
    title: 'Mewcha',
    preview: '/img/preview/mewcha.webp',
    images: [
      '/img/projects/mewcha1.webp',
      '/img/projects/mewcha2.webp',
      '/img/projects/mewcha3.webp'
    ],
    tooltip:
      'Full-stack boba tea ordering app with drink customization, shopping cart, and an admin dashboard for menu and order management.',
    tools: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'TanStack Query'],
    description: [
      'A full-stack ordering app built for a boba tea cafe. Customers can browse a categorized menu, customize drinks by size, ice level, sweetness, and toppings, add items to a cart with live subtotals, and place orders with a registered account. Order history is tracked per user.',
      'The backend is built with Node.js and Express using Knex as a query builder over PostgreSQL, with JWT authentication. A separate admin dashboard handles menu management and order status updates. The frontend is written in React with TypeScript, styled with CSS Modules, and uses TanStack Query for server state management.'
    ],
    websiteUrl: 'https://mewcha.shop',
    websiteLabel: 'Visit Live Site',
    category: 'Personal',
    comingSoon: false
  },
  {
    id: 'portfolio',
    title: '3D Portfolio',
    images: [
      '/img/projects/portfolio.webp',
      '/img/projects/portfolio-2.webp',
      '/img/projects/portfolio-3.webp'
    ],
    tooltip:
      'This site: a 3D room modeled in Blender and rendered in the browser, tuned from 35MB down to an 11MB payload.',
    tools: ['React Three Fiber', 'Three.js', 'Blender', 'CSS', 'Vite'],
    description: [
      'This site. The room is modeled and light-baked in Blender, then shipped as a single glTF with Draco-compressed geometry and WebP lightmaps, tuned from 11.4MB down to 6MB with no visible quality loss. The monitor on the desk plays a real screen recording, re-encoded from 22MB to 2.3MB. Total transfer for the whole experience is about 11MB, down from 35MB when I started optimizing.',
      'The camera work was the hardest part: the intro sweep interpolates spherical coordinates from outside OrbitControls\' distance limits, which exposed a one-frame flicker caused by a race between React\'s effect timing and the render loop, where a stray controls.update() clamped the camera for a single frame. Tracing it took per-frame camera instrumentation and a stack-trace hook on the controls. I prototyped the layout and camera angles in Blender and Figma first, then built the sweep, the zoom into the desk monitor, and pointer parallax, with reduced-motion fallbacks for all of it.'
    ],
    category: 'Personal',
    comingSoon: false
  },
  {
    id: 'enceladus',
    title: 'Mission to Enceladus',
    preview: '/img/preview/enceladus.png',
    images: [
      '/img/projects/enceladus-2.webp',
      '/img/preview/enceladus.png'
    ],
    tooltip:
      'Internship work involving modular UI systems, debugging, and real-time gameplay data integration.',
    tools: ['Unreal Engine 5', 'Blueprints', 'UI Systems', 'Git', 'Azure DevOps'],
    description: [
      'A software engineering internship project where I worked on modular inventory UI systems in Unreal Engine 5. The work involved real-time gameplay data integration, structured UI logic, and debugging system behavior in a team-based environment.',
      'I identified inefficiencies in how inventory data was being transmitted and helped redesign the system to reduce redundant data transfer, improving performance and scalability. This involved collaborating with team members and refining how backend and UI systems communicated.'
    ],
    category: 'Internship',
    comingSoon: false
  },
]

export default function ProjectsPanelContent() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const openProject = (project) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
    setLightboxOpen(false)
  }

  const showPrevImage = () => {
    if (!selectedProject) return
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedProject.images.length - 1 : prev - 1
    )
  }

  const showNextImage = () => {
    if (!selectedProject) return
    setCurrentImageIndex((prev) =>
      prev === selectedProject.images.length - 1 ? 0 : prev + 1
    )
  }

  if (selectedProject) {
    const activeImage = selectedProject.images[currentImageIndex]

    return (
      <div className="projects-detail-view projects-fade-in">
        <div className="project-detail-header">
          <button
            type="button"
            className="projects-back-btn"
            onClick={() => setSelectedProject(null)}
          >
            <ArrowLeft size={13} strokeWidth={2} />
            Back to Projects
          </button>
        </div>

        <div className="project-detail-title-row">
          <h3 className="project-detail-title">
            {selectedProject.title}
            {selectedProject.category && (
              <span className="project-detail-category">
                {' '}· {selectedProject.category.toLowerCase()}
              </span>
            )}
          </h3>
        </div>

        {/* Hero image */}
        <div className="project-hero">
          <img
            src={activeImage}
            alt={selectedProject.title}
            className="project-hero-image project-hero-image--clickable"
            loading="lazy"
            decoding="async"
            onClick={() => setLightboxOpen(true)}
          />

          <div className="project-hero-overlay" />

          {selectedProject.images.length > 1 && (
            <>
              <button
                type="button"
                className="project-image-arrow project-image-arrow-left"
                onClick={showPrevImage}
                aria-label="Previous image"
              >
                <ChevronLeft size={14} strokeWidth={2} />
              </button>
              <button
                type="button"
                className="project-image-arrow project-image-arrow-right"
                onClick={showNextImage}
                aria-label="Next image"
              >
                <ChevronRight size={14} strokeWidth={2} />
              </button>
            </>
          )}
        </div>

        {selectedProject.images.length > 1 && (
          <div className="project-image-dots">
            {selectedProject.images.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`project-image-dot ${currentImageIndex === index ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Lightbox */}
        {lightboxOpen && (
          <div className="project-lightbox" onClick={() => setLightboxOpen(false)}>
            <button
              type="button"
              className="project-lightbox-close"
              onClick={(e) => { e.stopPropagation(); setLightboxOpen(false) }}
              aria-label="Close image"
            >
              <X size={16} strokeWidth={2} />
            </button>

            <img
              src={activeImage}
              alt={selectedProject.title}
              className="project-lightbox-image"
              onClick={(e) => e.stopPropagation()}
            />

            {selectedProject.images.length > 1 && (
              <>
                <button
                  type="button"
                  className="project-lightbox-arrow project-lightbox-arrow-left"
                  onClick={(e) => { e.stopPropagation(); showPrevImage() }}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={16} strokeWidth={2} />
                </button>
                <button
                  type="button"
                  className="project-lightbox-arrow project-lightbox-arrow-right"
                  onClick={(e) => { e.stopPropagation(); showNextImage() }}
                  aria-label="Next image"
                >
                  <ChevronRight size={16} strokeWidth={2} />
                </button>

                <div className="project-lightbox-dots" onClick={(e) => e.stopPropagation()}>
                  {selectedProject.images.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`project-image-dot ${currentImageIndex === index ? 'active' : ''}`}
                      onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index) }}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Body content */}
        <div className="project-detail-body">
          {selectedProject.tools.length > 0 && (
            <div className="project-detail-section">
              <span className="project-section-label">stack</span>
              <span className="project-tools-line">
                {selectedProject.tools.join(' · ')}
              </span>
            </div>
          )}

          <div className="project-detail-section">
            <span className="project-section-label">overview</span>
            <div className="project-detail-copy">
              {Array.isArray(selectedProject.description) ? (
                selectedProject.description.map((para, index) => (
                  <p key={index}>{para}</p>
                ))
              ) : (
                <p>{selectedProject.description}</p>
              )}
            </div>
          </div>

          {selectedProject.websiteUrl && (
            <a
              href={selectedProject.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-detail-visit-bottom"
            >
              {selectedProject.websiteLabel ?? 'Visit Live Site'} ↗
            </a>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="projects-gallery-view projects-fade-in">
      <div className="projects-header-row">
        <h3 className="projects-heading">Selected Work</h3>
        <span className="projects-header-rule" />
        <span className="projects-count-word">six projects</span>
      </div>

      <div className="projects-list">
        {projects.map((project, index) => (
          <button
            key={project.id}
            type="button"
            className="project-row"
            style={{ animationDelay: `${index * 0.05}s` }}
            onClick={() => openProject(project)}
            aria-label={`View ${project.title}`}
          >
            <img
              src={project.images[0]}
              alt={project.title}
              className="project-row-thumb"
              loading="lazy"
              decoding="async"
            />
            <span className="project-row-label">
              {project.title}
              <em>{project.category.toLowerCase()}</em>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
