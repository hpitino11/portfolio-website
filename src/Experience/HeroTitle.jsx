import React, { useEffect, useState } from 'react'
import './HeroTitle.css'

const HeroTitle = ({ dimmed = false }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className={`hero-title ${mounted ? 'mounted' : ''} ${dimmed ? 'dimmed' : ''}`}>
      <div className="hero-eyebrow">Software Developer</div>
      <h1 className="hero-name">Hanna Pitino</h1>
      <p className="hero-tagline">Full-stack developer crafting polished, interactive web experiences.</p>
      <div className="hero-hint">
        <span className="hint-text">drag to explore the room</span>
        <div className="hint-dot"></div>
      </div>
    </div>
  )
}

export default HeroTitle
