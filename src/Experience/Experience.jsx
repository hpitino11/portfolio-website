import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './Scene'
import Navbar from './Navbar'
import LoaderOverlay from './LoaderOverlay'
import QuickActions from './QuickActions'
import InfoPanel from './InfoPanel'
import './Experience.css'

const Experience = () => {
  const [introDone, setIntroDone] = useState(false)
  const [activePanel, setActivePanel] = useState(null)

  return (
    <div className="experience">
     <Navbar visible={introDone} onOpenPanel={setActivePanel} />

      {!introDone && <LoaderOverlay onFinish={() => setIntroDone(true)} />}

      <Canvas
        camera={{
    position: [4.231, 3.278, 3.335],
    fov: 60,
    near: 0.01,
    far: 2000
  }}
        flat
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
<Scene
  introDone={introDone}
  onOpenPanel={setActivePanel}
/>        </Suspense>
      </Canvas>

      {introDone && (
  <>
    <QuickActions
      onSelect={setActivePanel}
      activePanel={activePanel}
      visible={introDone}
    />
    <InfoPanel
      activePanel={activePanel}
      onClose={() => setActivePanel(null)}
    />
  </>
)}
    </div>
  )
}

export default Experience