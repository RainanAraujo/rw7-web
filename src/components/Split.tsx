import { Fragment } from 'react'

/** Quebra texto em palavras com máscara, para animações de revelação. */
export function Words({ text, className = '' }: { text: string; className?: string }) {
  const words = text.split(' ')
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className={`w ${className}`}>
            <span className="w__i">{w}</span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </>
  )
}
