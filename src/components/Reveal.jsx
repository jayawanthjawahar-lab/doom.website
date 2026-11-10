import { useEffect, useRef, useState } from 'react'

export function Reveal({ children, className = '', delay = 0, as: Element = 'div' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.12 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return <Element ref={ref} className={`reveal ${visible ? 'reveal--visible' : ''} ${className}`.trim()} style={{ '--reveal-delay': `${delay}ms` }}>{children}</Element>
}
