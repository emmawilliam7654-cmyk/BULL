import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './LoadingScreen.css'

// Bull run chart path - upward trend with volatile dips (SVG viewBox 0 0 400 180)
const CHART_PATH =
  'M 0 160 Q 30 140 50 130 T 100 100 T 150 85 T 200 70 T 250 55 T 300 45 T 350 25 T 400 5'

function LoadingScreen({ onComplete }) {
  const containerRef = useRef(null)
  const chartPathRef = useRef(null)
  const fillPathRef = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const path = chartPathRef.current
      const fill = fillPathRef.current
      const progress = progressRef.current
      const content = containerRef.current?.querySelector('.loading-screen__content')
      if (!path || !fill || !progress || !content) return

      const pathLength = path.getTotalLength()
      path.style.strokeDasharray = pathLength
      path.style.strokeDashoffset = pathLength
      gsap.set(fill, { opacity: 0 })
      gsap.set(content, { opacity: 0, y: 20 })

      const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } })

      tl.to(content, { opacity: 1, y: 0, duration: 0.5 })
        // Draw the chart line over 1.8s
        .to(path, {
        strokeDashoffset: 0,
        duration: 1.8,
        ease: 'power2.inOut',
      })
        .to(fill, { opacity: 0.6, duration: 0.5 }, '-=0.6')
        // Progress bar
        .to(progress, { scaleX: 1, duration: 0.5 }, '-=0.8')
        // Hold then fade out
        .to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.in',
          onComplete: () => onComplete?.(),
        })
    }, containerRef)

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div className="loading-screen" ref={containerRef} aria-live="polite" aria-busy="true">
      <div className="loading-screen__noise" aria-hidden="true" />
      <div className="loading-screen__grid" aria-hidden="true" />
      <div className="loading-screen__content">
        <div className="loading-screen__chart-wrap">
          <svg
            className="loading-screen__chart"
            viewBox="0 0 400 180"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
              </linearGradient>
              <filter id="chartGlow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Area fill (same path, closed at bottom) */}
            <path
              ref={fillPathRef}
              className="loading-screen__chart-fill"
              d="M 0 160 Q 30 140 50 130 T 100 100 T 150 85 T 200 70 T 250 55 T 300 45 T 350 25 T 400 5 L 400 180 L 0 180 Z"
              fill="url(#chartGrad)"
            />
            <path
              ref={chartPathRef}
              className="loading-screen__chart-line"
              d={CHART_PATH}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#chartGlow)"
            />
          </svg>
        </div>
        <h2 className="loading-screen__title">THE BULL</h2>
        <p className="loading-screen__tagline">Bull run incoming…</p>
        <div className="loading-screen__progress-wrap">
          <div className="loading-screen__progress" ref={progressRef} />
        </div>
      </div>
      <div className="loading-screen__candles" aria-hidden="true">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="loading-screen__candle"
            style={{ '--i': i, '--h': 30 + Math.random() * 70 }}
          />
        ))}
      </div>
    </div>
  )
}

export default LoadingScreen
