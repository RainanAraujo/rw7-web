import { useEffect, useState } from 'react'
import { initSmoothScroll, ScrollTrigger } from './lib/motion'
import { Preloader } from './components/Preloader'
import { FilmOverlay, Cursor } from './components/Overlays'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Services } from './components/Services'
import { Statement } from './components/Statement'
import { Director } from './components/Director'
import { Works } from './components/Works'
import { Recognition } from './components/Recognition'
import { Cinema } from './components/Cinema'
import { Clients } from './components/Clients'
import { Contact } from './components/Contact'
import { VideoModal, type ModalVideo } from './components/VideoModal'

export default function App() {
  const [revealed, setRevealed] = useState(false) // cortina começou a abrir → hero anima
  const [loaded, setLoaded] = useState(false) // cortina terminou → remove o preloader
  const [video, setVideo] = useState<ModalVideo | null>(null)

  useEffect(() => {
    initSmoothScroll()
    // recalcula posições quando fontes/imagens terminam de carregar
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    window.addEventListener('load', () => ScrollTrigger.refresh())
  }, [])

  return (
    <>
      {!loaded && <Preloader onReveal={() => setRevealed(true)} onDone={() => setLoaded(true)} />}
      <FilmOverlay />
      <Cursor />
      <Nav />
      <main>
        <Hero ready={revealed} />
        <About />
        <Services />
        <Statement />
        <Director />
        <Works onPlay={setVideo} />
        <Recognition />
        <Cinema onPlay={setVideo} />
        <Clients />
        <Contact />
      </main>
      <VideoModal video={video} onClose={() => setVideo(null)} />
    </>
  )
}
