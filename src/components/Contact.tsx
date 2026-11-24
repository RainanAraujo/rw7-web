import { useRef } from 'react'
import { contact, director } from '../data/content'
import { gsap, useGSAP, prefersReducedMotion, scrollToId } from '../lib/motion'
import { Logo } from './Nav'
import { Words } from './Split'

export function Contact() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.fromTo(
        '.contact__headline .w__i',
        { opacity: 0.1 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: { trigger: '.contact__headline', start: 'top 80%', end: 'bottom 50%', scrub: true },
        },
      )
      gsap.from('.contact__fade', {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.contact__cards', start: 'top 90%' },
      })
      // créditos finais sobem como no fim de um filme
      gsap.from('.credits__roll > *', {
        y: 80,
        opacity: 0,
        stagger: 0.12,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.credits', start: 'top 85%' },
      })
    },
    { scope: ref },
  )

  return (
    <section className="contact section" id="contato" ref={ref}>

      <p className="contact__pre">{contact.pre}</p>
      <h2 className="contact__headline">
        <Words text={contact.headline} />
      </h2>

      <div className="contact__cards">
        <a className="contact__card contact__fade" href={contact.whatsapp} target="_blank" rel="noreferrer">
          <span className="label">WhatsApp</span>
          <strong>{contact.phone}</strong>
          <span className="contact__arrow">↗</span>
        </a>
        <a className="contact__card contact__fade" href={`mailto:${contact.email}`}>
          <span className="label">E-mail</span>
          <strong>{contact.email}</strong>
          <span className="contact__arrow">↗</span>
        </a>
        <div className="contact__card contact__fade">
          <span className="label">Base</span>
          <strong>{contact.city}</strong>
          <span className="contact__socials">
            {contact.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
          </span>
        </div>
      </div>

      <footer className="credits">
        <div className="credits__roll">
          <p className="label">Uma produção</p>
          <Logo className="logo--xl" variant="metal" />
          <p className="label">Direção</p>
          <p className="credits__name">{director.name}</p>
        
        </div>
        <div className="credits__bar">
          <span>© {new Date().getFullYear()} RW7 Filmes. Todos os direitos reservados.</span>
          <button onClick={() => scrollToId('top')}>Voltar ao início ↑</button>
        </div>
      </footer>
    </section>
  )
}
