import { useRef } from 'react'
import { films } from '../data/content'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion'
import { Still, YtThumb } from './Media'
import { Words } from './Split'
import type { ModalVideo } from './VideoModal'

export function Cinema({ onPlay }: { onPlay: (v: ModalVideo) => void }) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.utils.toArray<HTMLElement>('.film').forEach((film) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: film, start: 'top 70%' } })
        tl.fromTo(
          film.querySelector('.film__poster'),
          { clipPath: 'inset(0 0 0 100%)' },
          { clipPath: 'inset(0 0 0 0%)', duration: 1.5, ease: 'expo.inOut' },
        )
          .from(film.querySelectorAll('.film__title .w__i'), { yPercent: 110, duration: 1.2, ease: 'expo.out', stagger: 0.06 }, 0.5)
          .from(film.querySelectorAll('.film__fade'), { opacity: 0, y: 24, duration: 1, stagger: 0.08, ease: 'power3.out' }, 0.8)

        gsap.fromTo(
          film.querySelector('.film__poster .media'),
          { scale: 1.25, yPercent: -6 },
          { scale: 1.25, yPercent: 6, ease: 'none', scrollTrigger: { trigger: film, scrub: true } },
        )
      })
    },
    { scope: ref },
  )

  return (
    <section className="cinema section" id="cinema" ref={ref}>

      <h2 className="cinema__heading display">
        Também fazemos <em>cinema.</em>
      </h2>

      {films.map((f, i) => (
        <article className={`film ${i % 2 ? 'film--rev' : ''}`} key={f.id}>
          <div
            className="film__poster"
            data-cursor={f.youtube ? 'ASSISTIR' : undefined}
            onClick={() => f.youtube && onPlay({ youtube: f.youtube, title: f.title, subtitle: f.meta })}
          >
            {f.youtube ? (
              <YtThumb id={f.youtube} alt={`Cena de ${f.title}`} />
            ) : (
              <Still label={f.poster.label} tone={5} />
            )}
          </div>

          <div className="film__body">
            <p className="film__meta film__fade">{f.meta}</p>
            <h3 className="film__title">
              <Words text={f.title} />
            </h3>
            {f.synopsis.map((s, j) => (
              <p className="film__fade" key={j}>
                {s}
              </p>
            ))}
            <div className="film__actions film__fade">
              {f.youtube && (
                <button className="btn btn--accent" onClick={() => onPlay({ youtube: f.youtube!, title: f.title, subtitle: f.meta })}>
                  <svg viewBox="0 0 10 12" aria-hidden="true">
                    <path d="M0 0v12l10-6z" />
                  </svg>
                  Assistir ao filme
                </button>
              )}
              {f.link && (
                <a className="btn" href={f.link.href} target="_blank" rel="noreferrer">
                  {f.link.label} ↗
                </a>
              )}
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}
