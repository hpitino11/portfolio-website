import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import './AmbientPlayer.css'

const YOUTUBE_VIDEO_ID = 'X4VbdwhkE10'
const TARGET_VOLUME = 10
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
  const gesturedRef = useRef(false)
  const [muted, setMuted] = useState(true)
  const [ready, setReady] = useState(false)

  const fadeInVolume = (player) => {
    if (fadeTimerRef.current) clearInterval(fadeTimerRef.current)
    try {
      player.setVolume(0)
      player.unMute()
      player.playVideo()
    } catch (err) {
      return
    }
    let step = 0
    fadeTimerRef.current = setInterval(() => {
      if (!mountedRef.current) { clearInterval(fadeTimerRef.current); return }
      step++
      const vol = Math.round((step / FADE_STEPS) * TARGET_VOLUME)
      try { player.setVolume(vol) } catch (e) { clearInterval(fadeTimerRef.current); return }
      if (step >= FADE_STEPS) clearInterval(fadeTimerRef.current)
    }, FADE_DURATION_MS / FADE_STEPS)
    setMuted(false)
  }

  // Track the "click anywhere to continue" gesture while the entry curtain is up.
  // Cleaned up when visible becomes true so it never races with the mute button.
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
      if (!mountedRef.current || !containerRef.current || playerRef.current) return

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
            if (!mountedRef.current) return
            playerRef.current = e.target
            e.target.playVideo()
            setReady(true)
            if (gesturedRef.current) fadeInVolume(e.target)
          },
          onError: (e) => {
            console.error('[AmbientPlayer] Player error code', e.data)
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
    if (muted) {
      fadeInVolume(playerRef.current)
    } else {
      if (fadeTimerRef.current) clearInterval(fadeTimerRef.current)
      try { playerRef.current.mute() } catch (e) {}
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
