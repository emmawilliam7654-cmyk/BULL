import './SectionDivider.css'

const MARQUEE_ITEM = '$BULL'
const MARQUEE_REPEAT = 12

function SectionDivider() {
  const items = Array.from({ length: MARQUEE_REPEAT }, () => MARQUEE_ITEM)
  return (
    <div className="section-divider" role="presentation" aria-hidden="true">
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
    </div>
  )
}

export default SectionDivider
