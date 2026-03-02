import bannerImg from '../assets/banner.png'
import './Hero.css'

function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__inner">
        <div className="hero__copy">
          <p className="hero__kicker">
           
          $BULL
          </p>
          <h1 className="hero__title">
            The Bull. 
          </h1>
          <p className="hero__tagline">
         Buy the dip. Late night charts. Staring at the void. Then green.
          </p>
          <div className="hero__actions">
            <a href="#how-to-buy" className="hero__btn hero__btn--primary">
              Buy $BULL
            </a>
            <a href="#how-to-buy" className="hero__btn hero__btn--secondary">
              How to buy
            </a>
          </div>
          <div className="hero__meta" aria-label="Highlights">
            <span className="hero__pill">No promises</span>
            <span className="hero__pill">3AM charts</span>
            <span className="hero__pill">It&apos;s not copium</span>
          </div>
        </div>
        <div className="hero__media">
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
        </div>
      </div>
      <a className="hero__scroll" href="#how-to-buy" aria-label="Scroll to How to Buy">
        <span className="hero__scroll-icon" aria-hidden="true" />
      </a>
    </section>
  )
}

export default Hero
