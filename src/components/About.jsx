import { Reveal } from './Reveal'

export function About() {
  return (
    <section id="about" className="about section-dark" aria-labelledby="about-title">
      <div className="about__backdrop" aria-hidden="true"><span /><span /><span /><span /></div>
      <div className="content-width about__layout">
        <Reveal className="about__index"><span>03</span><i /><small>ENGINEERING<br />THE UNSEEN</small></Reveal>
        <div className="about__content">
          <Reveal><p className="eyebrow">04 / THE ENGINEER</p></Reveal>
          <Reveal delay={80}><h2 id="about-title" className="display-title">BEHIND<br /><em>THE</em><br />SYSTEM<span className="text-accent">.</span></h2></Reveal>
          <Reveal delay={150} className="about__identity"><span className="identity-mark" aria-hidden="true">GS</span><div><p className="eyebrow">IDENTITY CONFIRMED</p><h3>Gershon S</h3><p>Full stack developer / creative technologist</p></div></Reveal>
          <Reveal delay={220}><p className="body-copy about__statement">Developer focused on web development, programming, interactive experiences and modern digital products. I build systems that carry an idea from first signal to working interface.</p></Reveal>
          <Reveal delay={290} className="about__meta-grid"><div><span>LOCATION</span><strong>Chennai, India.</strong></div><div><span>FOCUS</span><strong>Web / 3D / Creative code</strong></div><div><span>CHANNEL</span><strong>Always learning</strong></div></Reveal>
        </div>
      </div>
      <div className="about__corner about__corner--left" aria-hidden="true" />
      <div className="about__corner about__corner--right" aria-hidden="true" />
    </section>
  )
}
