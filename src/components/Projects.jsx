import { useEffect, useRef } from 'react'
import { projects } from '../data/projects'
import { initProjectAnimations } from '../animations/projectAnimations'
import { SceneCanvas } from './SceneCanvas'
import { ProjectScene } from './ProjectScene'
import { MagneticButton } from './MagneticButton'
import { Reveal } from './Reveal'

export function Projects({ reducedMotion }) {
  const rootRef = useRef(null)

  useEffect(() => {
    return initProjectAnimations(rootRef.current, reducedMotion)
  }, [reducedMotion])

  return (
    <section ref={rootRef} id="work" className="projects section-dark" aria-labelledby="work-title">
      <div className="content-width">
        <Reveal className="section-heading section-heading--split"><div><p className="eyebrow">07 / SELECTED TRANSMISSIONS</p><h2 id="work-title" className="display-title">OUR<br /><em>WORK</em><span className="text-accent">.</span></h2></div><p className="body-copy">Four chambers. Four signals. Each project is a different way to turn a thought into something you can enter.</p></Reveal>
        <div className="project-grid">
          {projects.map((project) => (
            <article key={project.id} className={`project-card project-card--${project.type}`} data-cursor="OPEN">
              <div className="project-card__visual">
                <SceneCanvas label={`${project.chamber} visual for ${project.name}`} camera={[0, 0.2, 5.4]}>
                  <ProjectScene type={project.type} accent={project.accent} reducedMotion={reducedMotion} />
                </SceneCanvas>
                <div className="project-card__hud" aria-hidden="true"><span>{project.chamber}</span><span>LIVE / {project.number}</span></div>
              </div>
              <div className="project-copy">
                <div className="project-card__number">{project.number}</div>
                <div className="project-card__body"><h3>{project.name}</h3><p>{project.description}</p><div className="project-card__tech">{project.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div><MagneticButton href="#contact" className="text-link" data-cursor="OPEN">VIEW PROJECT <span aria-hidden="true">↗</span></MagneticButton></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
