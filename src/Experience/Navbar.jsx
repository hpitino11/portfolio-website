import './Navbar.css'

export default function Navbar({ visible, onOpenPanel }) {
  return (
    <header className={`navbar ${visible ? 'navbar-visible' : ''}`}>
      <div className="navbar-content">
        <img src="/img/logo.png" alt="logo" className="navbar-logo" />

        <nav className="navbar-left">
          <button type="button" onClick={() => onOpenPanel('about')}>
            About
          </button>

          <button type="button" onClick={() => onOpenPanel('projects')}>
            Projects
          </button>

          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            Resume
          </a>

          <button type="button" onClick={() => onOpenPanel('contact')}>
            Contact
          </button>
        </nav>
      </div>
    </header>
  )
}