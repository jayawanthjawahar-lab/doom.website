import { useRef } from 'react'
import { Line } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

function CalculationChamber({ accent, reducedMotion }) {
  const groupRef = useRef(null)
  useFrame((state, delta) => {
    if (!groupRef.current || reducedMotion) return
    groupRef.current.rotation.y += delta * 0.16
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05
  })
  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, -0.3]}><boxGeometry args={[3.4, 0.1, 2.2]} /><meshStandardMaterial color="#101817" metalness={0.8} roughness={0.55} /></mesh>
      <mesh position={[0, 0.55, 0]} rotation={[-0.1, 0, 0]}><boxGeometry args={[2.5, 1.3, 0.08]} /><meshStandardMaterial color="#1a2521" metalness={0.5} roughness={0.3} /></mesh>
      <mesh position={[0, 0.55, 0.07]}><boxGeometry args={[2.1, 0.04, 0.02]} /><meshBasicMaterial color={accent} toneMapped={false} /></mesh>
      <mesh position={[0, 0.25, 0.08]}><boxGeometry args={[1.4, 0.04, 0.02]} /><meshBasicMaterial color={accent} transparent opacity={0.6} toneMapped={false} /></mesh>
      <Line points={[[-1.2, 1.2, 0], [0, 1.7, 0], [1.2, 1.2, 0]]} color={accent} lineWidth={1} transparent opacity={0.7} />
    </group>
  )
}

function NetworkChamber({ accent, reducedMotion }) {
  const groupRef = useRef(null)
  const nodes = [[-1.5, 0.8, 0], [0, 1.45, 0.2], [1.4, 0.65, -0.1], [-0.7, -0.65, 0.1], [0.85, -0.75, 0.15]]
  useFrame((state, delta) => {
    if (!groupRef.current || reducedMotion) return
    groupRef.current.rotation.y -= delta * 0.2
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.04
  })
  return (
    <group ref={groupRef}>
      {nodes.map(([x, y, z], index) => <mesh key={`${x}-${y}`} position={[x, y, z]}><sphereGeometry args={[0.16 + (index % 2) * 0.04, 12, 12]} /><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={3} toneMapped={false} /></mesh>)}
      <Line points={[[-1.5, 0.8, 0], [0, 1.45, 0.2], [1.4, 0.65, -0.1], [-0.7, -0.65, 0.1], [0.85, -0.75, 0.15], [-1.5, 0.8, 0]]} color={accent} transparent opacity={0.58} lineWidth={1} />
      <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.7, 0.018, 8, 48]} /><meshBasicMaterial color={accent} transparent opacity={0.3} toneMapped={false} /></mesh>
    </group>
  )
}

function ProductChamber({ accent, reducedMotion }) {
  const groupRef = useRef(null)
  useFrame((state, delta) => {
    if (!groupRef.current || reducedMotion) return
    groupRef.current.rotation.x += delta * 0.12
    groupRef.current.rotation.y += delta * 0.24
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.08
  })
  return (
    <group ref={groupRef}>
      <mesh><boxGeometry args={[1.1, 1.1, 1.1]} /><meshStandardMaterial color="#323b39" metalness={0.92} roughness={0.24} /></mesh>
      <mesh><torusGeometry args={[0.92, 0.035, 12, 48]} /><meshBasicMaterial color={accent} toneMapped={false} /></mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.25, 0.018, 8, 48]} /><meshBasicMaterial color={accent} transparent opacity={0.6} toneMapped={false} /></mesh>
      <mesh position={[0, 0, 0.57]}><boxGeometry args={[0.42, 0.42, 0.04]} /><meshBasicMaterial color={accent} toneMapped={false} /></mesh>
    </group>
  )
}

function ExperimentsChamber({ accent, reducedMotion }) {
  const groupRef = useRef(null)
  const nodes = Array.from({ length: 12 }, (_, index) => {
    const angle = index * 1.05
    return [Math.cos(angle) * (0.8 + (index % 3) * 0.25), Math.sin(angle * 1.7) * 1.25, Math.sin(angle) * 0.8]
  })
  useFrame((state, delta) => {
    if (!groupRef.current || reducedMotion) return
    groupRef.current.rotation.y += delta * 0.32
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.6) * 0.08
  })
  return (
    <group ref={groupRef}>
      {nodes.map(([x, y, z], index) => <mesh key={`${x}-${y}-${z}`} position={[x, y, z]} rotation={[index * 0.3, index * 0.15, index * 0.2]}><boxGeometry args={[0.12, 0.12, 0.12]} /><meshStandardMaterial color={index % 3 ? '#3e4a45' : accent} emissive={accent} emissiveIntensity={index % 3 ? 0.4 : 2.4} metalness={0.7} roughness={0.32} /></mesh>)}
      <mesh><icosahedronGeometry args={[0.62, 1]} /><meshStandardMaterial color="#18241f" metalness={0.8} roughness={0.35} wireframe transparent opacity={0.8} /></mesh>
    </group>
  )
}

export function ProjectScene({ type, accent = '#00d98b', reducedMotion = false }) {
  return (
    <>
      <color attach="background" args={['#080b0b']} />
      <fog attach="fog" args={['#080b0b', 4, 12]} />
      <ambientLight intensity={0.52} color="#607b6e" />
      <directionalLight position={[2, 4, 3]} intensity={1.5} color="#c4e2d2" />
      <pointLight position={[0, 0, 2]} intensity={5} distance={6} color={accent} />
      {type === 'calculation' && <CalculationChamber accent={accent} reducedMotion={reducedMotion} />}
      {type === 'network' && <NetworkChamber accent={accent} reducedMotion={reducedMotion} />}
      {type === 'product' && <ProductChamber accent={accent} reducedMotion={reducedMotion} />}
      {type === 'experiments' && <ExperimentsChamber accent={accent} reducedMotion={reducedMotion} />}
    </>
  )
}
