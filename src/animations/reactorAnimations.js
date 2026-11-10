import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initReactorAnimations(root, reducedMotion = false) {
  if (!root) return () => {}

  const context = gsap.context(() => {
    if (reducedMotion) {
      gsap.set('.reactor__copy, .reactor__question, .reactor__visual', { clearProps: 'all' })
      return
    }

    gsap.fromTo('.reactor__copy', {
      opacity: 0,
      y: 34,
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: root,
        start: 'top 68%',
        toggleActions: 'play none none reverse',
      },
    })

    gsap.fromTo('.reactor__question', {
      opacity: 0,
      scale: 0.94,
    }, {
      opacity: 1,
      scale: 1,
      duration: 1.1,
      delay: 0.18,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: root,
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
    })

    gsap.to('.reactor__visual', {
      scale: 1.13,
      rotate: 4,
      ease: 'none',
      scrollTrigger: {
        trigger: root,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.3,
      },
    })
  }, root)

  return () => context.revert()
}
