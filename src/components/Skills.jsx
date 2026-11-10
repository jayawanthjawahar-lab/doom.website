import { useState } from 'react'
import { skills } from '../data/skills'
import { Reveal } from './Reveal'

export function Skills() {
  const [selected, setSelected] = useState('React')

  return (
    <section className="skills section-dark" aria-labelledby="skills-title">
      <div className="content-width">
        <Reveal className="section-heading"><p className="eyebrow">06 / ACTIVE MODULES</p><h2 id="skills-title" className="display-title">THE <em>TOOLSET</em><span className="text-accent">.</span></h2></Reveal>
        <div className="skills__layout">
          <Reveal delay={100} className="skills__list" role="list" aria-label="Technology modules">
            {skills.map((skill, index) => (
              <button key={skill.name} type="button" className={`skill-row ${selected === skill.name ? 'skill-row--active' : ''}`} onClick={() => setSelected(skill.name)} onFocus={() => setSelected(skill.name)} onMouseEnter={() => setSelected(skill.name)} aria-pressed={selected === skill.name} data-cursor="INTERACT">
                <span className="skill-row__number">0{index + 1}</span><span className="skill-row__name">{skill.name}</span><span className="skill-row__indicator" /><span className="skill-row__action" aria-hidden="true">{selected === skill.name ? 'ACTIVE' : 'VIEW'}</span>
              </button>
            ))}
          </Reveal>
          <Reveal delay={180} className="skills__detail" aria-live="polite">
            <div className="skills__detail-top"><span>MODULE / {skills.findIndex((skill) => skill.name === selected) + 1}</span><span className="status-live">LINKED</span></div>
            <div className="skills__glyph" aria-hidden="true"><span>{selected.slice(0, 2).toUpperCase()}</span><i /><i /><i /></div>
            <h3>{selected}</h3>
            <p>{skills.find((skill) => skill.name === selected)?.detail}</p>
            <div className="skills__bar"><span style={{ width: selected === 'React' ? '92%' : selected === 'Three.js' ? '84%' : '76%' }} /></div>
            <div className="skills__detail-foot"><span>CAPABILITY INDEX</span><span>ACTIVE</span></div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
