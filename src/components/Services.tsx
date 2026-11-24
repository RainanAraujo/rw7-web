import { useRef } from 'react'
import { services } from '../data/content'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion'
import { Footage } from './Media'

/** Faixa horizontal fixada: o scroll vertical "passa o filme" de lado. */
export function Services() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const mm = gsap.matchMedia()

      mm.add('(min-width: 900px)', () => {
        const track = ref.current!.querySelector<HTMLElement>('.services__track')!
        const distance = () => track.scrollWidth - window.innerWidth

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })

        gsap.to('.services__progress i', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            scrub: true,
          },
        })

        // parallax interno de cada vídeo
        gsap.utils.toArray<HTMLElement>('.service__media').forEach((m) => {
          gsap.fromTo(
            m,
            { xPercent: -12 },
            {
              xPercent: 12,
              ease: 'none',
              scrollTrigger: {
                trigger: m.parentElement,
                containerAnimation: tween,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            },
          )
        })
      })

      mm.add('(max-width: 899px)', () => {
        gsap.utils.toArray<HTMLElement>('.service').forEach((s) => {
          gsap.from(s, { y: 60, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: s, start: 'top 90%' } })
        })
      })
    },
    { scope: ref },
  )

  return (
    <section className="services" id="solucoes" ref={ref}>
      <div className="services__track">
        <div className="services__intro">
          <h2 className="display">
            O que a gente <em>faz.</em>
          </h2>
          <p>
            Publicidade, filmes institucionais, videoclipes, grandes eventos, campanhas e conteúdos para as telas de
            todos os tamanhos. Cada projeto tem seu próprio jeito de acontecer.
          </p>
        </div>

        {services.map((s, i) => (
          <article className="service" key={s.title}>
            <div className="service__frame">
              <div className="service__media">
                <Footage footage={s.footage} tone={i + 1} />
              </div>
              <div className="service__shade" />
              <div className="service__body">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </div>
            <div className="service__perf" aria-hidden="true" />
          </article>
        ))}
      </div>

      <div className="services__progress" aria-hidden="true">
        <i />
      </div>
    </section>
  )
}
