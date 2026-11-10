import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { usePerformanceMode } from '../hooks/usePerformanceMode'
import { useWebGLSupport } from '../hooks/useWebGLSupport'
import { WebGLFallback } from './WebGLFallback'

export function SceneCanvas({ children, className = '', label, camera = [0, 2.2, 9] }) {
  const supported = useWebGLSupport()
  const { dpr, reduceGeometry } = usePerformanceMode()

  if (!supported) {
    return <WebGLFallback label={label} />
  }

  return (
    <div className={`scene-canvas ${className}`} aria-hidden="true">
      <Canvas
        dpr={reduceGeometry ? 1 : dpr}
        camera={{ position: camera, fov: 42, near: 0.1, far: 60 }}
        gl={{ antialias: !reduceGeometry, alpha: true, powerPreference: 'high-performance' }}
        frameloop="always"
      >
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  )
}
