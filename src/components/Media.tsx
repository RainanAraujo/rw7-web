import { useEffect, useRef, useState } from 'react'
import type { Footage as FootageType } from '../data/content'

const MOBILE_QUERY = '(max-width: 767px) and (orientation: portrait)'

function useIsMobile() {
  const [mobile, setMobile] = useState(() => typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches)
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY)
    const on = () => setMobile(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return mobile
}

/** Usuário pediu menos movimento ou economia de dados → mostra só o poster. */
function shouldSkipVideo() {
  if (typeof window === 'undefined') return false
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
  return !!saveData || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Vídeo de fundo em loop, mudo, que só toca quando está visível.
 * - No celular em pé usa `srcMobile`/`posterMobile` (corte vertical), se existir.
 * - Senão, recorta o vídeo horizontal centrado em `focus`.
 * - Se o autoplay for bloqueado (ex.: modo economia do iPhone), fica o poster.
 * Sem `src`, renderiza um placeholder cinematográfico animado.
 */
export function Footage({
  footage,
  className = '',
  tone = 0,
}: {
  footage: FootageType
  className?: string
  /** varia a "luz" do placeholder (0–5) */
  tone?: number
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const mobile = useIsMobile()
  const src = (mobile && footage.srcMobile) || footage.src
  const poster = (mobile && footage.posterMobile) || footage.poster
  const [skip] = useState(shouldSkipVideo)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()),
      { threshold: 0.05 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [src])

  if (src && skip && poster) {
    return <img className={`media ${className}`} src={poster} alt="" style={{ objectPosition: footage.focus }} />
  }

  if (src) {
    return (
      <video
        key={src}
        ref={ref}
        className={`media ${className}`}
        src={src}
        poster={poster}
        style={{ objectPosition: footage.focus }}
        muted
        loop
        playsInline
        autoPlay
        preload={footage.srcMobile || !mobile ? 'auto' : 'metadata'}
        disablePictureInPicture
        aria-hidden="true"
      />
    )
  }

  return <MockFrame label={footage.label} kind="video" tone={tone} className={className} />
}

/** Imagem estática — mock se não tiver `src`. */
export function Still({
  src,
  label,
  alt = '',
  className = '',
  tone = 0,
}: {
  src?: string
  label: string
  alt?: string
  className?: string
  tone?: number
}) {
  if (src) return <img className={`media ${className}`} src={src} alt={alt} loading="lazy" />
  return <MockFrame label={label} kind="still" tone={tone} className={className} />
}

function MockFrame({
  label,
  kind,
  tone,
  className,
}: {
  label: string
  kind: 'video' | 'still'
  tone: number
  className: string
}) {
  return (
    <div
      className={`media mock mock--t${tone % 6} mock--${kind} ${className}`}
      data-placeholder={label}
      aria-hidden="true"
    >
    </div>
  )
}

/**
 * Thumbnail do YouTube em alta. Se o vídeo não tiver `maxresdefault`
 * (o YouTube devolve um placeholder cinza de 120px), cai para `hqdefault`.
 */
export function YtThumb({ id, alt, className = '' }: { id: string; alt: string; className?: string }) {
  const fallback = (img: HTMLImageElement) => {
    if (!img.src.includes('hqdefault')) img.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
  }
  return (
    <img
      className={`media ${className}`}
      src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
      alt={alt}
      loading="lazy"
      onLoad={(e) => e.currentTarget.naturalWidth <= 120 && fallback(e.currentTarget)}
      onError={(e) => fallback(e.currentTarget)}
    />
  )
}
