import { useState } from 'react'
import './ProjectsPanelContent.css'

const projects = [
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
    tools: ['React', 'JavaScript', 'HTML/CSS', 'Bootstrap', 'Node.js',],
    description: [
      'A professional website built for a real insurance agency client. This project focused on translating business needs into a polished and modern web presence, with responsive layouts, custom branding, and production-minded deployment.',
      'I handled the entire development lifecycle from initial design concepts to final deployment. This included designing the UI, building the front-end, and configuring hosting, DNS, and SSL. I also implemented a contact form using a backend API to securely handle user submissions, ensuring reliable client communication and proper data flow between the front-end and server.'
    ],
    websiteUrl: 'https://coastalviewins.com/',
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
    comingSoon: false
  },
  {
    id: 'professor',
    title: 'Professor Review Website',
    images: ['/img/projects/professor.webp'],
    tooltip:
      'Full-stack academic tool with UI design, structured architecture, and backend-connected features.',
    tools: ['TypeScript', 'Chart.js', 'Node.js', 'REST APIs', 'UI Design'],
    description: [
      'A professor review platform designed to help students browse and evaluate instructors. This project emphasized full-stack structure, front-end usability, and organizing data-driven interfaces in a clean and accessible way.',
      'I implemented RESTful APIs to retrieve and structure data scraped from Rate My Professors, enabling it to be dynamically consumed by the front-end. This data was then visualized using Chart.js, allowing users to easily interpret trends such as ratings, difficulty, and overall sentiment through interactive and responsive charts.'
    ],
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
    comingSoon: false
  },
  {
    id: 'apex',
    title: 'Apex Mitigation',
    images: ['/img/projects/apex.webp'],
    tooltip: 'COMING SOON',
    tools: ['Angular', 'Vite', 'PHP'],
    description: 'COMING SOON',
    comingSoon: true
  },
  {
    id: 'contact',
    title: 'Contact Manager',
    images: ['/img/projects/contact.webp'],
    tooltip: 'COMING SOON',
    tools: [],
    description: 'COMING SOON',
    comingSoon: true
  }
]

export default function ProjectsPanelContent() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const openProject = (project) => {
    if (project.comingSoon) return
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
          ← Back to Projects
        </button>

        <div className="project-detail-image-wrap">
          <img
            src={activeImage}
            alt={selectedProject.title}
            className="project-detail-image"
          />

          {selectedProject.images.length > 1 && (
            <>
              <button
                type="button"
                className="project-image-arrow project-image-arrow-left"
                onClick={showPrevImage}
                aria-label="Previous image"
              >
                ←
              </button>

              <button
                type="button"
                className="project-image-arrow project-image-arrow-right"
                onClick={showNextImage}
                aria-label="Next image"
              >
                →
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

        <div className="project-detail-copy">
          <h3>{selectedProject.title}</h3>

          {selectedProject.tools.length > 0 && (
            <div className="project-tools-row">
              {selectedProject.tools.map((tool) => (
                <span key={tool} className="project-tool-chip">
                  {tool}
                </span>
              ))}
            </div>
          )}

          {Array.isArray(selectedProject.description) ? (
            selectedProject.description.map((para, index) => (
              <p key={index}>{para}</p>
            ))
          ) : (
            <p>{selectedProject.description}</p>
          )}

          {selectedProject.websiteUrl && (
            <a
              href={selectedProject.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-visit-btn"
            >
              Visit Website Here
            </a>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="projects-gallery-view projects-fade-in">
      <div className="projects-intro">
        <p>Click a project to learn more.</p>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <button
            key={project.id}
            type="button"
            className={`project-card ${project.comingSoon ? 'project-card-disabled' : ''}`}
            style={{ animationDelay: `${index * 0.07}s` }}
            onClick={() => openProject(project)}
            disabled={project.comingSoon}
          >
            <img
              src={project.images[0]}
              alt={project.title}
              className="project-card-image"
            />

            <div className="project-card-overlay">
              <h3>{project.title}</h3>
            </div>

            {!project.comingSoon && (
              <div className="project-card-hover-panel">
                <p>{project.tooltip}</p>
              </div>
            )}

            {project.comingSoon && (
              <div className="project-coming-soon-overlay">
                <span>COMING SOON</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}