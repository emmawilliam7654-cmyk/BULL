import { motion } from 'motion/react'
import './Features.css'

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 20,
      mass: 0.8,
      delay,
    },
  },
})

function Features() {
  return (
    <section id="features" className="features" aria-labelledby="features-title">
      <div className="features__scanlines" aria-hidden="true" />
      <div className="features__vignette" aria-hidden="true" />
      <div className="features__glow" aria-hidden="true" />
      <div className="features__inner">
        <motion.div
          className="features__header"
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px', amount: 0.3 }}
        >
          <h2 id="features-title" className="features__heading">
            <span className="features__heading-text">Why The Bull?</span>
          </h2>
          <p className="features__sub">
            Everyone needs a bull run.
          </p>
        </motion.div>

        <motion.div
          className="features__blurb"
          variants={fadeUp(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px', amount: 0.2 }}
        >
          <p className="features__blurb-text">
            Born from the void. Staring at the chart at 3AM. Everything&apos;s fine. The only hopium that isn&apos;t copium — <em className="ticker">$BULL</em>.
          </p>
          <p className="features__blurb-text">
            Late night drives. Lo-fi in the background. One more refresh. &quot;It&apos;s not a loss if you don&apos;t sell.&quot; We&apos;re all gonna make it. Maybe.
          </p>
        </motion.div>

        <motion.div
          className="features__spotlight"
          variants={fadeUp(0.16)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px', amount: 0.2 }}
        >
          <p className="features__spotlight-line">The void stares back. Then it goes green.</p>
          <p className="features__spotlight-tag">— <span className="ticker">$BULL</span>. No promises. Just vibes.</p>
        </motion.div>
      </div>
    </section>
  )
}

export default Features
