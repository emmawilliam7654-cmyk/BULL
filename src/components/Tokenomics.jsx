import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import './Tokenomics.css'

const CONTRACT_ADDRESS = '' // Add your contract address at launch

function Tokenomics() {
  const [copied, setCopied] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const handleCopy = async () => {
    if (!CONTRACT_ADDRESS) return
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS)
      setCopied(true)
      setShowToast(true)
      setTimeout(() => {
        setCopied(false)
        setShowToast(false)
      }, 2200)
    } catch {
      const input = document.createElement('input')
      input.value = CONTRACT_ADDRESS
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      setCopied(true)
      setShowToast(true)
      setTimeout(() => {
        setCopied(false)
        setShowToast(false)
      }, 2200)
    }
  }

  const hasAddress = Boolean(CONTRACT_ADDRESS.trim())

  return (
    <section id="tokenomics" className="tokenomics">
      <div className="tokenomics__inner">
        <motion.div
          className="tokenomics__hero-text"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px', amount: 0.3 }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 24,
          }}
        >
          <span className="tokenomics__tagline">Simple. Fair. No surprises.</span>
        </motion.div>

        <motion.div
          className="tokenomics__ca-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px', amount: 0.2 }}
          transition={{
            type: 'spring',
            stiffness: 90,
            damping: 22,
            delay: 0.08,
          }}
        >
          <div className="tokenomics__ca-glow" aria-hidden="true" />
          <div className="tokenomics__ca-content">
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
        </motion.div>
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div
            className="tokenomics__toast"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            <span className="tokenomics__toast-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            Copied
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Tokenomics
