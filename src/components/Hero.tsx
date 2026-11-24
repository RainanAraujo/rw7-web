import { useRef } from 'react'
import { hero } from '../data/content'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion'
import { Footage } from './Media'

export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!ready) return
      const reduce = prefersReducedMotion()

      const bar = window.innerWidth < 768 ? '7vh' : '11vh'

      // saída no scroll: a cena "fecha" (criada só depois da entrada terminar)
      const buildScroll = () => {
        if (reduce) return
        gsap
          .timeline({
            scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
          })
          .to('.hero__media', { scale: 1.25, yPercent: 12, ease: 'none' }, 0)
          .to('.hero__content', { yPercent: -30, opacity: 0, ease: 'none' }, 0)
          .to('.hero__fade', { opacity: 0, ease: 'none' }, 0)
          .to('.letterbox', { height: '24vh', ease: 'none' }, 0)
          .to('.hero__dim', { opacity: 0.85, ease: 'none' }, 0)
      }

      // entrada: as barras de letterbox abrem e o título sobe
      gsap
        .timeline({ defaults: { ease: 'expo.out' }, onComplete: buildScroll })
        .fromTo('.letterbox', { height: '50.5vh' }, { height: bar, duration: reduce ? 0 : 1.6, ease: 'expo.inOut' })
        .fromTo('.hero__media', { scale: 1.25 }, { scale: 1.05, duration: reduce ? 0 : 2.4 }, 0)
        .fromTo(
          '.hero__title .w__i',
          { yPercent: 110 },
          { yPercent: 0, duration: reduce ? 0 : 1.4, stagger: 0.08 },
          reduce ? 0 : 0.5,
        )
        .fromTo(
          '.hero__fade',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: reduce ? 0 : 1.2, stagger: 0.1 },
          reduce ? 0 : 0.9,
        )
    },
    { scope: ref, dependencies: [ready] },
  )

  return (
    <section className="hero" id="top" ref={ref} data-ready={ready}>
      <div className="hero__media">
        <Footage footage={hero.footage} tone={0} />
      </div>
      <div className="hero__dim" />
      <div className="letterbox letterbox--top" />
      <div className="letterbox letterbox--bottom" />

      <div className="hero__content">
        <h1 className="hero__title">
          {hero.title.map((line, i) => (
            <span className="w" key={i}>
              <span className="w__i">{i === hero.title.length - 1 ? <em>{line}</em> : line}</span>
            </span>
          ))}
        </h1>
        <p className="hero__sub hero__fade">{hero.sub}</p>
      </div>
    </section>
  )
}
