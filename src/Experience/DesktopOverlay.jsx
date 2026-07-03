import { useEffect, useState } from 'react'
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink, Plus, RotateCw, X } from 'lucide-react'
import { projects } from './ProjectsPanelContent'
import './DesktopOverlay.css'

export default function DesktopOverlay({ open, onClose }) {
  const [visible, setVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [imageIndex, setImageIndex] = useState(0)
  const [now, setNow] = useState(() => new Date())
  const activeProject = projects[activeIndex]

  useEffect(() => {
    if (!open) { setVisible(false); return }
    const timer = setTimeout(() => setVisible(true), 1100)
    return () => clearTimeout(timer)
  }, [open])

  useEffect(() => {
    if (!open) return
    const tick = setInterval(() => setNow(new Date()), 30 * 1000)
    setNow(new Date())
    return () => clearInterval(tick)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (event) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const selectProject = (index) => { setActiveIndex(index); setImageIndex(0) }
  const showPrevImage = () => setImageIndex((current) => current === 0 ? activeProject.images.length - 1 : current - 1)
  const showNextImage = () => setImageIndex((current) => current === activeProject.images.length - 1 ? 0 : current + 1)
  const clock = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const domain = activeProject.websiteUrl
    ? activeProject.websiteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : `portfolio.local/${activeProject.id}`

  return (
    <div className={`desktop-overlay ${open && visible ? 'desktop-overlay--visible' : ''} ${open ? '' : 'desktop-overlay--closed'}`} aria-hidden={!open}>
      <div className="desktop-stage">
        <section className="desktop-window" aria-label="Project browser">
          <header className="desktop-titlebar">
            <button type="button" className="desktop-back-btn" onClick={onClose}>
              <ArrowLeft size={14} /><span>Room</span>
            </button>
            <span className="desktop-window-title">Projects</span>
            <div className="desktop-window-controls">
              <time className="desktop-clock">{clock}</time>
              <button type="button" className="desktop-window-close" onClick={onClose} aria-label="Close and return to room"><X size={16} /></button>
            </div>
          </header>

          <div className="desktop-tabbar">
            <div className="desktop-active-tab">
              <span className="desktop-site-mark">H</span>
              <span>{activeProject.title}</span>
              <X size={12} aria-hidden="true" />
            </div>
            <Plus className="desktop-new-tab" size={15} aria-hidden="true" />
          </div>

          <div className="desktop-toolbar">
            <ArrowLeft size={14} aria-hidden="true" />
            <ChevronRight size={14} aria-hidden="true" />
            <RotateCw size={12} aria-hidden="true" />
            <div className="desktop-address">
              <span className="desktop-address-lock" />
              <span>{domain}</span>
            </div>
          </div>

          <div className="desktop-workspace">
            <nav className="desktop-project-nav" aria-label="Project index">
              <div className="desktop-project-nav-header">
                <span>Selected work</span>
                <span>{String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
              </div>
              <div className="desktop-project-list">
                {projects.map((project, index) => (
                  <button
                    key={project.id}
                    type="button"
                    className={`desktop-project-item ${index === activeIndex ? 'desktop-project-item--active' : ''}`}
                    onClick={() => selectProject(index)}
                    aria-current={index === activeIndex ? 'true' : undefined}
                  >
                    <span className="desktop-project-number">{String(index + 1).padStart(2, '0')}</span>
                    <span className="desktop-project-name">{project.title}</span>
                  </button>
                ))}
              </div>
            </nav>

            <main className="desktop-preview">
              <div className="desktop-viewer">
                <img src={activeProject.images[imageIndex]} alt={activeProject.title} className="desktop-viewer-image" loading="lazy" decoding="async" />
                <span className="desktop-image-count">{String(imageIndex + 1).padStart(2, '0')} / {String(activeProject.images.length).padStart(2, '0')}</span>
                {activeProject.images.length > 1 && <>
                  <button type="button" className="desktop-viewer-arrow desktop-viewer-arrow--left" onClick={showPrevImage} aria-label="Previous image"><ChevronLeft size={17} /></button>
                  <button type="button" className="desktop-viewer-arrow desktop-viewer-arrow--right" onClick={showNextImage} aria-label="Next image"><ChevronRight size={17} /></button>
                </>}
              </div>
            </main>

            <aside className="desktop-inspector">
              <span className="desktop-project-category">{activeProject.category} project</span>
              <h2>{activeProject.title}</h2>
              <p className="desktop-project-blurb">{activeProject.tooltip}</p>

              <div className="desktop-inspector-meta">
                <span className="desktop-meta-label">Built with</span>
                <p>{activeProject.tools.slice(0, 5).join(' · ')}</p>
              </div>

              <div className="desktop-image-nav" aria-label="Project images">
                {activeProject.images.map((_, index) => (
                  <button key={index} type="button" className={index === imageIndex ? 'active' : ''} onClick={() => setImageIndex(index)} aria-label={`Show image ${index + 1}`}>
                    {String(index + 1).padStart(2, '0')}
                  </button>
                ))}
              </div>

              {activeProject.websiteUrl && <a href={activeProject.websiteUrl} target="_blank" rel="noopener noreferrer" className="desktop-live-link">View live project <ExternalLink size={14} /></a>}
            </aside>
          </div>
        </section>
      </div>
    </div>
  )
}
