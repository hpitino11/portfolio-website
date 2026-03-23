import './ContactPanelContent.css'
import { Mail, Linkedin, Github, ArrowUpRight } from 'lucide-react'

const contactItems = [
  {
    id: 'email',
    title: 'Email',
    value: 'hapitino@gmail.com',
    description: '',
    href: 'mailto:hapitino@gmail.com',
    icon: Mail
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    value: 'Connect professionally',
    description: 'View my experience, background, and professional profile.',
    href: 'https://www.linkedin.com/in/hanna-pitino/',
    icon: Linkedin
  },
  {
    id: 'github',
    title: 'GitHub',
    value: 'See my code',
    description: 'Browse projects, repositories, and technical work.',
    href: 'https://github.com/hpitino11',
    icon: Github
  }
]

export default function ContactPanelContent() {
  return (
    <div className="contact-panel-shell">
      <div className="contact-intro-card">
        <h3>Let’s Connect</h3>
        <p>
          Whether it’s a role, project, or collaboration, feel free to reach out through any of the platforms below.
        </p>
      </div>

      <div className="contact-card-list">
        {contactItems.map((item, index) => {
          const Icon = item.icon
          const isExternal = item.id !== 'email'

          return (
            <a
              key={item.id}
              href={item.href}
              className="contact-card"
              style={{ animationDelay: `${index * 0.08}s` }}
              {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <div className="contact-card-left">
                <div className="contact-icon-wrap">
                  <Icon size={20} strokeWidth={1.8} />
                </div>

                <div className="contact-copy">
                  <span className="contact-label">{item.title}</span>
                  <span className="contact-value">{item.value}</span>
                  <p>{item.description}</p>
                </div>
              </div>

              <div className="contact-card-right">
                <ArrowUpRight size={18} strokeWidth={1.8} />
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}