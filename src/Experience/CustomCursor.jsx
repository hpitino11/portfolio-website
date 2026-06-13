import { useEffect, useRef } from 'react'
import './CustomCursor.css'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const mouse = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const rafId = useRef(null)
  const isHovering = useRef(false)

  useEffect(() => {
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }

    const onOver = (e) => {
      if (e.target.closest('a, button, [role="button"], input, label, [data-cursor]')) {
        if (!isHovering.current) {
          isHovering.current = true
          ringRef.current?.classList.add('cursor-ring--hover')
          dotRef.current?.classList.add('cursor-dot--hover')
        }
      }
    }

    const onOut = (e) => {
      if (e.target.closest('a, button, [role="button"], input, label, [data-cursor]')) {
        if (isHovering.current) {
          isHovering.current = false
          ringRef.current?.classList.remove('cursor-ring--hover')
          dotRef.current?.classList.remove('cursor-dot--hover')
        }
      }
    }

    const onLeaveWindow = () => {
      mouse.current = { x: -200, y: -200 }
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    document.addEventListener('mouseleave', onLeaveWindow)

    const lerp = (a, b, t) => a + (b - a) * t

    const tick = () => {
      ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, 0.09)
      ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, 0.09)

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.current.x}px, ${mouse.current.y}px)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`
      }

      rafId.current = requestAnimationFrame(tick)
    }

    rafId.current = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.removeEventListener('mouseleave', onLeaveWindow)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
