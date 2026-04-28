import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import './AmbientPlayer.css'

const YOUTUBE_VIDEO_ID = 'jfKfPfyJRdk'
const TARGET_VOLUME = 20
const FADE_DURATION_MS = 3000
const FADE_STEPS = 60

function loadYouTubeApi() {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve()
      return
    }
    const prev = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      if (prev) prev()
      resolve()
    }
    if (!document.getElementById('yt-api-script')) {
      const script = document.createElement('script')
      script.id = 'yt-api-script'
      script.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(script)
    }
  })
}

export default function AmbientPlayer({ visible, panelOpen }) {
  const containerRef = useRef(null)
  const playerRef = useRef(null)
  const mountedRef = useRef(true)
  const fadeTimerRef = useRef(null)
  const [muted, setMuted] = useState(false)
  const [ready, setReady] = useState(false)
  const gesturedRef = useRef(false)

  const fadeInVolume = (player) => {
    if (fadeTimerRef.current) clearInterval(fadeTimerRef.current)
    player.unMute()
    player.setVolume(0)
    let step = 0
    fadeTimerRef.current = setInterval(() => {
      if (!mountedRef.current) { clearInterval(fadeTimerRef.current); return }
      step++
      const vol = Math.round((step / FADE_STEPS) * TARGET_VOLUME)
      player.setVolume(vol)
      if (step >= FADE_STEPS) clearInterval(fadeTimerRef.current)
    }, FADE_DURATION_MS / FADE_STEPS)
    setMuted(false)
  }

  // Listen for any gesture while the curtain is still showing.
  // Cleaned up the moment visible becomes true, so it never races
  // with the mute button's own click handler.
  useEffect(() => {
    if (visible) return
    const onGesture = () => { gesturedRef.current = true }
    document.addEventListener('click', onGesture, { once: true })
    document.addEventListener('touchstart', onGesture, { once: true, passive: true })
    return () => {
      document.removeEventListener('click', onGesture)
      document.removeEventListener('touchstart', onGesture)
    }
  }, [visible])

  useEffect(() => {
    mountedRef.current = true
    if (!visible) return

    loadYouTubeApi().then(() => {
      if (!mountedRef.current || !containerRef.current) return

      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: YOUTUBE_VIDEO_ID,
          controls: 0,
          disablekb: 1,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
        },
        events: {
          onReady: (e) => {
            e.target.playVideo()
            if (!mountedRef.current) return
            setReady(true)
            if (gesturedRef.current) fadeInVolume(e.target)
          },
        },
      })
    })

    return () => {
      mountedRef.current = false
      if (fadeTimerRef.current) clearInterval(fadeTimerRef.current)
      if (playerRef.current) {
        playerRef.current.destroy()
        playerRef.current = null
      }
    }
  }, [visible])

  const toggleMute = () => {
    if (!playerRef.current || !ready) return
    const nowMuted = playerRef.current.isMuted()
    if (nowMuted) {
      fadeInVolume(playerRef.current)
    } else {
      if (fadeTimerRef.current) clearInterval(fadeTimerRef.current)
      playerRef.current.mute()
      setMuted(true)
    }
  }

  return (
    <>
      <div ref={containerRef} className="ambient-player-iframe" />

      <button
        className={`ambient-mute-btn ${visible && ready ? 'ambient-mute-btn-visible' : ''} ${panelOpen ? 'ambient-mute-btn-panel-hidden' : ''}`}
        onClick={toggleMute}
        aria-label={muted ? 'Unmute ambient music' : 'Mute ambient music'}
        title={muted ? 'Unmute music' : 'Mute music'}
        type="button"
      >
        {muted
          ? <VolumeX size={22} strokeWidth={1.8} />
          : <Volume2 size={22} strokeWidth={1.8} />
        }
      </button>
    </>
  )
}
