import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initCameraAnimations(root, reducedMotion = false) {
  if (!root || reducedMotion) return () => {}

  const context = gsap.context(() => {
    gsap.to('[data-camera-depth]', {
      y: -80,
      ease: 'none',
      scrollTrigger: {
        trigger: root,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    })
  }, root)

  return () => context.revert()
}
