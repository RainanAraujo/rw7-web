import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

let lenis: Lenis | null = null

export function initSmoothScroll() {
  if (lenis || prefersReducedMotion()) return lenis
  lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((t) => lenis?.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
  return lenis
}

export function getLenis() {
  return lenis
}

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) })
  else el.scrollIntoView({ behavior: 'smooth' })
}

export function lockScroll(locked: boolean) {
  if (lenis) (locked ? lenis.stop() : lenis.start())
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}

export { gsap, ScrollTrigger, useGSAP }
