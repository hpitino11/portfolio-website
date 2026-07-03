import React, { useEffect, useRef, useState } from 'react'
import { useProgress } from '@react-three/drei'
import './LoaderOverlay.css'

export default function LoaderOverlay({ onFinish }) {
  const { active, progress } = useProgress()

  const [assetsReady, setAssetsReady] = useState(false)
  const [phase, setPhase] = useState('loading')
  const [fastOpen, setFastOpen] = useState(false)
  const clickedRef = useRef(false)
  const startedRef = useRef(false)

  // Smoothed progress: eases toward the real value each frame so the
  // fill and counter glide instead of jumping between asset milestones.
  const [displayProgress, setDisplayProgress] = useState(0)
  const displayRef = useRef(0)
  const targetRef = useRef(0)

  useEffect(() => {
    targetRef.current = progress
  }, [progress])

  useEffect(() => {
    let raf
    let lastTime = performance.now()
    const tick = (now) => {
      // Time-based easing so throttled/background tabs converge just as fast
      const dt = Math.min((now - lastTime) / 1000, 0.5)
      lastTime = now
      const ease = 1 - Math.exp(-5.5 * dt)
      const current = displayRef.current
      let next = current + (targetRef.current - current) * ease
      if (targetRef.current >= 100 && next > 99.4) next = 100
      if (next !== current) {
        displayRef.current = next
        setDisplayProgress(next)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    if (!active && progress >= 100 && displayProgress >= 100) setAssetsReady(true)
  }, [active, progress, displayProgress])

  // Auto-play: loading → welcome → welcome-out → enter (then wait for click)
  useEffect(() => {
    if (!assetsReady || startedRef.current) return
    startedRef.current = true

    const t1 = setTimeout(() => setPhase('welcome'), 1200)
    const t2 = setTimeout(() => setPhase('welcome-out'), 3600)
    const t3 = setTimeout(() => setPhase('enter'), 4400)

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [assetsReady])

  const handleClick = () => {
    if (phase !== 'enter' || clickedRef.current) return
    clickedRef.current = true
    setPhase('opening')
    // Slightly longer than the 1.8s curtain transition so the overlay never
    // unmounts mid-slide.
    const t = setTimeout(() => { setPhase('done'); onFinish?.() }, 1950)
    return () => clearTimeout(t)
  }

  const skipIntro = (e) => {
    e.stopPropagation()
    if (clickedRef.current) return
    clickedRef.current = true
    setFastOpen(true)
    setPhase('opening')
    setTimeout(() => { setPhase('done'); onFinish?.() }, 750)
  }

  if (phase === 'done') return null

  return (
    <div
      className={`loader-overlay ${phase} ${fastOpen ? 'fast' : ''}`}
      onClick={handleClick}
    >
      <div className="curtain curtain-left" />
      <div className="curtain curtain-right" />

      {assetsReady && phase !== 'opening' && (
        <button type="button" className="loader-skip" onClick={skipIntro}>
          skip intro →
        </button>
      )}

      <div className={`loader-spinner ${phase !== 'loading' ? 'hide' : ''}`}>
        <div className="typographic-loader">
          <div className="loader-fill-wrap">
            <div className="loader-title-base">Hanna Pitino</div>
            <div
              className="loader-title-fill"
              style={{ clipPath: `inset(0 ${100 - displayProgress}% 0 0)` }}
            >
              Hanna Pitino
            </div>
          </div>
          <div className="loader-percent">{Math.round(displayProgress)}%</div>
        </div>
      </div>

      <div className={`enter-text ${phase === 'enter' ? 'show' : ''}`}>
        click anywhere to enter
      </div>

      <div
        className={`welcome-text ${
          phase === 'welcome' ? 'show' : ''
        } ${phase === 'welcome-out' ? 'hide' : ''}`}
      >
        welcome.
      </div>
    </div>
  )
}
