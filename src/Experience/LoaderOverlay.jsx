import React, { useEffect, useRef, useState } from 'react'
import { useProgress } from '@react-three/drei'
import { DotWave } from 'ldrs/react'
import 'ldrs/react/DotWave.css'
import './LoaderOverlay.css'

export default function LoaderOverlay({ onFinish }) {
  const { active, progress } = useProgress()

  const [assetsReady, setAssetsReady] = useState(false)
  const [phase, setPhase] = useState('loading')
  const clickedRef = useRef(false)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!active && progress >= 100) setAssetsReady(true)
  }, [active, progress])

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
    const t = setTimeout(() => { setPhase('done'); onFinish?.() }, 1800)
    return () => clearTimeout(t)
  }

  if (phase === 'done') return null

  return (
    <div
      className={`loader-overlay ${phase}`}
      onClick={handleClick}
    >
      <div className="curtain curtain-left" />
      <div className="curtain curtain-right" />

      <div className={`loader-spinner ${phase !== 'loading' ? 'hide' : ''}`}>
        <DotWave size="47" speed="1" color="white" />
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
