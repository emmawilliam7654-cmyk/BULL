import { useState } from 'react'
import './Tokenomics.css'

// Set your contract address here when ready; leave empty for "Coming Soon"
const CONTRACT_ADDRESS = ''

function Tokenomics() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!CONTRACT_ADDRESS) return
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback for older browsers
      const input = document.createElement('input')
      input.value = CONTRACT_ADDRESS
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const hasAddress = Boolean(CONTRACT_ADDRESS.trim())

  return (
    <section id="tokenomics" className="tokenomics">
      <div className="tokenomics__inner">
        <h2 className="tokenomics__heading">Tokenomics</h2>
        <p className="tokenomics__sub">Simple. Fair. No surprises.</p>
        <div className="tokenomics__ca">
          <span className="tokenomics__ca-label">Contract Address (CA)</span>
          <div className="tokenomics__ca-row">
            {hasAddress ? (
              <>
                <span className="tokenomics__ca-address" title={CONTRACT_ADDRESS}>
                  {CONTRACT_ADDRESS.slice(0, 6)}...{CONTRACT_ADDRESS.slice(-4)}
                </span>
                <button
                  type="button"
                  className={`tokenomics__ca-copy ${copied ? 'tokenomics__ca-copy--success' : ''}`}
                  onClick={handleCopy}
                  disabled={copied}
                  aria-label={copied ? 'Copied' : 'Copy contract address'}
                >
                  <span className="tokenomics__ca-copy-icon" aria-hidden="true">
                    {copied ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                    )}
                  </span>
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </>
            ) : (
              <>
                <span className="tokenomics__ca-coming-soon">Coming Soon</span>
                <button
                  type="button"
                  className="tokenomics__ca-copy tokenomics__ca-copy--disabled"
                  disabled
                  aria-label="Contract address not yet available"
                  title="Address will be available after launch"
                >
                  <span className="tokenomics__ca-copy-icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  </span>
                  Copy
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Tokenomics
