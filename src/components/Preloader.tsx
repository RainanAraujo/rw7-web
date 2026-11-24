import { useRef, useState } from 'react'
import { gsap, useGSAP, prefersReducedMotion, lockScroll } from '../lib/motion'

/**
 * Contagem regressiva estilo "film leader" (3, 2, 1) antes do site abrir.
 * - onReveal: dispara quando a cortina COMEÇA a abrir (hero anima junto)
 * - onDone: dispara quando terminou (preloader sai do DOM)
 */
export function Preloader({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const [n, setN] = useState(3)

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        onReveal()
        onDone()
        return
      }
      lockScroll(true)
      const sweep = ref.current!.querySelector('.leader__sweep')
      const tl = gsap.timeline({
        onComplete: () => {
          lockScroll(false)
          onDone()
        },
      })
      ;[3, 2, 1].forEach((num) => {
        tl.call(() => setN(num))
        tl.fromTo(sweep, { '--a': '0deg' }, { '--a': '360deg', duration: 0.62, ease: 'none' })
      })
      tl.to('.leader__inner', { opacity: 0, duration: 0.15 })
        .fromTo('.leader__logo', { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out' })
        .to('.leader__logo', { opacity: 0, duration: 0.3 }, '+=0.35')
        .to('.leader__flash', { opacity: 1, duration: 0.06 })
        .call(onReveal)
        .to('.leader__flash', { opacity: 0, duration: 0.25 })
        .to(ref.current, { clipPath: 'inset(50% 0% 50% 0%)', duration: 0.9, ease: 'expo.inOut' }, '<')
    },
    { scope: ref },
  )

  return (
    <div className="leader" ref={ref} aria-hidden="true">
      <div className="leader__inner">
        <div className="leader__cross leader__cross--h" />
        <div className="leader__cross leader__cross--v" />
        <div className="leader__sweep" />
        <div className="leader__ring" />
        <div className="leader__ring leader__ring--2" />
        <span className="leader__num">{n}</span>
      </div>
      <img className="leader__logo" src="/brand/logo-rw7.webp" alt="" width={640} height={630} fetchPriority="high" />
      <div className="leader__flash" />
    </div>
  )
}
