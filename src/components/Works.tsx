import { useRef, useState } from 'react'
import { works, workCategories, type Work } from '../data/content'
import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion } from '../lib/motion'
import type { ModalVideo } from './VideoModal'
import { YtThumb } from './Media'

export function Works({ onPlay }: { onPlay: (v: ModalVideo) => void }) {
  const ref = useRef<HTMLElement>(null)
  const [filter, setFilter] = useState('Todos')
  const list = filter === 'Todos' ? works : works.filter((w) => w.category === filter)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from('.works__title .w__i', {
        yPercent: 110,
        duration: 1.3,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.works__title', start: 'top 85%' },
      })
    },
    { scope: ref },
  )

  // re-anima a grade sempre que o filtro muda
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const cards = gsap.utils.toArray<HTMLElement>('.work')
      gsap.set(cards, { opacity: 0, y: 60, clipPath: 'inset(0 0 100% 0)' })
      ScrollTrigger.batch(cards, {
        start: 'top 92%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.1, stagger: 0.1, ease: 'expo.out' }),
      })
      ScrollTrigger.refresh()
    },
    { scope: ref, dependencies: [filter], revertOnUpdate: true },
  )

  const play = (w: Work) => onPlay({ youtube: w.youtube, title: w.title, subtitle: w.client })

  return (
    <section className="works section" id="trabalhos" ref={ref}>

      <div className="works__top">
        <h2 className="works__title display">
          <span className="w">
            <span className="w__i">Trabalhos</span>
          </span>{' '}
          <span className="w">
            <span className="w__i">
              <em>selecionados</em>
            </span>
          </span>
        </h2>
        <div className="chips" role="tablist" aria-label="Filtrar trabalhos">
          {workCategories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={filter === c}
              className={`chip ${filter === c ? 'is-active' : ''}`}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="works__grid">
        {list.map((w, i) => (
          <button className={`work ${i === 0 ? 'work--feature' : ''}`} key={w.id} onClick={() => play(w)} data-cursor="PLAY">
            <div className="work__media">
              <YtThumb id={w.youtube} alt={w.title} />
            </div>
            <div className="work__shade" />
            <span className="work__play" aria-hidden="true">
              <svg viewBox="0 0 10 12">
                <path d="M0 0v12l10-6z" />
              </svg>
            </span>
            <div className="work__info">
              <span className="label">{w.client}</span>
              <h3>{w.title}</h3>
            </div>
            <span className="work__cat label">{w.category}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
