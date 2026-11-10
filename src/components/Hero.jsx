import { useEffect, useRef } from 'react'
import { SceneCanvas } from './SceneCanvas'
import { FortressScene } from './FortressScene'
import { initHeroAnimations } from '../animations/heroAnimations'
import { MagneticButton } from './MagneticButton'

export function Hero({ reducedMotion }) {
  const rootRef = useRef(null)

  useEffect(() => {
    return initHeroAnimations(rootRef.current, reducedMotion)
  }, [reducedMotion])

  return (
    <section ref={rootRef} id="home" className="hero section-dark" data-cursor="AWAKEN" aria-labelledby="hero-title">
      <div className="hero__scene" data-camera-depth>
        <SceneCanvas label="A dark fortress with an original armored technological guardian" camera={[0, 2.8, 11]}>
          <FortressScene reducedMotion={reducedMotion} />
        </SceneCanvas>
      </div>
      <div className="hero__veil" />
      <div className="hero__hud hero__hud--top"><span>SYS / 001</span><span><i /> CORE ONLINE</span></div>
      <div className="hero__hud hero__hud--bottom"><span>THE SOVEREIGN / FORM 01</span><span>LAT 13.0827° N</span></div>
      <div className="hero__content content-width">
        <p className="eyebrow hero__intro">OUR DIGITAL EXPERIENCE <span className="eyebrow__line" /></p>
        <h1 id="hero-title" className="hero__title" aria-label="Enter the realm">
          <span className="hero__title-line">ENTER</span>
          <span className="hero__title-line hero__title-line--indent">THE</span>
          <span className="hero__title-line hero__title-line--accent">REALM<span className="hero__title-dot">.</span></span>
        </h1>
        <div className="hero__meta">
          <p>Technology / engineering / creative code</p>
          <MagneticButton href="#about" className="button button--outline" data-cursor="AWAKEN">ENTER THE CORE <span aria-hidden="true">↗</span></MagneticButton>
        </div>
      </div>
      <a className="hero__scroll" href="#about" data-cursor="AWAKEN"><span className="hero__scroll-wheel" aria-hidden="true" /><span>SCROLL TO AWAKEN</span><span className="hero__scroll-arrow" aria-hidden="true">↓</span></a>
      <div className="hero__coordinates" aria-hidden="true"><span>40°41' N</span><span>74°00' W</span><span>03.14.26</span></div>
    </section>
  )
}
