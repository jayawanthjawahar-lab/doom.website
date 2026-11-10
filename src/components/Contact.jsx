import { useState } from 'react'
import { MagneticButton } from './MagneticButton'
import { Reveal } from './Reveal'

const channels = [
  { label: 'EMAIL', value: 'YOUR_EMAIL', icon: '↗' },
  { label: 'GITHUB', value: 'YOUR_GITHUB', icon: '◈' },
  { label: 'LINKEDIN', value: 'YOUR_LINKEDIN', icon: 'in' },
]

export function Contact() {
  const [selected, setSelected] = useState(channels[0].label)

  return (
    <section id="contact" className="contact section-dark" data-cursor="ENTER" aria-labelledby="contact-title">
      <div className="contact__energy" aria-hidden="true" />
      <div className="content-width contact__layout">
        <Reveal className="contact__copy"><p className="eyebrow">12 / OPEN CHANNEL</p><h2 id="contact-title" className="display-title">LET'S<br /><em>BUILD</em><br />THE<br />FUTURE<span className="text-accent">.</span></h2><p className="body-copy">Have an idea?<br />Let's turn it into something people can interact with.</p></Reveal>
        <Reveal delay={150} className="contact__channels">
          <div className="contact__channel-head"><span>SELECT CHANNEL</span><span className="status-live">ENCRYPTED / READY</span></div>
          <div className="contact__buttons">
            {channels.map((channel) => <MagneticButton key={channel.label} href="#contact" className={`contact-button ${selected === channel.label ? 'contact-button--active' : ''}`} onClick={() => setSelected(channel.label)} data-cursor="ENTER"><span className="contact-button__icon" aria-hidden="true">{channel.icon}</span><span className="contact-button__copy"><strong>{channel.label}</strong><small>{channel.value}</small></span><span className="contact-button__arrow" aria-hidden="true">↗</span></MagneticButton>)}
          </div>
          <p className="contact__note">Personal links are intentionally left as placeholders until the final profile details are supplied.</p>
        </Reveal>
      </div>
      <div className="contact__bottom" aria-hidden="true"><span>TRANSMISSION READY</span><span>CHENNAI / INDIA</span><span>2026</span></div>
    </section>
  )
}
