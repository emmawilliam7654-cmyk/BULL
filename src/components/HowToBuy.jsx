import { useEffect, useState } from 'react'
import './HowToBuy.css'

const steps = [
  {
    num: '01',
    title: 'Get a wallet',
    text: 'Phantom or any wallet that supports the chain.',
    cmd: 'WALLET_INIT',
  },
  {
    num: '02',
    title: 'Grab some SOL',
    text: 'You need gas to swap. Get native token on your chain.',
    cmd: 'FUEL_ACQUIRE',
  },
  {
    num: '03',
    title: 'Swap for $BULL',
    text: 'Head to the DEX, paste the contract, and send it.',
    cmd: 'SWAP_EXEC',
  },
]

const SUBTITLE = 'Three steps. No hopium. Just $BULL.'
const TYPEWRITER_SPEED = 55
const CURSOR_BLINK_MS = 520

function HowToBuy() {
  const [visible, setVisible] = useState(false)
  const [subtitleIndex, setSubtitleIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true)
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )
    const el = document.querySelector('.howtobuy')
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  /* Typewriter: when section is visible, reveal subtitle char by char */
  useEffect(() => {
    if (!visible || subtitleIndex >= SUBTITLE.length) return
    const t = setTimeout(() => setSubtitleIndex((i) => i + 1), TYPEWRITER_SPEED)
    return () => clearTimeout(t)
  }, [visible, subtitleIndex])

  /* Cursor blink */
  useEffect(() => {
    const id = setInterval(() => setShowCursor((c) => !c), CURSOR_BLINK_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="how-to-buy" className="howtobuy" aria-labelledby="howtobuy-title">
      <div className="howtobuy__scanlines" aria-hidden="true" />
      <div className="howtobuy__vignette" aria-hidden="true" />
      <div className="howtobuy__inner">
        <div className="howtobuy__header">
          <h2 id="howtobuy-title" className="howtobuy__heading">
            <span className="howtobuy__heading-text">How to Buy</span>
          </h2>
          <p className="howtobuy__sub">
            <span className="howtobuy__sub-inner">
              {SUBTITLE.slice(0, subtitleIndex)}
              <span
                className="howtobuy__cursor"
                aria-hidden="true"
                style={{ opacity: showCursor ? 1 : 0 }}
              >
                _
              </span>
            </span>
          </p>
        </div>

        <div className={`howtobuy__steps ${visible ? 'howtobuy__steps--visible' : ''}`}>
          {steps.map((step, i) => (
            <article
              key={step.num}
              className="howtobuy__card"
              style={{ '--i': i }}
            >
              <div className="howtobuy__card-glow" aria-hidden="true" />
              <span className="howtobuy__prompt" aria-hidden="true">
                STEP_{step.num}&gt;
              </span>
              <span className="howtobuy__num" aria-hidden="true">
                {step.num}
              </span>
              <h3 className="howtobuy__title">{step.title}</h3>
              <p className="howtobuy__text">{step.text}</p>
              {i < steps.length - 1 && (
                <span className="howtobuy__connector" aria-hidden="true">
                  <span className="howtobuy__connector-dot" />
                </span>
              )}
            </article>
          ))}
        </div>

        <p className="howtobuy__footer-line">
          <span className="howtobuy__footer-prompt">&gt;</span> no_hopium.exe — running
        </p>
      </div>
    </section>
  )
}

export default HowToBuy
