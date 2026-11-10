import { useState } from 'react'

function getPerformanceMode() {
  if (typeof navigator === 'undefined' || typeof window === 'undefined') return 'standard'
  const reducedData = navigator.connection?.saveData
  const lowMemory = navigator.deviceMemory && navigator.deviceMemory <= 4
  const lowCpu = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4
  const smallScreen = window.innerWidth < 768
  return reducedData || lowMemory || lowCpu || smallScreen ? 'low' : 'standard'
}

export function usePerformanceMode() {
  const [mode] = useState(getPerformanceMode)

  return {
    mode,
    dpr: mode === 'low' ? 1 : [1, 1.5],
    reduceGeometry: mode === 'low',
  }
}
