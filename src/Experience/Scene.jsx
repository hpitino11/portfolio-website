import React, { useRef, useState, useEffect, useLayoutEffect, useCallback } from 'react'
import Room from './models/Room_model'
import { OrbitControls, Sparkles } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const easeOutQuart = (x) => 1 - Math.pow(1 - x, 4)
const easeInOutCubic = (x) => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2

const baseTarget = new THREE.Vector3(-3.569, -1.060, -4.041)
const finalCameraPos = new THREE.Vector3(4.231, 3.278, 3.335)

const sphericalFinal = new THREE.Spherical().setFromVector3(
  finalCameraPos.clone().sub(baseTarget)
)
const sphericalStart = new THREE.Spherical(
  sphericalFinal.radius + 2.8,
  sphericalFinal.phi,
  sphericalFinal.theta
)

const startCameraPos = new THREE.Vector3()
  .setFromSpherical(sphericalStart)
  .add(baseTarget)

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const Scene = ({ introDone, screenFocus, onScreenClick }) => {
  const controlsRef = useRef()
  const camera = useThree((state) => state.camera)
  const state = useThree()

  const [controlsEnabled, setControlsEnabled] = useState(false)
  const introAnimRef = useRef(null)
  const focusAnimRef = useRef(null)
  const savedViewRef = useRef(null)
  const screenPivotRef = useRef(null)
  const targetOffsetRef = useRef({ x: 0, y: 0 })
  const workSpherical = useRef(new THREE.Spherical())

  const handleScreenPivot = useCallback((pivot) => {
    screenPivotRef.current = pivot
  }, [])

  // Place the camera at the sweep's start position before the first paint,
  // so the very first rendered frame is already the start framing.
  useLayoutEffect(() => {
    camera.position.copy(startCameraPos)
    camera.lookAt(baseTarget)
  }, [camera])

  // Arm the orbital intro sweep the moment introDone fires
  useEffect(() => {
    if (!introDone) return
    if (prefersReducedMotion) {
      // Reduced motion: cut straight to the final framing
      camera.position.copy(finalCameraPos)
      camera.lookAt(baseTarget)
      if (controlsRef.current) {
        controlsRef.current.target.copy(baseTarget)
        controlsRef.current.update()
      }
      setControlsEnabled(true)
      return
    }
    introAnimRef.current = { startTime: null }
    setControlsEnabled(false)
  }, [introDone, camera])

  // Monitor focus - zoom in to the screen / back out to the room
  useEffect(() => {
    if (screenFocus) {
      const pivot = screenPivotRef.current
      if (!pivot || !controlsRef.current) return

      // cancel any running intro sweep
      introAnimRef.current = null

      savedViewRef.current = {
        camPos: camera.position.clone(),
        target: controlsRef.current.target.clone()
      }

      const horizontalDir = finalCameraPos.clone().sub(pivot)
      horizontalDir.y = 0
      horizontalDir.normalize()
      const camEnd = pivot.clone().add(horizontalDir.multiplyScalar(1.9))
      camEnd.y = pivot.y + 0.1

      focusAnimRef.current = {
        startTime: null,
        duration: prefersReducedMotion ? 0.01 : 1.4,
        camFrom: camera.position.clone(),
        camTo: camEnd,
        targetFrom: controlsRef.current.target.clone(),
        targetTo: pivot.clone(),
        direction: 'in'
      }
      setControlsEnabled(false)
    } else if (savedViewRef.current && controlsRef.current) {
      focusAnimRef.current = {
        startTime: null,
        duration: prefersReducedMotion ? 0.01 : 1.2,
        camFrom: camera.position.clone(),
        camTo: savedViewRef.current.camPos.clone(),
        targetFrom: controlsRef.current.target.clone(),
        targetTo: savedViewRef.current.target.clone(),
        direction: 'out'
      }
      savedViewRef.current = null
    }
  }, [screenFocus, camera])

  useFrame(({ clock }) => {
    const now = clock.getElapsedTime()

    // A gentle push-in that preserves the final composition from the first frame.
    if (introAnimRef.current !== null && introDone) {
      const anim = introAnimRef.current
      if (anim.startTime === null) anim.startTime = now
      const progress = Math.min((now - anim.startTime) / 3.0, 1)
      const eased = easeOutQuart(progress)

      const s = workSpherical.current
      s.radius = sphericalStart.radius + (sphericalFinal.radius - sphericalStart.radius) * eased
      s.phi = sphericalStart.phi + (sphericalFinal.phi - sphericalStart.phi) * eased
      s.theta = sphericalStart.theta + (sphericalFinal.theta - sphericalStart.theta) * eased

      camera.position.setFromSpherical(s).add(baseTarget)
      camera.lookAt(baseTarget)

      if (progress >= 1) {
        introAnimRef.current = null
        if (controlsRef.current) {
          controlsRef.current.target.copy(baseTarget)
          controlsRef.current.update()
        }
        setControlsEnabled(true)
      }
      return
    }

    // Monitor focus animation (in or out)
    if (focusAnimRef.current !== null) {
      const anim = focusAnimRef.current
      if (anim.startTime === null) anim.startTime = now
      const progress = Math.min((now - anim.startTime) / anim.duration, 1)
      const eased = easeInOutCubic(progress)

      camera.position.lerpVectors(anim.camFrom, anim.camTo, eased)
      if (controlsRef.current) {
        controlsRef.current.target.lerpVectors(anim.targetFrom, anim.targetTo, eased)
        camera.lookAt(controlsRef.current.target)
      }

      if (progress >= 1) {
        const direction = anim.direction
        focusAnimRef.current = null
        if (direction === 'out' && controlsRef.current) {
          controlsRef.current.update()
          setControlsEnabled(true)
        }
      }
      return
    }

    // Hold still while sitting at the desk
    if (screenFocus) return

    // Mouse parallax (only once the intro has settled and controls are live -
    // running earlier lets OrbitControls clamp the camera mid-intro, causing a flicker)
    if (introDone && controlsEnabled && !prefersReducedMotion && controlsRef.current) {
      const targetOffsetX = state.pointer.x * 0.12
      const targetOffsetY = state.pointer.y * 0.07

      targetOffsetRef.current.x += (targetOffsetX - targetOffsetRef.current.x) * 0.04
      targetOffsetRef.current.y += (targetOffsetY - targetOffsetRef.current.y) * 0.04

      controlsRef.current.target.set(
        baseTarget.x + targetOffsetRef.current.x,
        baseTarget.y + targetOffsetRef.current.y,
        baseTarget.z
      )
      controlsRef.current.update()
    }
  })

  return (
    <>
      <fogExp2 attach="fog" args={['#111827', 0.008]} />

      <OrbitControls
        ref={controlsRef}
        target={[-3.569, -1.060, -4.041]}
        enabled={controlsEnabled}
        enableDamping
        enablePan={false}
        minDistance={8}
        maxDistance={13}
        minPolarAngle={1.15}
        maxPolarAngle={1.3}
        minAzimuthAngle={0.70}
        maxAzimuthAngle={0.92}
      />

      <Sparkles
        count={48}
        scale={[16, 10, 16]}
        size={7}
        speed={0.1}
        opacity={0.22}
        color="#ffd9a0"
        position={[-3.5, 0.5, -4]}
      />
      <Sparkles
        count={24}
        scale={[12, 8, 12]}
        size={10}
        speed={0.07}
        opacity={0.17}
        color="#8ab4ff"
        position={[-3.5, 0, -4]}
      />

      <ambientLight intensity={4} />
      <Room
        introDone={introDone}
        onScreenClick={onScreenClick}
        onScreenPivot={handleScreenPivot}
      />
    </>
  )
}

export default Scene
