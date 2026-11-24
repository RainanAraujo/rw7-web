import { useEffect, useState } from 'react'
import { nav } from '../data/content'
import { scrollToId, lockScroll } from '../lib/motion'

export function Logo({ className = '', variant = 'flat' }: { className?: string; variant?: 'flat' | 'metal' }) {
  return (
    <img
      className={`logo ${className}`}
      src={variant === 'metal' ? '/brand/logo-rw7-metal.webp' : '/brand/logo-rw7.webp'}
      alt="RW7 Filmes"
      width={variant === 'metal' ? 1200 : 640}
      height={variant === 'metal' ? 1166 : 630}
    />
  )
}

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    lockScroll(open)
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    // espera o menu fechar antes de rolar
    setTimeout(() => scrollToId(id), open ? 350 : 0)
  }

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <a
        href="#top"
        className="nav__logo"
        aria-label="RW7 Filmes — início"
        onClick={(e) => {
          e.preventDefault()
          go('top')
        }}
      >
        <Logo />
      </a>

      <nav className="nav__links" aria-label="Principal">
        {nav.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            onClick={(e) => {
              e.preventDefault()
              go(l.id)
            }}
          >
            {l.label}
          </a>
        ))}
      </nav>

      <a
        className="nav__cta"
        href="#contato"
        onClick={(e) => {
          e.preventDefault()
          go('contato')
        }}
      >
        Vamos conversar
      </a>

      <button className="nav__burger" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label="Menu">
        <span />
        <span />
      </button>

      <div className="nav__sheet" aria-hidden={!open}>
        {nav.map((l, i) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            style={{ transitionDelay: open ? `${0.08 + i * 0.05}s` : '0s' }}
            onClick={(e) => {
              e.preventDefault()
              go(l.id)
            }}
          >
            {l.label}
          </a>
        ))}
      </div>
    </header>
  )
}
