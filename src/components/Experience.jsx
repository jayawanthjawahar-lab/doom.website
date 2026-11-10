import { useState } from 'react'
import { experience } from '../data/projects'
import { Reveal } from './Reveal'

export function Experience() {
  const [active, setActive] = useState(0)

  return (
    <section id="record" className="record section-dark" aria-labelledby="record-title">
      <div className="content-width">
        <Reveal className="section-heading section-heading--split"><div><p className="eyebrow">09 / THE RECORD</p><h2 id="record-title" className="display-title">THE<br /><em>RECORD</em><span className="text-accent">.</span></h2></div><p className="body-copy">A concise record of the environments, disciplines, and systems that shaped the way I build.</p></Reveal>
        <div className="record__timeline">
          <div className="record__line" aria-hidden="true"><span /></div>
          {experience.map((item, index) => (
            <Reveal key={item.organization} delay={index * 100} className={`record-item ${active === index ? 'record-item--active' : ''}`}>
              <button type="button" className="record-item__trigger" onClick={() => setActive(index)} onFocus={() => setActive(index)} onMouseEnter={() => setActive(index)} aria-expanded={active === index} data-cursor="INTERACT">
                <span className="record-item__node" aria-hidden="true" /><span className="record-item__type">{item.type}</span><span className="record-item__period">{item.period}</span><span className="record-item__toggle" aria-hidden="true">{active === index ? '−' : '+'}</span>
              </button>
              <div className="record-item__body"><h3>{item.title}</h3><p>{item.organization}</p><span>{item.location}</span></div>
            </Reveal>
          ))}
        </div>
        <div className="record__footer"><span>NO EXTRAS / ONLY THE RECORD</span><span>STATUS / IN PROGRESS</span></div>
      </div>
    </section>
  )
}
