import { MagneticButton } from './MagneticButton'

export function Footer() {
  return (
    <footer id="footer" className="footer section-dark" aria-labelledby="footer-title">
      <div className="footer__skyline" aria-hidden="true"><span /><span /><span /><span /><span /><span /><span /></div>
      <div className="content-width footer__content">
        <div className="footer__status"><span className="status-dot" /> CORE ONLINE<span className="footer__status-line" /><span>SYSTEM READY</span></div>
        <h2 id="footer-title" className="footer__title">OUR<br /><em>PORTFOLIO</em><span className="text-accent">.</span></h2>
        <div className="footer__identity"><div><span className="eyebrow">PROFILE</span><strong>GERSHON S</strong></div><div><span className="eyebrow">DISCIPLINE</span><strong>FULL STACK DEVELOPER</strong></div><div><span className="eyebrow">ORIGIN</span><strong>CHENNAI / INDIA</strong></div></div>
        <div className="footer__bottom"><span>© 2026 OUR PORTFOLIO</span><MagneticButton href="#home" className="footer__back" data-cursor="AWAKEN">RETURN TO REALM <span aria-hidden="true">↑</span></MagneticButton><span>POWER / 87%</span></div>
      </div>
    </footer>
  )
}
