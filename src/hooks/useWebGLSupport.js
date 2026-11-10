import { useState } from 'react'

export function useWebGLSupport() {
  const [supported] = useState(() => {
    if (typeof document === 'undefined') return false
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('webgl2') || canvas.getContext('webgl')
    return Boolean(context)
  })

  return supported
}
