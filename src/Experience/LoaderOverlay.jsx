import React, { useEffect, useRef, useState } from 'react'
import { useProgress } from '@react-three/drei'
import { DotWave } from 'ldrs/react'
import 'ldrs/react/DotWave.css'
import './LoaderOverlay.css'

export default function LoaderOverlay({ onFinish }) {
  const { active, progress } = useProgress()

  const [assetsReady, setAssetsReady] = useState(false)
  const [phase, setPhase] = useState('loading')
  const startedRef = useRef(false)

  useEffect(() => {
    if (!active && progress >= 100) {
      setAssetsReady(true)
    }
  }, [active, progress])

  useEffect(() => {
    if (!assetsReady || startedRef.current) return
    startedRef.current = true

    let t1
    let t2
    let t3
    let t4

    t1 = setTimeout(() => {
      setPhase('welcome')
    }, 1200)

    t2 = setTimeout(() => {
      setPhase('welcome-out')
    }, 3600)

    t3 = setTimeout(() => {
      setPhase('opening')
    }, 4400)

    t4 = setTimeout(() => {
      setPhase('done')
      onFinish?.()
    }, 6200)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [assetsReady, onFinish])

  if (phase === 'done') return null

  return (
    <div className={`loader-overlay ${phase}`}>
      <div className="curtain curtain-left" />
      <div className="curtain curtain-right" />

      <div className={`loader-spinner ${phase !== 'loading' ? 'hide' : ''}`}>
        <DotWave size="47" speed="1" color="white" />
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