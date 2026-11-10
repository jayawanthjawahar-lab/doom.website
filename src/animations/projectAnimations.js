import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initProjectAnimations(root, reducedMotion = false) {
  if (!root) return () => {}

  const context = gsap.context(() => {
    if (reducedMotion) {
      gsap.set('.project-card, .project-index, .project-copy', { clearProps: 'all' })
      return
    }

    gsap.utils.toArray('.project-card').forEach((card, index) => {
      gsap.fromTo(card, {
        opacity: 0,
        y: 52,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.95,
        delay: index * 0.04,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 86%',
          toggleActions: 'play none none reverse',
        },
      })
    })

    gsap.utils.toArray('.project-copy > *').forEach((item) => {
      gsap.fromTo(item, {
        opacity: 0,
        x: -18,
      }, {
        opacity: 1,
        x: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      })
    })
  }, root)

  return () => context.revert()
}
