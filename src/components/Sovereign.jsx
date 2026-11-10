import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function Plate({ position, scale, rotation = [0, 0, 0], color = '#252d2d', metalness = 0.88, roughness = 0.42 }) {
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
    </mesh>
  )
}

function Joint({ position, scale = 0.2 }) {
  return (
    <mesh position={position} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[scale, scale, scale * 0.7, 12]} />
      <meshStandardMaterial color="#59605d" metalness={0.96} roughness={0.26} />
    </mesh>
  )
}

export function Sovereign({ position = [0, 0, 0], scale = 1, reducedMotion = false, reveal = 1 }) {
  const rootRef = useRef(null)
  const helmetRef = useRef(null)
  const shoulderLeftRef = useRef(null)
  const shoulderRightRef = useRef(null)
  const coreRef = useRef(null)
  const eyeLeftRef = useRef(null)
  const eyeRightRef = useRef(null)

  useFrame((state, delta) => {
    if (reducedMotion || !rootRef.current) return
    const time = state.clock.elapsedTime
    rootRef.current.position.y = position[1] + Math.sin(time * 0.7) * 0.035
    rootRef.current.rotation.y = Math.sin(time * 0.2) * 0.035
    if (helmetRef.current) helmetRef.current.rotation.y = Math.sin(time * 0.45) * 0.02
    if (shoulderLeftRef.current) shoulderLeftRef.current.rotation.z = Math.sin(time * 0.55) * 0.025
    if (shoulderRightRef.current) shoulderRightRef.current.rotation.z = -Math.sin(time * 0.55) * 0.025
    if (coreRef.current) coreRef.current.rotation.z += delta * 0.7
    if (eyeLeftRef.current) eyeLeftRef.current.scale.x = 0.9 + Math.sin(time * 3) * 0.06
    if (eyeRightRef.current) eyeRightRef.current.scale.x = 0.9 + Math.sin(time * 3 + 0.5) * 0.06
  })

  const glow = 1.8 + reveal * 3.8

  return (
    <group ref={rootRef} position={position} scale={scale}>
      <group ref={helmetRef} position={[0, 1.72, 0]}>
        <mesh scale={[0.78, 0.82, 0.64]}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial color="#303737" metalness={0.95} roughness={0.32} />
        </mesh>
        <Plate position={[-0.48, 0.12, 0.47]} scale={[0.62, 0.16, 0.12]} rotation={[0.1, -0.2, -0.12]} color="#1e2525" />
        <Plate position={[0.48, 0.12, 0.47]} scale={[0.62, 0.16, 0.12]} rotation={[0.1, 0.2, 0.12]} color="#1e2525" />
        <Plate position={[-0.28, 0.66, 0.05]} scale={[0.16, 0.68, 0.16]} rotation={[0, 0, -0.18]} color="#202727" />
        <Plate position={[0.28, 0.66, 0.05]} scale={[0.16, 0.68, 0.16]} rotation={[0, 0, 0.18]} color="#202727" />
        <Plate position={[0, 0.84, 0]} scale={[0.2, 0.34, 0.1]} rotation={[0, 0, 0]} color="#151a1a" />
        <mesh ref={eyeLeftRef} position={[-0.22, 0.04, 0.64]}>
          <boxGeometry args={[0.18, 0.045, 0.035]} />
          <meshBasicMaterial color="#baffdc" toneMapped={false} />
        </mesh>
        <mesh ref={eyeRightRef} position={[0.22, 0.04, 0.64]}>
          <boxGeometry args={[0.18, 0.045, 0.035]} />
          <meshBasicMaterial color="#baffdc" toneMapped={false} />
        </mesh>
        <mesh position={[0.46, 0.78, 0.02]} rotation={[0, 0, -0.15]}>
          <boxGeometry args={[0.08, 0.58, 0.08]} />
          <meshStandardMaterial color="#5a625e" metalness={0.98} roughness={0.22} />
        </mesh>
      </group>

      <Plate position={[0, 0.73, 0]} scale={[1.28, 1.42, 0.62]} color="#202828" />
      <Plate position={[0, 0.92, 0.34]} scale={[0.86, 0.72, 0.12]} color="#151b1b" />
      <Plate position={[0, 0.95, 0.42]} scale={[0.54, 0.32, 0.08]} color="#0c1111" />
      <mesh ref={coreRef} position={[0, 0.93, 0.49]} rotation={[0, 0, 0]}>
        <icosahedronGeometry args={[0.24, 1]} />
        <meshStandardMaterial color="#b5ffe0" emissive="#00d98b" emissiveIntensity={glow} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.9, 0.52]}>
        <torusGeometry args={[0.38, 0.025, 8, 32]} />
        <meshBasicMaterial color="#00d98b" transparent opacity={0.85} toneMapped={false} />
      </mesh>

      <group ref={shoulderLeftRef} position={[-0.94, 1.15, 0]}>
        <Plate position={[-0.14, 0, 0]} scale={[0.88, 0.4, 0.74]} rotation={[0, 0, -0.18]} color="#303939" />
        <Plate position={[-0.26, -0.31, 0.02]} scale={[0.5, 0.2, 0.52]} rotation={[0, 0, -0.3]} color="#171d1d" />
        <Joint position={[0.1, -0.38, 0]} scale={0.18} />
      </group>
      <group ref={shoulderRightRef} position={[0.94, 1.12, 0]}>
        <Plate position={[0.16, 0.04, 0]} scale={[0.98, 0.52, 0.8]} rotation={[0, 0, 0.22]} color="#283131" />
        <Plate position={[0.28, -0.3, 0.02]} scale={[0.52, 0.2, 0.56]} rotation={[0, 0, 0.3]} color="#151b1b" />
        <Joint position={[-0.1, -0.38, 0]} scale={0.18} />
      </group>

      <Plate position={[-0.36, -0.22, 0]} scale={[0.3, 1.32, 0.32]} rotation={[0, 0, -0.04]} color="#202727" />
      <Plate position={[0.36, -0.22, 0]} scale={[0.3, 1.32, 0.32]} rotation={[0, 0, 0.04]} color="#202727" />
      <Joint position={[-0.36, 0.45, 0]} scale={0.18} />
      <Joint position={[0.36, 0.45, 0]} scale={0.18} />
      <Joint position={[-0.36, -0.82, 0]} scale={0.18} />
      <Joint position={[0.36, -0.82, 0]} scale={0.18} />

      <mesh position={[-0.68, 0.2, 0.35]} rotation={[0.2, 0.1, 0.2]}>
        <torusGeometry args={[0.2, 0.028, 8, 24, Math.PI * 1.45]} />
        <meshStandardMaterial color="#606863" metalness={0.9} roughness={0.28} />
      </mesh>
      <mesh position={[0.68, 0.2, 0.35]} rotation={[0.2, -0.1, -0.2]}>
        <torusGeometry args={[0.2, 0.028, 8, 24, Math.PI * 1.45]} />
        <meshStandardMaterial color="#606863" metalness={0.9} roughness={0.28} />
      </mesh>
      <mesh position={[0, -0.65, 0.33]}>
        <boxGeometry args={[0.1, 0.72, 0.04]} />
        <meshBasicMaterial color="#00d98b" transparent opacity={0.66} toneMapped={false} />
      </mesh>
    </group>
  )
}
