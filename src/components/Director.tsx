import { useRef } from 'react'
import { director } from '../data/content'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion'
import { Still } from './Media'
import { Words } from './Split'

export function Director() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      gsap.from('.director__name .w__i', {
        yPercent: 110,
        stagger: 0.06,
        duration: 1.3,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.director__name', start: 'top 85%' },
      })

      // retrato: revela de baixo pra cima + parallax
      gsap.fromTo(
        '.director__portrait',
        { clipPath: 'inset(100% 0 0 0)' },
        { clipPath: 'inset(0% 0 0 0)', duration: 1.6, ease: 'expo.inOut', scrollTrigger: { trigger: '.director__portrait', start: 'top 80%' } },
      )
      gsap.fromTo(
        '.director__portrait .media',
        { yPercent: -10, scale: 1.2 },
        { yPercent: 10, scale: 1.2, ease: 'none', scrollTrigger: { trigger: '.director__portrait', scrub: true } },
      )

      gsap.from('.director__nick', {
        xPercent: 20,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })

      // linha do tempo: a linha "corre" e cada marco acende
      gsap.fromTo(
        '.timeline__line i',
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.timeline', start: 'top 70%', end: 'bottom 60%', scrub: true } },
      )
      gsap.utils.toArray<HTMLElement>('.timeline__item').forEach((item) => {
        gsap.from(item, {
          opacity: 0.15,
          x: 30,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 72%', toggleActions: 'play none none reverse' },
        })
      })
    },
    { scope: ref },
  )

  return (
    <section className="director section" id="diretor" ref={ref}>

      <div className="director__top">
        <div className="director__portrait">
          <Still label={director.portrait.label} alt={director.name} tone={4} />
        </div>

        <div className="director__intro">
          <h2 className="director__name display">
            <Words text={director.name} />
          </h2>
          <p className="director__lead">{director.intro}</p>
        </div>
      </div>

      <div className="director__nick" aria-hidden="true">
        {director.nickname} — {director.nickname} —
      </div>

      <div className="director__bottom">
        <div className="timeline">
          <div className="timeline__line" aria-hidden="true">
            <i />
          </div>
          <ol>
            {director.timeline.map((t) => (
              <li className="timeline__item" key={t.title}>
                <span className="timeline__mark">{t.mark}</span>
                <div>
                  <h3>{t.title}</h3>
                  <p>{t.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <aside className="director__outro">
          <p>{director.outro}</p>
        </aside>
      </div>
    </section>
  )
}
