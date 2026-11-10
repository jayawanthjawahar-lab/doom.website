import { useState } from 'react'
import { skills } from '../data/skills'
import { Reveal } from './Reveal'

export function PowerSystem() {
  const [active, setActive] = useState(skills[0])
  const [pointer, setPointer] = useState({ x: 0, y: 0 })

  const handlePointerMove = (event) => {
    if (event.pointerType === 'touch') return
    const bounds = event.currentTarget.getBoundingClientRect()
    setPointer({
      x: (event.clientX - bounds.left - bounds.width / 2) / bounds.width,
      y: (event.clientY - bounds.top - bounds.height / 2) / bounds.height,
    })
  }

  return (
    <section id="system" className="power section-dark" data-cursor="INTERACT" aria-labelledby="system-title">
      <div className="content-width">
        <div className="section-heading section-heading--split">
          <Reveal><p className="eyebrow">05 / CAPABILITY MATRIX</p><h2 id="system-title" className="display-title">POWER<br /><em>SYSTEM</em><span className="text-accent">.</span></h2></Reveal>
          <Reveal delay={100}><p className="body-copy">A technology core assembled from interfaces, systems, and the quiet details that make an experience feel inevitable.</p></Reveal>
        </div>
        <Reveal delay={150} className="reactor-interface" onPointerMove={handlePointerMove} onPointerLeave={() => setPointer({ x: 0, y: 0 })}>
          <div className="reactor-interface__grid" aria-hidden="true" />
          <div className="reactor-interface__orbit reactor-interface__orbit--one" aria-hidden="true" />
          <div className="reactor-interface__orbit reactor-interface__orbit--two" aria-hidden="true" />
          <div className="reactor-core" style={{ '--pointer-x': pointer.x, '--pointer-y': pointer.y }}>
            <div className="reactor-core__halo" />
            <div className="reactor-core__sphere" />
            <div className="reactor-core__crosshair" aria-hidden="true" />
            <span className="reactor-core__caption">CORE / 87%</span>
          </div>
          <div className="system-labels" role="list" aria-label="Technology capabilities">
            {skills.map((skill, index) => (
              <button
                key={skill.name}
                type="button"
                className={`system-label system-label--${skill.position} ${active.name === skill.name ? 'system-label--active' : ''}`}
                onClick={() => setActive(skill)}
                onFocus={() => setActive(skill)}
                onMouseEnter={() => setActive(skill)}
                aria-pressed={active.name === skill.name}
                role="listitem"
                data-cursor="INTERACT"
              >
                <span className="system-label__index">0{index + 1}</span><strong>{skill.name}</strong><i />
              </button>
            ))}
          </div>
          <div className="system-detail" aria-live="polite">
            <span className="eyebrow">ACTIVE MODULE</span>
            <strong>{active.name}</strong>
            <p>{active.detail}</p>
          </div>
          <div className="system-stats"><span><b>POWER / 87%</b><small>VISUAL LOAD</small></span><span><b>STATUS / READY</b><small>INTERFACE STATE</small></span><span><b>MODE / BUILT</b><small>ENGINEERING CORE</small></span></div>
        </Reveal>
      </div>
    </section>
  )
}
