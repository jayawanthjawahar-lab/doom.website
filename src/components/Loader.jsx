import { useEffect, useRef, useState } from 'react'

const stages = [1, 27, 61, 89, 100]

export function Loader({ onComplete }) {
  const [progress, setProgress] = useState(1)
  const completeRef = useRef(onComplete)

  useEffect(() => {
    completeRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    let stageIndex = 0
    const interval = window.setInterval(() => {
      stageIndex += 1
      setProgress(stages[Math.min(stageIndex, stages.length - 1)])
      if (stageIndex >= stages.length - 1) {
        window.clearInterval(interval)
        window.setTimeout(() => completeRef.current?.(), 180)
      }
    }, 210)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <div className="loader" role="status" aria-live="polite" aria-label="Initializing the portfolio core">
      <div className="loader__noise" />
      <div className="loader__topline">
        <span>OUR / DIGITAL CORE</span>
        <span>INITIALIZING CORE</span>
      </div>
      <div className="loader__center">
        <div className="loader__mark" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="loader__status">{progress < 100 ? 'INITIALIZING CORE' : 'CORE ONLINE'}</p>
        <div className="loader__readout">
          <span>POWER</span>
          <strong>{String(progress).padStart(3, '0')}%</strong>
        </div>
        <div className="loader__bar"><span style={{ transform: `scaleX(${progress / 100})` }} /></div>
      </div>
      <div className="loader__bottomline">
        <span>SYSTEM CHECK</span>
        <span>SECURE CHANNEL / 001</span>
      </div>
    </div>
  )
}
