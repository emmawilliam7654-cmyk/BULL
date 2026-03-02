import Nav from './components/Nav.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Hero from './components/Hero.jsx'
import Features from './components/Features.jsx'
import Tokenomics from './components/Tokenomics.jsx'
import HowToBuy from './components/HowToBuy.jsx'
import Gallery from './components/Gallery.jsx'
import Footer from './components/Footer.jsx'
import SectionDivider from './components/SectionDivider.jsx'
import './App.css'

function App() {
  return (
    <div className="app">
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <SectionDivider />
        <Features />
        <Tokenomics />
        <HowToBuy />
        <Gallery />
        <SectionDivider />
      </main>
      <Footer />
    </div>
  )
}

export default App
