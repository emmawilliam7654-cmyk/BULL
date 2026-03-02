import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import bannerImg from '../assets/banner.png'
import './Hero.css'

function Hero() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const bannerY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const bannerScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  return (
    <section ref={heroRef} className="hero">
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__inner">
        <motion.div className="hero__copy" style={{ opacity: copyOpacity }}>
          <motion.p
            className="hero__kicker"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            $BULL
          </motion.p>
          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <span>The Bull.</span>
          </motion.h1>
          <motion.p
            className="hero__tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
          >
            We&apos;re gonna make it. Buy the dip. Stare at the chart. Then green. To the moon.
          </motion.p>
          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <a href="#how-to-buy" className="hero__btn hero__btn--primary">
              <span className="hero__btn-shine" aria-hidden="true" />
              Buy $BULL
            </a>
            <a href="#how-to-buy" className="hero__btn hero__btn--secondary">
              How to buy
            </a>
          </motion.div>
          <motion.div
            className="hero__meta"
            aria-label="Highlights"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <span className="hero__pill">To the moon</span>
            <span className="hero__pill">3AM charts</span>
            <span className="hero__pill">Not copium — hopium</span>
          </motion.div>
        </motion.div>
        <motion.div
          className="hero__media"
          style={{ y: bannerY, scale: bannerScale }}
        >
          <div className="hero__banner-wrap">
            <img
              src={bannerImg}
              alt="The Bull $BULL — green Wojak with money, Bitcoin and gold. We're gonna make it."
              className="hero__banner"
              width="1200"
              height="675"
              loading="eager"
              decoding="async"
            />
            <div className="hero__banner-glow" aria-hidden="true" />
          </div>
        </motion.div>
      </div>
      <motion.a
        className="hero__scroll"
        href="#how-to-buy"
        aria-label="Scroll to How to Buy"
        style={{ opacity: scrollOpacity }}
      >
        <span className="hero__scroll-icon" aria-hidden="true" />
      </motion.a>
    </section>
  )
}

export default Hero
