import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initHeroAnimations(root, reducedMotion = false) {
  if (!root) return () => {}

  const context = gsap.context(() => {
    if (reducedMotion) {
      gsap.set('.hero__title-line, .hero__meta, .hero__scroll, .hero__intro', { clearProps: 'all' })
      return
    }

    gsap.fromTo('.hero__title-line', {
      yPercent: 115,
      opacity: 0,
    }, {
      yPercent: 0,
      opacity: 1,
      duration: 1.15,
      stagger: 0.12,
      delay: 0.18,
      ease: 'power4.out',
    })

    gsap.fromTo('.hero__meta, .hero__scroll, .hero__intro', {
      opacity: 0,
      y: 16,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.08,
      delay: 0.7,
      ease: 'power2.out',
    })

    gsap.to('.hero__scene', {
      yPercent: 12,
      scale: 1.08,
      ease: 'none',
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    })
  }, root)

  return () => context.revert()
}
