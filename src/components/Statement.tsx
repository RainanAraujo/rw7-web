import { useRef } from 'react'
import { statement } from '../data/content'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion'
import { Footage } from './Media'

/** Vídeo que cresce de uma janela pequena até tela cheia, com frases em sequência. */
export function Statement() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: 'top top', end: '+=260%', pin: true, scrub: 1 },
      })
      tl.fromTo(
        '.statement__window',
        { clipPath: 'inset(28% 32% 28% 32% round 6px)' },
        { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'power2.inOut', duration: 1.2 },
      )
        .fromTo('.statement__window .media', { scale: 1.35 }, { scale: 1, ease: 'power2.inOut', duration: 1.2 }, 0)
        .from('.statement__line--0', { opacity: 0, y: 40, duration: 0.4 }, 0.6)
        .to('.statement__line--0', { opacity: 0, y: -40, duration: 0.4 }, 1.3)
        .from('.statement__line--1', { opacity: 0, y: 40, duration: 0.4 }, 1.5)
        .to('.statement__line--1', { opacity: 0, y: -40, duration: 0.4 }, 2.2)
        .to('.statement__dim', { opacity: 0.8, duration: 0.6 }, 2.2)
        .from('.statement__quote', { opacity: 0, y: 30, duration: 0.4 }, 2.4)
        .from('.statement__punch', { opacity: 0, scale: 1.3, filter: 'blur(12px)', duration: 0.5 }, 2.8)
        .to({}, { duration: 0.4 })
    },
    { scope: ref },
  )

  return (
    <section className="statement" ref={ref} aria-label="Manifesto">
      <div className="statement__window">
        <Footage footage={statement.footage} tone={3} />
        <div className="statement__dim" />
      </div>
      <div className="statement__text">
        {statement.lines.map((l, i) => (
          <p key={i} className={`statement__line statement__line--${i}`}>
            {l}
          </p>
        ))}
        <div className="statement__final">
          <p className="statement__quote">{statement.quote}</p>
          <p className="statement__punch">{statement.punch}</p>
        </div>
      </div>
    </section>
  )
}
