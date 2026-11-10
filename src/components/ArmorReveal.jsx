import { useEffect, useRef } from 'react'
import { SceneCanvas } from './SceneCanvas'
import { Sovereign } from './Sovereign'
import { initArmorAnimations } from '../animations/armorAnimations'
import { MagneticButton } from './MagneticButton'

export function ArmorReveal({ reducedMotion }) {
  const rootRef = useRef(null)

  useEffect(() => {
    return initArmorAnimations(rootRef.current, reducedMotion)
  }, [reducedMotion])

  return (
    <section ref={rootRef} id="armor" className="armor section-dark" data-cursor="INTERACT" aria-labelledby="armor-title">
      <div className="section-grid" aria-hidden="true" />
      <div className="content-width armor__layout">
        <div className="armor-copy">
          <p className="eyebrow">02 / ARMORED INTELLIGENCE</p>
          <h2 id="armor-title" className="display-title">POWER<br /><em>REQUIRES</em><br />PRECISION<span className="text-accent">.</span></h2>
          <p className="body-copy">The Sovereign is a study in controlled force. Every plate, cable, and illuminated channel is built to make complexity feel inevitable.</p>
          <div className="armor-readout">
            <div><span>FORM</span><strong>SOVEREIGN / 01</strong></div>
            <div><span>MATERIAL</span><strong>COMPOSITE ALLOY</strong></div>
            <div><span>STATE</span><strong className="status-live">AWAKE</strong></div>
          </div>
          <MagneticButton href="#about" className="text-link" data-cursor="INTERACT">TRACE THE SYSTEM <span aria-hidden="true">↗</span></MagneticButton>
        </div>
        <div className="armor-stage-wrap">
          <div className="armor-stage" data-camera-depth>
            <SceneCanvas label="The Sovereign, an original armored technological entity" camera={[0, 1.6, 6.2]}>
              <ambientLight intensity={0.8} color="#69867a" />
              <directionalLight position={[-3, 5, 4]} intensity={2.2} color="#d9f1e2" />
              <pointLight position={[0, 1.1, 2]} intensity={7} distance={6} color="#00d98b" />
              <Sovereign position={[0, -0.9, 0]} scale={1.4} reveal={1} reducedMotion={reducedMotion} />
            </SceneCanvas>
            <div className="armor-stage__grid" aria-hidden="true" />
            <div className="armor-stage__label armor-stage__label--one">HELMET ARRAY <b>01</b></div>
            <div className="armor-stage__label armor-stage__label--two">CORE CHANNEL <b>04</b></div>
            <div className="armor-stage__label armor-stage__label--three">JOINT LOGIC <b>07</b></div>
          </div>
          <div className="exploded-rail" aria-hidden="true">
            <div className="exploded-rail__line" />
            <div className="exploded-rail__item exploded-rail__item--active"><span>01</span> CROWNSHIELD</div>
            <div className="exploded-rail__item"><span>02</span> SHOULDER ARRAY</div>
            <div className="exploded-rail__item"><span>03</span> CORE GATE</div>
            <div className="exploded-rail__item"><span>04</span> JOINT NETWORK</div>
          </div>
        </div>
      </div>
    </section>
  )
}
