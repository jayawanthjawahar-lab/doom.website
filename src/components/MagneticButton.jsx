import { useRef } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'

export function MagneticButton({ children, href, onClick, className = '', type = 'button', disabled = false, ...props }) {
  const buttonRef = useRef(null)
  const isFinePointer = useMediaQuery('(hover: hover) and (pointer: fine)')

  const handleMove = (event) => {
    if (!isFinePointer || disabled) return
    const element = buttonRef.current
    if (!element) return
    const bounds = element.getBoundingClientRect()
    const x = (event.clientX - (bounds.left + bounds.width / 2)) * 0.16
    const y = (event.clientY - (bounds.top + bounds.height / 2)) * 0.16
    element.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }

  const reset = () => {
    if (buttonRef.current) buttonRef.current.style.transform = 'translate3d(0, 0, 0)'
  }

  const sharedProps = {
    ref: buttonRef,
    className: `magnetic-button ${className}`.trim(),
    onMouseMove: handleMove,
    onMouseLeave: reset,
    onBlur: reset,
    disabled,
    ...props,
  }

  if (href) {
    return <a href={href} onClick={onClick} {...sharedProps}>{children}</a>
  }

  return <button type={type} onClick={onClick} {...sharedProps}>{children}</button>
}
