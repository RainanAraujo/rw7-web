import { useEffect, useRef } from 'react'
import { gsap, lockScroll } from '../lib/motion'

export type ModalVideo = { youtube: string; title: string; subtitle?: string }

export function VideoModal({ video, onClose }: { video: ModalVideo | null; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!video) return
    lockScroll(true)
    const el = ref.current!
    gsap.fromTo(el, { clipPath: 'inset(50% 0 50% 0)' }, { clipPath: 'inset(0% 0 0% 0)', duration: 0.8, ease: 'expo.inOut' })
    gsap.fromTo(el.querySelector('.modal__frame'), { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, delay: 0.5, duration: 0.6, ease: 'power3.out' })
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      lockScroll(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [video])

  const close = () => {
    gsap.to(ref.current, { clipPath: 'inset(50% 0 50% 0)', duration: 0.6, ease: 'expo.inOut', onComplete: onClose })
  }

  if (!video) return null

  return (
    <div className="modal" ref={ref} role="dialog" aria-modal="true" aria-label={video.title} onClick={close}>
      <div className="modal__head">
        <div>
          <p className="label">{video.subtitle}</p>
          <h3>{video.title}</h3>
        </div>
        <button className="modal__close" onClick={close} aria-label="Fechar vídeo">
          Fechar <span aria-hidden="true">✕</span>
        </button>
      </div>
      <div className="modal__frame" onClick={(e) => e.stopPropagation()}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.youtube}?autoplay=1&rel=0&modestbranding=1`}
          title={video.title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    </div>
  )
}
