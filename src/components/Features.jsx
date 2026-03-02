import { useEffect, useState } from 'react'
import './Features.css'

function Features() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true)
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    )
    const el = document.querySelector('.features')
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="features" className="features" aria-labelledby="features-title">
      <div className="features__scanlines" aria-hidden="true" />
      <div className="features__vignette" aria-hidden="true" />
      <div className="features__glow" aria-hidden="true" />
      <div className="features__inner">
        <div className={`features__header ${visible ? 'features__header--visible' : ''}`}>
          <h2 id="features-title" className="features__heading">
            <span className="features__heading-text">Why The Bull?</span>
          </h2>
          <p className="features__sub">
            <span className="features__sub-prompt" aria-hidden="true">&gt;</span>
            Even doomers need a bull run.
          </p>
        </div>

        <div className={`features__blurb ${visible ? 'features__blurb--visible' : ''}`}>
          <span className="features__blurb-label" aria-hidden="true">[ VOID_LOG ]</span>
          <p className="features__blurb-text">
            Born from the void. The doomer stares at the chart at 3AM. Everything&apos;s fine. The only hopium that isn&apos;t copium — <em className="ticker">$BULL</em>.
          </p>
          <p className="features__blurb-text">
            Late night drives. Lo-fi in the background. One more refresh. &quot;It&apos;s not a loss if you don&apos;t sell.&quot; We&apos;re all gonna make it. Maybe.
          </p>
        </div>

        <div className={`features__spotlight ${visible ? 'features__spotlight--visible' : ''}`}>
          <p className="features__spotlight-line">The void stares back. Then it goes green.</p>
          <p className="features__spotlight-tag">— <span className="ticker">$BULL</span>. Doomer&apos;s choice. No promises. Just vibes.</p>
        </div>
      </div>
    </section>
  )
}

export default Features
