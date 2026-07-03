import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './Scene'
import Navbar from './Navbar'
import LoaderOverlay from './LoaderOverlay'
import QuickActions from './QuickActions'
import InfoPanel from './InfoPanel'
import AmbientPlayer from './AmbientPlayer'
import CustomCursor from './CustomCursor'
import HeroTitle from './HeroTitle'
import DesktopOverlay from './DesktopOverlay'
import './Experience.css'

const Experience = () => {
  const [introDone, setIntroDone] = useState(false)
  const [activePanel, setActivePanel] = useState(null)
  const [screenFocus, setScreenFocus] = useState(false)

  return (
    <div className={`experience ${screenFocus ? 'is-screen-focused' : ''}`}>
      <CustomCursor />
     <Navbar visible={introDone} onOpenPanel={setActivePanel} />

      {!introDone && <LoaderOverlay onFinish={() => setIntroDone(true)} />}

      <Canvas
        camera={{
          // Match Scene's intro start so the renderer never paints the final
          // position for a frame before the opening animation is initialized.
          position: [6.117, 4.327, 5.119],
          fov: 60,
          near: 0.1,
          far: 25
        }}
        flat
        dpr={1}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
<Scene
  introDone={introDone}
  screenFocus={screenFocus}
  onScreenClick={() => setScreenFocus(true)}
/>        </Suspense>
      </Canvas>

      <div className="scene-vignette" />

      {introDone && <HeroTitle dimmed={!!activePanel || screenFocus} />}

      <DesktopOverlay open={screenFocus} onClose={() => setScreenFocus(false)} />

      {introDone && (
  <>
    <QuickActions
      onSelect={setActivePanel}
      activePanel={activePanel}
      visible={introDone && !screenFocus}
    />
    <InfoPanel
      activePanel={activePanel}
      onClose={() => setActivePanel(null)}
    />
  </>
)}
      <AmbientPlayer visible={introDone} panelOpen={!!activePanel || screenFocus} />
    </div>
  )
}

export default Experience
