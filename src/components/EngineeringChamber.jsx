import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SceneCanvas } from './SceneCanvas'
import { initCameraAnimations } from '../animations/cameraAnimations'
import { Reveal } from './Reveal'

gsap.registerPlugin(ScrollTrigger)

function EngineeringMachine({ progressRef, reducedMotion }) {
  const rootRef = useRef(null)
  const ringRef = useRef(null)
  const partRefs = useRef([])
  const parts = [
    { position: [0, 0, 0], scale: [1.35, 0.28, 1.35], color: '#2a3532', offset: [0, 0, 0] },
    { position: [0, 0.62, 0], scale: [0.86, 0.22, 0.86], color: '#1a2522', offset: [0, 0.9, 0] },
    { position: [0, -0.62, 0], scale: [0.86, 0.22, 0.86], color: '#1a2522', offset: [0, -0.9, 0] },
    { position: [0, 0, 0], scale: [0.28, 2.1, 0.28], color: '#414b46', offset: [0, 0, 1.2] },
  ]

  useFrame((state, delta) => {
    if (reducedMotion) return
    const separation = Math.sin(progressRef.current * Math.PI)
    partRefs.current.forEach((part, index) => {
      if (!part) return
      const base = parts[index].position
      const offset = parts[index].offset
      part.position.set(base[0] + offset[0] * separation, base[1] + offset[1] * separation, base[2] + offset[2] * separation)
    })
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * (0.18 + progressRef.current * 0.3)
      ringRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
    }
  })

  return (
    <group ref={rootRef}>
      {parts.map((part, index) => <mesh key={index} ref={(node) => { partRefs.current[index] = node }} position={part.position} scale={part.scale}><boxGeometry args={[1, 1, 1]} /><meshStandardMaterial color={part.color} metalness={0.9} roughness={0.3} /></mesh>)}
      <group ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <mesh><torusGeometry args={[1.35, 0.04, 10, 64]} /><meshBasicMaterial color="#00d98b" toneMapped={false} /></mesh>
        <mesh rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[1.55, 0.02, 8, 64]} /><meshBasicMaterial color="#66f7bd" transparent opacity={0.55} toneMapped={false} /></mesh>
      </group>
      <mesh position={[0, 0, 0.32]}><icosahedronGeometry args={[0.3, 1]} /><meshStandardMaterial color="#c2ffe0" emissive="#00d98b" emissiveIntensity={5} toneMapped={false} /></mesh>
      <mesh position={[0, 0, 0.4]}><boxGeometry args={[0.04, 1.3, 0.04]} /><meshBasicMaterial color="#00d98b" toneMapped={false} /></mesh>
      <mesh position={[0, 0, 0.4]}><boxGeometry args={[1.3, 0.04, 0.04]} /><meshBasicMaterial color="#00d98b" toneMapped={false} /></mesh>
      <mesh position={[0, -1.28, 0]}><boxGeometry args={[0.05, 0.7, 0.05]} /><meshBasicMaterial color="#00d98b" transparent opacity={0.8} toneMapped={false} /></mesh>
    </group>
  )
}

export function EngineeringChamber({ reducedMotion }) {
  const rootRef = useRef(null)
  const progressRef = useRef(0)

  useEffect(() => {
    if (!rootRef.current) return undefined
    if (reducedMotion) return undefined
    const context = gsap.context(() => {
      gsap.to(progressRef, {
        current: 1,
        ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
      })
    }, rootRef)
    return () => context.revert()
  }, [reducedMotion])

  useEffect(() => initCameraAnimations(rootRef.current, reducedMotion), [reducedMotion])

  return (
    <section ref={rootRef} id="engineering" className="engineering section-dark" data-cursor="INTERACT" aria-labelledby="engineering-title">
      <div className="content-width engineering__layout">
        <Reveal className="engineering__copy"><p className="eyebrow">08 / BUILDING DIGITAL SYSTEMS</p><h2 id="engineering-title" className="display-title">THE<br /><em>ENGINEERING</em><br />CHAMBER<span className="text-accent">.</span></h2><p className="body-copy">A machine is a conversation between parts. Scroll to separate the system, inspect the logic, and watch it return to balance.</p><div className="engineering__spec"><span><b>01</b> MODULAR PARTS</span><span><b>02</b> LIVE ASSEMBLY</span><span><b>03</b> SYSTEM LOGIC</span></div></Reveal>
        <Reveal delay={120} className="engineering__visual"><SceneCanvas label="A modular futuristic machine that disassembles and reassembles" camera={[0, 0.5, 5.8]}><ambientLight intensity={0.7} color="#6a887a" /><directionalLight position={[-3, 4, 4]} intensity={2.1} color="#d5f4e2" /><pointLight position={[0, 0, 2]} intensity={6} distance={6} color="#00d98b" /><EngineeringMachine progressRef={progressRef} reducedMotion={reducedMotion} /></SceneCanvas><div className="engineering__readout"><span>ASSEMBLY STATE</span><strong>DISASSEMBLE / RECOMPOSE</strong><i><b /></i></div></Reveal>
      </div>
    </section>
  )
}
