import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initArmorAnimations(root, reducedMotion = false) {
  if (!root) return () => {}

  const context = gsap.context(() => {
    if (reducedMotion) {
      gsap.set('.armor-stage, .armor-copy, .armor-readout', { clearProps: 'all' })
      return
    }

    gsap.fromTo('.armor-copy', {
      opacity: 0,
      x: 30,
    }, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: root,
        start: 'top 72%',
        toggleActions: 'play none none reverse',
      },
    })

    gsap.to('.armor-stage', {
      rotateY: 8,
      scale: 1.06,
      ease: 'none',
      scrollTrigger: {
        trigger: root,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
      },
    })
  }, root)

  return () => context.revert()
}
