import { useEffect, useState } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { MagneticButton } from './MagneticButton'

const navItems = [
  { label: 'ABOUT', href: '#about' },
  { label: 'SYSTEM', href: '#system' },
  { label: 'WORK', href: '#work' },
]

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isMobile = useMediaQuery('(max-width: 767px)')
  const menuIsOpen = isMobile && menuOpen

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuIsOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuIsOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${menuIsOpen ? 'navbar--open' : ''}`}>
        <a className="navbar__brand" href="#home" onClick={closeMenu} aria-label="Our portfolio home">
          <span className="navbar__brand-mark" aria-hidden="true" />
          <span>OUR</span>
        </a>
        <nav className="navbar__links" aria-label="Primary navigation">
          {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <div className="navbar__actions">
          <span className="navbar__status"><i /> CORE ONLINE</span>
          <button
            className="navbar__menu"
            type="button"
            aria-expanded={menuIsOpen}
            aria-controls="realm-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span>{menuIsOpen ? 'CLOSE' : 'MENU'}</span>
            <span className="navbar__menu-icon" aria-hidden="true"><i /><i /></span>
          </button>
        </div>
      </header>
      <div id="realm-menu" className={`mobile-menu ${menuIsOpen ? 'mobile-menu--open' : ''}`} aria-hidden={!menuIsOpen}>
        <div className="mobile-menu__inner">
          <p className="eyebrow">SYS / 001 — NAVIGATION CHANNEL</p>
          <nav aria-label="Mobile navigation">
            {navItems.map((item, index) => <a key={item.href} href={item.href} onClick={closeMenu}><small>0{index + 1}</small>{item.label}</a>)}
          </nav>
          <MagneticButton href="#contact" onClick={closeMenu} className="mobile-menu__cta">ENTER THE CORE</MagneticButton>
          <div className="mobile-menu__footer"><span>GERSHON S</span><span>CHENNAI / INDIA</span></div>
        </div>
      </div>
    </>
  )
}
