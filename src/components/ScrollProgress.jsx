import { motion, useScroll, useSpring } from 'motion/react'
import './ScrollProgress.css'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <div className="scroll-progress" aria-hidden="true">
      <motion.div
        className="scroll-progress__bar"
        style={{ scaleX }}
      />
    </div>
  )
}

export default ScrollProgress
