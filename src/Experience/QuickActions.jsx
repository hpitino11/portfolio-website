import './QuickActions.css'
import { FileText, Mail, FolderOpen, User } from 'lucide-react'

export default function QuickActions({ onSelect, activePanel, visible }) {
  const items = [
    { key: 'resume', label: 'Resume', icon: FileText },
    { key: 'contact', label: 'Contact', icon: Mail },
    { key: 'projects', label: 'Projects', icon: FolderOpen },
    { key: 'about', label: 'About Me', icon: User }
  ]

  return (
    <div className={`quick-actions ${visible ? 'quick-actions-visible' : ''}`}>
      {items.map((item) => {
        const Icon = item.icon
        const isActive = activePanel === item.key

        return (
          <button
            key={item.key}
            className={`quick-action-btn ${isActive ? 'active' : ''}`}
            onClick={() => onSelect(isActive ? null : item.key)}
            aria-label={item.label}
            title={item.label}
            type="button"
          >
            <Icon size={22} strokeWidth={1.8} />
          </button>
        )
      })}
    </div>
  )
}