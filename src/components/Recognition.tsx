import { useRef } from 'react'
import { recognition } from '../data/content'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion'
import { Still } from './Media'

/** Seção visual: letreiros gigantes dos programas + colagem de bastidores em parallax. */
export function Recognition() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.utils.toArray<HTMLElement>('.marquee__row').forEach((row, i) => {
        const dir = i % 2 === 0 ? -1 : 1
        gsap.fromTo(
          row,
          { xPercent: dir === -1 ? 0 : -30 },
          {
            xPercent: dir === -1 ? -30 : 0,
            ease: 'none',
            scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })

      gsap.utils.toArray<HTMLElement>('.collage__item').forEach((el) => {
        const speed = Number(el.dataset.speed ?? 1)
        gsap.fromTo(
          el,
          { y: 120 * speed },
          {
            y: -120 * speed,
            ease: 'none',
            scrollTrigger: { trigger: '.collage', start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
        gsap.from(el, {
          clipPath: 'inset(50% 50% 50% 50%)',
          duration: 1.4,
          ease: 'expo.inOut',
          scrollTrigger: { trigger: el, start: 'top 95%' },
        })
      })

      gsap.from('.recognition__center > *', {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.recognition__center', start: 'top 80%' },
      })
    },
    { scope: ref },
  )

  const row = [...recognition.shows, ...recognition.shows]
  const speeds = [0.6, 1.4, 0.9, 1.8, 0.7, 1.2]

  return (
    <section className="recognition" ref={ref} aria-labelledby="recognition-title">
      <div className="marquee" aria-hidden="true">
        {[0, 1].map((r) => (
          <div className="marquee__row" key={r}>
            {row.map((s, i) => (
              <span key={i} className={i % 2 ? 'is-outline' : ''}>
                {s} <i>●</i>
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="collage">
        {recognition.stills.map((s, i) => (
          <figure className={`collage__item collage__item--${i}`} data-speed={speeds[i]} key={s.label}>
            <Still label={s.label} tone={i} />
          </figure>
        ))}

        <div className="recognition__center">
          <h2 id="recognition-title" className="display">
            {recognition.title}
          </h2>
          <p>{recognition.text}</p>
          <p className="recognition__punch">{recognition.punch}</p>
        </div>
      </div>
    </section>
  )
}
