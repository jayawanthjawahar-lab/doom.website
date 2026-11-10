import { useEffect, useRef } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'

export function CustomCursor() {
  const cursorRef = useRef(null)
  const labelRef = useRef(null)
  const isFinePointer = useMediaQuery('(hover: hover) and (pointer: fine)')

  useEffect(() => {
    if (!isFinePointer) return undefined
    const cursor = cursorRef.current
    const label = labelRef.current
    if (!cursor || !label) return undefined

    let pointerX = window.innerWidth / 2
    let pointerY = window.innerHeight / 2
    let currentX = pointerX
    let currentY = pointerY
    let frameId

    const render = () => {
      currentX += (pointerX - currentX) * 0.16
      currentY += (pointerY - currentY) * 0.16
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      frameId = window.requestAnimationFrame(render)
    }

    const handleMove = (event) => {
      pointerX = event.clientX
      pointerY = event.clientY
      cursor.classList.add('custom-cursor--active')
    }

    const handleOver = (event) => {
      const target = event.target.closest('[data-cursor]')
      if (!target) {
        label.textContent = ''
        cursor.classList.remove('custom-cursor--label')
        return
      }
      label.textContent = target.dataset.cursor || ''
      cursor.classList.add('custom-cursor--label')
    }

    const handleLeave = () => cursor.classList.remove('custom-cursor--active')
    window.addEventListener('pointermove', handleMove, { passive: true })
    document.addEventListener('pointerover', handleOver, { passive: true })
    document.addEventListener('mouseleave', handleLeave)
    frameId = window.requestAnimationFrame(render)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('pointermove', handleMove)
      document.removeEventListener('pointerover', handleOver)
      document.removeEventListener('mouseleave', handleLeave)
    }
  }, [isFinePointer])

  if (!isFinePointer) return null

  return (
    <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
      <span ref={labelRef} />
    </div>
  )
}
