import './InfoPanel.css'
import { X } from 'lucide-react'
import AboutPanelContent from './AboutPanelContent'
import ProjectsPanelContent from './ProjectsPanelContent'
import ContactPanelContent from './ContactPanelContent'
import ResumePanelContent from './ResumePanelContent'

const panelContent = {
  about: {
    title: 'About',
    body: ``
  },
  projects: {
    title: 'Projects',
    body: ``
  },
  contact: {
    title: 'Contact',
    body: `You can reach me by email, LinkedIn, or GitHub.`
  },
  resume: {
    title: 'Resume',
    body: ``
  }
}

export default function InfoPanel({ activePanel, onClose }) {
  const content = activePanel ? panelContent[activePanel] : null

  return (
    <>
      <div
        className={`info-panel-backdrop ${activePanel ? 'show' : ''}`}
        onClick={onClose}
      />

      <aside className={`info-panel ${activePanel ? 'open' : ''}`}>
        {content && (
          <>
            <button
              className="info-panel-close-edge"
              onClick={onClose}
              aria-label="Close panel"
              type="button"
            >
              <X size={16} strokeWidth={2} />
            </button>

            <div className="info-panel-inner">
              <div className="info-panel-header">
                <h2>{content.title}</h2>
              </div>

              <div className="info-panel-content">
               {activePanel === 'about' ? (
  <AboutPanelContent />
) : activePanel === 'projects' ? (
  <ProjectsPanelContent />
) : activePanel === 'contact' ? (
  <ContactPanelContent />
) : activePanel === 'resume' ? (
  <ResumePanelContent />
) : (
  <p>{content.body}</p>
)}
              </div>

              {activePanel === 'resume' && (
                <div className="resume-actions-bottom">
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resume-action-btn"
                  >
                    Open in New Tab
                  </a>

                  <a
                    href="/resume.pdf"
                    download
                    className="resume-action-btn"
                  >
                    Download PDF
                  </a>
                </div>
              )}
            </div>
          </>
        )}
      </aside>
    </>
  )
}