import { useCallback, useEffect, useState } from 'react'
import { Navbar } from './components/Navbar'
import { Loader } from './components/Loader'
import { Hero } from './components/Hero'
import { ArmorReveal } from './components/ArmorReveal'
import { About } from './components/About'
import { PowerSystem } from './components/PowerSystem'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { EngineeringChamber } from './components/EngineeringChamber'
import { Experience } from './components/Experience'
import { Reactor } from './components/Reactor'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { CustomCursor } from './components/CustomCursor'
import { useLenis } from './hooks/useLenis'
import { useReducedMotion } from './hooks/useReducedMotion'
import './styles/globals.css'

export default function App() {
  const reducedMotion = useReducedMotion()
  const [isLoading, setIsLoading] = useState(true)
  const completeLoading = useCallback(() => setIsLoading(false), [])
  useLenis(reducedMotion)

  useEffect(() => {
    document.documentElement.dataset.motion = reducedMotion ? 'reduced' : 'full'
    return () => { document.documentElement.dataset.motion = 'full' }
  }, [reducedMotion])

  return (
    <div className={`app ${reducedMotion ? 'app--reduced' : ''}`}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      {isLoading && <Loader onComplete={completeLoading} />}
      <Navbar />
      <main id="main-content">
        <Hero reducedMotion={reducedMotion} />
        <ArmorReveal reducedMotion={reducedMotion} />
        <About />
        <PowerSystem />
        <Skills />
        <Projects reducedMotion={reducedMotion} />
        <EngineeringChamber reducedMotion={reducedMotion} />
        <Experience />
        <Reactor reducedMotion={reducedMotion} />
        <Contact />
        <Footer />
      </main>
      <CustomCursor />
    </div>
  )
}
