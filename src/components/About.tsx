import { useRef } from 'react'
import { about } from '../data/content'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion'
import { Words } from './Split'

export function About() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      // as palavras "acendem" conforme o scroll, como uma legenda sendo escrita
      gsap.fromTo(
        '.about__lead .w__i',
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: { trigger: '.about__lead', start: 'top 80%', end: 'bottom 45%', scrub: true },
        },
      )
      gsap.utils.toArray<HTMLElement>('.about__p').forEach((p) => {
        gsap.from(p, {
          y: 40,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: p, start: 'top 88%' },
        })
      })
      gsap.from('.about__pillars li', {
        yPercent: 100,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.about__pillars', start: 'top 85%' },
      })
    },
    { scope: ref },
  )

  return (
    <section className="about section" id="sobre" ref={ref}>

      <p className="about__lead">
        <Words text={about.lead} />
      </p>

      <div className="about__grid">
        {about.paragraphs.map((p, i) => (
          <p className="about__p" key={i}>
            {p}
          </p>
        ))}
      </div>

      <ul className="about__pillars">
        {about.pillars.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </section>
  )
}
