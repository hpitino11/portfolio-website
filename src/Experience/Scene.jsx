import React, { useRef } from 'react'
import Room from './models/Room_model'
import { OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

const Scene = ({ introDone, onOpenPanel }) => {  const controlsRef = useRef()
  const camera = useThree((state) => state.camera)

  const handleChange = () => {
    if (!controlsRef.current) return

  }

  return (
    <>
      <OrbitControls
  ref={controlsRef}
  target={[-3.569, -1.060, -4.041]}

  enableDamping
  enablePan={false}

  /* ZOOM — tighter */
  minDistance={11}
  maxDistance={13}

  /* VERTICAL — tighter */
  minPolarAngle={1.15}
  maxPolarAngle={1.3}

  /* HORIZONTAL — tighter */
  minAzimuthAngle={0.70}
  maxAzimuthAngle={0.92}

  onChange={handleChange}
/>

      <ambientLight intensity={4} />
      <Room
  introDone={introDone}
  onOpenPanel={onOpenPanel}
/>
    </>
  )
}

export default Scene