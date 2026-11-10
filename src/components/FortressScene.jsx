import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line, Sparkles } from '@react-three/drei'
import { Sovereign } from './Sovereign'

const towerData = [
  [-5.3, 1.5, -1.2, 1.1, 4.2],
  [-3.5, 1.1, -2.4, 0.9, 3.2],
  [4.9, 1.45, -1.5, 1, 4.1],
  [3.1, 1.05, -2.8, 0.82, 3.1],
  [0, 1.3, -4.2, 1.45, 3.6],
]

const particleData = Array.from({ length: 150 }, (_, index) => {
  const angle = index * 2.399
  const radius = 3.8 + (index % 9) * 0.42
  return [(Math.cos(angle) * radius) * 0.8, 1.1 + ((index * 17) % 31) * 0.08, -2.8 - (index % 7) * 0.36]
})

function Particles({ reducedMotion }) {
  const pointsRef = useRef(null)
  const positions = useMemo(() => new Float32Array(particleData.flat()), [])

  useFrame((_, delta) => {
    if (!pointsRef.current || reducedMotion) return
    pointsRef.current.rotation.y += delta * 0.018
    pointsRef.current.rotation.x = Math.sin(Date.now() * 0.0001) * 0.025
  })

  return (
    <points ref={pointsRef} position={[0, 0, -2]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#00d98b" size={0.045} transparent opacity={0.62} sizeAttenuation />
    </points>
  )
}

function EnergyCore({ reducedMotion }) {
  const coreRef = useRef(null)
  const ringRef = useRef(null)

  useFrame((state, delta) => {
    if (reducedMotion) return
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.2) * 0.12
    if (coreRef.current) coreRef.current.scale.setScalar(pulse)
    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 0.24
      ringRef.current.rotation.z -= delta * 0.16
    }
  })

  return (
    <group position={[0, 1.1, 0.15]}>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.34, 2]} />
        <meshStandardMaterial color="#a3ffdd" emissive="#00d98b" emissiveIntensity={5} toneMapped={false} />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.62, 0.018, 8, 48]} />
        <meshBasicMaterial color="#00d98b" transparent opacity={0.9} toneMapped={false} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.8, 0.012, 8, 48]} />
        <meshBasicMaterial color="#53f5b5" transparent opacity={0.46} toneMapped={false} />
      </mesh>
    </group>
  )
}

function Fortress({ reducedMotion }) {
  const groupRef = useRef(null)
  useFrame((state, delta) => {
    if (!groupRef.current || reducedMotion) return
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.012
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.025
    groupRef.current.rotation.y += delta * 0.002
  })

  return (
    <group ref={groupRef} position={[0, -1.1, -2.7]}>
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[13, 0.75, 6.5]} />
        <meshStandardMaterial color="#171a1b" metalness={0.86} roughness={0.68} />
      </mesh>
      <mesh position={[0, 0.62, -1.6]}>
        <boxGeometry args={[8.4, 0.7, 3.2]} />
        <meshStandardMaterial color="#101314" metalness={0.8} roughness={0.76} />
      </mesh>
      <mesh position={[0, 0.98, 0.1]}>
        <boxGeometry args={[3.5, 0.2, 0.22]} />
        <meshBasicMaterial color="#00d98b" transparent opacity={0.72} toneMapped={false} />
      </mesh>
      {towerData.map(([x, y, z, width, height], index) => (
        <group key={`${x}-${z}`} position={[x, y, z]}>
          <mesh>
            <boxGeometry args={[width, height, width]} />
            <meshStandardMaterial color={index % 2 ? '#1b2020' : '#202626'} metalness={0.8} roughness={0.72} />
          </mesh>
          <mesh position={[0, height / 2 + 0.22, 0]}>
            <boxGeometry args={[width * 1.18, 0.34, width * 1.18]} />
            <meshStandardMaterial color="#0c1010" metalness={0.9} roughness={0.55} />
          </mesh>
          <mesh position={[0, 0.18, width / 2 + 0.01]}>
            <boxGeometry args={[width * 0.38, 0.12, 0.025]} />
            <meshBasicMaterial color="#00d98b" transparent opacity={0.7} toneMapped={false} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 0.08, 2.12]}>
        <boxGeometry args={[2.3, 0.06, 0.04]} />
        <meshBasicMaterial color="#00d98b" transparent opacity={0.78} toneMapped={false} />
      </mesh>
    </group>
  )
}

function MetalStructures({ reducedMotion }) {
  const groupRef = useRef(null)
  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.025
    groupRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.16) * 0.02
  })

  return (
    <group ref={groupRef} position={[0, 0, 1.5]}>
      <mesh position={[-5.2, 1.05, -1.8]} rotation={[0, 0, 0.16]}>
        <cylinderGeometry args={[0.13, 0.13, 5.2, 8]} />
        <meshStandardMaterial color="#303839" metalness={0.92} roughness={0.42} />
      </mesh>
      <mesh position={[5.1, 1.25, -2.1]} rotation={[0, 0, -0.13]}>
        <cylinderGeometry args={[0.18, 0.18, 6.1, 8]} />
        <meshStandardMaterial color="#2a3030" metalness={0.9} roughness={0.48} />
      </mesh>
      <mesh position={[0, 1.9, -2.8]}>
        <boxGeometry args={[10.2, 0.12, 0.12]} />
        <meshStandardMaterial color="#343b3b" metalness={0.86} roughness={0.5} />
      </mesh>
      <mesh position={[-2.6, 1.82, -2.72]}>
        <boxGeometry args={[0.06, 1.45, 0.06]} />
        <meshBasicMaterial color="#00d98b" transparent opacity={0.7} toneMapped={false} />
      </mesh>
      <mesh position={[2.6, 1.82, -2.72]}>
        <boxGeometry args={[0.06, 1.45, 0.06]} />
        <meshBasicMaterial color="#00d98b" transparent opacity={0.7} toneMapped={false} />
      </mesh>
      <Line points={[[-5, 2.4, -1.8], [-2.2, 3.2, -1.3], [0, 3.35, -1.1], [2.2, 3.2, -1.3], [5, 2.4, -1.8]]} color="#00d98b" transparent opacity={0.34} lineWidth={1} />
    </group>
  )
}

export function FortressScene({ reducedMotion = false }) {
  return (
    <>
      <color attach="background" args={['#050607']} />
      <fog attach="fog" args={['#050607', 8, 25]} />
      <ambientLight intensity={0.38} color="#5a756b" />
      <directionalLight position={[-4, 8, 5]} intensity={1.8} color="#b7c9bf" />
      <pointLight position={[0, 1.4, 2.5]} intensity={10} distance={9} color="#00d98b" />
      <pointLight position={[-5, 3, -1]} intensity={5} distance={8} color="#276b50" />
      <Fortress reducedMotion={reducedMotion} />
      <MetalStructures reducedMotion={reducedMotion} />
      <EnergyCore reducedMotion={reducedMotion} />
      <Particles reducedMotion={reducedMotion} />
      <Sovereign position={[0, 0.45, 0.2]} scale={1.18} reducedMotion={reducedMotion} />
      <Sparkles count={reducedMotion ? 20 : 55} scale={[12, 7, 8]} size={1.3} speed={0.22} color="#6affbf" opacity={0.22} />
    </>
  )
}
