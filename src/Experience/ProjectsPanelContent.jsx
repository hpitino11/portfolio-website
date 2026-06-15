import { useState } from 'react'
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import './ProjectsPanelContent.css'

const projects = [
  {
    id: 'apex',
    title: 'Apex Mitigation',
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
    category: 'Contract',
    comingSoon: false
  },
  {
    id: 'insurance',
    title: 'Insurance Agency Website',
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
    category: 'Contract',
    comingSoon: false
  },
  {
    id: 'mewcha',
    title: 'Mewcha',
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
    id: 'carecalendar',
    title: 'Care Calendar',
    images: [
      '/img/projects/carecalendar.webp',
      '/img/projects/carecalendar2.webp'
    ],
    tooltip:
      'Admin dashboard for managing home care visits, caregivers, and clients.',
    tools: ['React', 'FullCalendar', 'Node.js', 'Express', 'PostgreSQL', 'Railway'],
    description: [
      'An admin dashboard that gives administrators a centralized view of a caregiving operation: who is working, who they are caring for, and when. It includes a live calendar, dashboard stats, and full CRUD for visits, caregivers, and clients.',
      'The dashboard features an interactive FullCalendar with month, week, and day views, week-over-week trend badges, multi-day visit spanning, hover tooltips, and smart grouping for overlapping events. The backend is built with Node.js and Express backed by raw PostgreSQL via pg, with the full stack deployed to Railway.'
    ],
    websiteUrl: 'https://carecalendar.dev',
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
      'Interactive portfolio built with 3D scene presentation, custom overlays, and immersive UI.',
    tools: ['React Three Fiber', 'Three.js', 'Blender', 'CSS', 'Vite'],
    description: [
      'An immersive portfolio experience built with React Three Fiber and Blender. It combines 3D scene presentation, modern UI overlays, camera composition, and interactive panels to create a more memorable developer portfolio.',
      'To ensure a seamless and intentional user experience, I created design prototypes in both Blender and Figma before implementation. This allowed me to experiment with layout, camera angles, lighting, and interaction flow, translating those designs directly into the final 3D web experience with a strong focus on usability and visual polish.'
    ],
    category: 'Personal',
    comingSoon: false
  },
  {
    id: 'enceladus',
    title: 'Mission to Enceladus',
    images: [
      '/img/projects/enceladus.webp',
      '/img/projects/enceladus-2.webp'
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

  const openProject = (project) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
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
        <button
          type="button"
          className="projects-back-btn"
          onClick={() => setSelectedProject(null)}
        >
          <ArrowLeft size={13} strokeWidth={2} />
          Back to Projects
        </button>

        {/* Hero image with title baked into gradient */}
        <div className="project-hero">
          <img
            src={activeImage}
            alt={selectedProject.title}
            className="project-hero-image"
            loading="lazy"
            decoding="async"
          />

          <div className="project-hero-overlay">
            <div className="project-hero-meta">
              {selectedProject.category && (
                <span className="project-hero-category">{selectedProject.category}</span>
              )}
              <h3 className="project-hero-title">{selectedProject.title}</h3>
            </div>
          </div>

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
            </>
          )}
        </div>

        {/* Body content */}
        <div className="project-detail-body">
          {selectedProject.tools.length > 0 && (
            <div className="project-detail-section">
              <span className="project-section-label">Stack</span>
              <div className="project-tools-row">
                {selectedProject.tools.map((tool) => (
                  <span key={tool} className="project-tool-chip">{tool}</span>
                ))}
              </div>
            </div>
          )}

          <div className="project-detail-section">
            <span className="project-section-label">Overview</span>
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
              className="project-visit-btn"
            >
              {selectedProject.websiteLabel ?? 'Visit Live Site'}
              <span className="project-visit-arrow">↗</span>
            </a>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="projects-gallery-view projects-fade-in">
      <div className="projects-header-row">
        <span className="projects-eyebrow">Selected Work</span>
        <span className="projects-count-badge">{projects.length}</span>
      </div>

      <div className="projects-list">
        {projects.map((project, index) => (
          <button
            key={project.id}
            type="button"
            className="project-row"
            style={{ animationDelay: `${index * 0.05}s` }}
            onClick={() => openProject(project)}
          >
            <img
              src={project.images[0]}
              alt={project.title}
              className="project-row-thumb"
              loading="lazy"
              decoding="async"
            />

            <div className="project-row-body">
              <span className="project-row-title">{project.title}</span>
              <p className="project-row-blurb">{project.tooltip}</p>
              <div className="project-row-chips">
                {project.tools.slice(0, 3).map((tool) => (
                  <span key={tool} className="project-row-chip">{tool}</span>
                ))}
              </div>
            </div>

            {project.category && (
              <span className={`project-row-category project-row-category--${project.category.toLowerCase()}`}>
                {project.category}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
