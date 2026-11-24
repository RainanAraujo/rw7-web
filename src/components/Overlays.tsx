import { useEffect, useRef } from 'react'
import { gsap } from '../lib/motion'

/** Granulação de película + vinheta, fixas sobre o site inteiro. */
export function FilmOverlay() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
    </>
  )
}

/** Cursor customizado: ponto que vira "PLAY" sobre [data-cursor]. */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(hover: none)').matches) return
    document.documentElement.classList.add('has-cursor')
    const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3' })
    const label = el.querySelector('span')!

    const move = (e: PointerEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
      const target = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor], a, button')
      const text = target?.dataset.cursor ?? ''
      el.classList.toggle('is-label', !!text)
      el.classList.toggle('is-link', !!target && !text)
      if (text) label.textContent = text
    }
    const leave = () => el.classList.add('is-hidden')
    const enter = () => el.classList.remove('is-hidden')
    window.addEventListener('pointermove', move)
    document.addEventListener('mouseleave', leave)
    document.addEventListener('mouseenter', enter)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('mouseleave', leave)
      document.removeEventListener('mouseenter', enter)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [])

  return (
    <div className="cursor" ref={ref} aria-hidden="true">
      <span />
    </div>
  )
}
