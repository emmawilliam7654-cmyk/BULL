import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import './SectionDivider.css'

const MARQUEE_ITEM = '$BULL'
const MARQUEE_REPEAT = 12

function SectionDivider() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.75, 1, 1, 0.75])

  const items = Array.from({ length: MARQUEE_REPEAT }, () => MARQUEE_ITEM)

  return (
    <motion.div
      ref={containerRef}
      className="section-divider"
      role="presentation"
      aria-hidden="true"
      style={{ opacity }}
    >
      <div className="section-divider__marquee-wrap">
        <div className="section-divider__marquee">
          <span className="section-divider__marquee-inner">
            {items.map((ticker, i) => (
              <span key={i} className="section-divider__marquee-item">
                {ticker}
              </span>
            ))}
          </span>
          <span className="section-divider__marquee-inner" aria-hidden="true">
            {items.map((ticker, i) => (
              <span key={`dup-${i}`} className="section-divider__marquee-item">
                {ticker}
              </span>
            ))}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default SectionDivider
