import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SceneCanvas } from './SceneCanvas'
import { initReactorAnimations } from '../animations/reactorAnimations'
import { Reveal } from './Reveal'

gsap.registerPlugin(ScrollTrigger)

function ReactorMachine({ progressRef, reducedMotion }) {
  const groupRef = useRef(null)
  const coreRef = useRef(null)
  const shellRef = useRef(null)
  const orbitRef = useRef(null)

  useFrame((state, delta) => {
    const progress = progressRef.current
    if (!reducedMotion) {
      if (groupRef.current) {
        groupRef.current.rotation.y = progress * Math.PI * 1.2 + Math.sin(state.clock.elapsedTime * 0.22) * 0.08
        groupRef.current.scale.setScalar(0.86 + progress * 0.26)
      }
      if (shellRef.current) shellRef.current.rotation.z -= delta * (0.12 + progress * 0.28)
      if (orbitRef.current) orbitRef.current.rotation.y += delta * 0.24
      if (coreRef.current) coreRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.08 + progress * 0.1)
    }
  })

  return (
    <group ref={groupRef}>
      <mesh ref={coreRef}><icosahedronGeometry args={[0.9, 3]} /><meshStandardMaterial color="#caffeb" emissive="#00d98b" emissiveIntensity={7} toneMapped={false} /></mesh>
      <group ref={shellRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.55, 0.12, 16, 64]} /><meshStandardMaterial color="#263630" metalness={0.94} roughness={0.2} /></mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}><torusGeometry args={[1.85, 0.08, 12, 64]} /><meshStandardMaterial color="#192520" metalness={0.92} roughness={0.25} /></mesh>
        <mesh rotation={[Math.PI / 2, Math.PI / 2, 0]}><torusGeometry args={[2.2, 0.045, 10, 64]} /><meshBasicMaterial color="#00d98b" transparent opacity={0.62} toneMapped={false} /></mesh>
      </group>
      <group ref={orbitRef}>
        <mesh position={[0, 1.65, 0]}><sphereGeometry args={[0.075, 12, 12]} /><meshBasicMaterial color="#adffda" toneMapped={false} /></mesh>
        <mesh position={[-1.35, -0.92, 0]}><sphereGeometry args={[0.06, 12, 12]} /><meshBasicMaterial color="#adffda" toneMapped={false} /></mesh>
        <mesh position={[1.2, 0.9, 0.1]}><sphereGeometry args={[0.05, 12, 12]} /><meshBasicMaterial color="#adffda" toneMapped={false} /></mesh>
      </group>
    </group>
  )
}

export function Reactor({ reducedMotion }) {
  const rootRef = useRef(null)
  const progressRef = useRef(0)

  useEffect(() => initReactorAnimations(rootRef.current, reducedMotion), [reducedMotion])

  useEffect(() => {
    if (!rootRef.current || reducedMotion) return undefined
    const context = gsap.context(() => {
      gsap.to(progressRef, {
        current: 1,
        ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.1 },
      })
    }, rootRef)
    return () => context.revert()
  }, [reducedMotion])

  return (
    <section ref={rootRef} id="core" className="reactor section-dark" data-cursor="INTERACT" aria-labelledby="reactor-title">
      <div className="reactor__backdrop" aria-hidden="true" />
      <div className="content-width reactor__layout">
        <Reveal className="reactor__copy"><p className="eyebrow">10 / DIGITAL CORE</p><h2 id="reactor-title" className="display-title">EVERY<br /><em>SYSTEM</em><br />NEEDS<br />A CORE<span className="text-accent">.</span></h2><p className="body-copy">The center is not a destination. It is the point where an idea becomes a living system.</p></Reveal>
        <Reveal delay={120} className="reactor__visual"><SceneCanvas label="A giant emerald reactor with orbiting energy" camera={[0, 0, 6.2]}><ambientLight intensity={0.75} color="#7ba993" /><directionalLight position={[-2, 3, 4]} intensity={1.8} color="#e0fff0" /><pointLight position={[0, 0, 2]} intensity={14} distance={8} color="#00d98b" /><ReactorMachine progressRef={progressRef} reducedMotion={reducedMotion} /></SceneCanvas><div className="reactor__visual-hud" aria-hidden="true"><span>REACTOR / 87%</span><span>PARTICLE FIELD</span><span>STABILITY / HIGH</span></div></Reveal>
      </div>
      <Reveal delay={200} className="reactor__question"><span className="eyebrow">11 / NEXT TRANSMISSION</span><h3>WHAT WILL<br /><em>YOU BUILD?</em></h3></Reveal>
    </section>
  )
}
