import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useLenis(reducedMotion = false) {
  const lenisRef = useRef(null)

  useEffect(() => {
    if (reducedMotion) {
      ScrollTrigger.refresh()
      return undefined
    }

    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.085,
      smoothWheel: true,
      syncTouch: false,
    })

    lenisRef.current = lenis
    const handleScroll = () => ScrollTrigger.update()
    lenis.on('scroll', handleScroll)

    let frameId
    const raf = (time) => {
      lenis.raf(time)
      frameId = window.requestAnimationFrame(raf)
    }
    frameId = window.requestAnimationFrame(raf)

    return () => {
      window.cancelAnimationFrame(frameId)
      lenis.off('scroll', handleScroll)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [reducedMotion])

  return lenisRef
}
