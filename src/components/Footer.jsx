import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from '../context/ThemeContext.jsx'
import './Footer.css'

gsap.registerPlugin(ScrollTrigger)

const LOGO_FILTER = {
  dark: 'blur(0px) drop-shadow(0 0 40px rgba(0,255,65,0.6))',
  light: 'blur(0px) drop-shadow(0 1px 2px rgba(5,150,105,0.28)) drop-shadow(0 2px 4px rgba(5,150,105,0.16))',
}

function Footer() {
  const { theme } = useTheme()
  const footerRef = useRef(null)
  const logoRef = useRef(null)
  const taglineRef = useRef(null)

  useEffect(() => {
    const footer = footerRef.current
    const logo = logoRef.current
    const tagline = taglineRef.current
    if (!footer || !logo) return

    const logoFilter = LOGO_FILTER[theme] || LOGO_FILTER.dark

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footer,
        start: 'top 85%',
        end: 'top 25%',
        scrub: 1.5,
      },
    })

    tl.fromTo(
      logo,
      {
        opacity: 0,
        scale: 0.5,
        y: 200,
        filter: 'blur(25px)',
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: logoFilter,
        ease: 'power3.out',
      }
    )

    if (tagline) {
      tl.fromTo(
        tagline,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, ease: 'power2.out' },
        '-=0.4'
      )
    }

    return () => tl.scrollTrigger?.kill()
  }, [theme])

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer__bg" aria-hidden="true">
        <div className="footer__bg-glow footer__bg-glow--1" />
        <div className="footer__bg-glow footer__bg-glow--2" />
        <div className="footer__bg-glow footer__bg-glow--3" />
        <div className="footer__bg-grid" />
        <div className="footer__bg-rays" />
        <div className="footer__bg-shine" />
        <div className="footer__bg-noise" />
      </div>
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__logo footer__logo--animate" ref={logoRef}>
            THE BULL
          </span>
          <p className="footer__tagline" ref={taglineRef}>
            We&apos;re gonna make it.
          </p>
          <p className="footer__copyright">
            © {new Date().getFullYear()} The Bull. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
