import { useRef } from 'react'
import { clients } from '../data/content'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion'

export function Clients() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from('.client', {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: { each: 0.07, grid: 'auto', from: 'start' },
        ease: 'power3.out',
        scrollTrigger: { trigger: '.clients__grid', start: 'top 85%' },
      })
      gsap.from('.clients__intro > *', {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.clients__intro', start: 'top 85%' },
      })
    },
    { scope: ref },
  )

  return (
    <section className="clients section" id="clientes" ref={ref}>

      <div className="clients__intro">
        <h2 className="display display--md">{clients.title}</h2>
        <div>
          <p>{clients.text}</p>
        </div>
      </div>

      <ul className="clients__grid">
        {clients.list.map((c) => (
          <li className="client" key={c.name}>
            {c.logo ? (
              <img src={c.logo} alt={c.name} loading="lazy" />
            ) : (
              <span className="client__mock" title="Logo placeholder">
                {c.name}
              </span>
            )}
            <span className="client__corner" aria-hidden="true" />
          </li>
        ))}
      </ul>
    </section>
  )
}
