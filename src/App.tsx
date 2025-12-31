import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeatureShowcase from './components/FeatureShowcase'
import InteractiveDemo from './components/InteractiveDemo/InteractiveDemo'
import HowItWorks from './components/HowItWorks'
import IndustryUseCases from './components/IndustryUseCases'
import TestimonialsCarousel from './components/TestimonialsCarousel'
import ROICalculator from './components/ROICalculator'
import LiveStatsCounter from './components/LiveStatsCounter'
import SecurityCompliance from './components/SecurityCompliance'
import IntegrationShowcase from './components/IntegrationShowcase'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import CTA from './components/CTA'
import Footer from './components/Footer'
import AIChatbot from './components/AIChatbot'

function App() {
  const [showDemoSidebar, setShowDemoSidebar] = useState(false)

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth'

    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  return (
    <div className="app">
      <Navbar
        showDemoSidebar={showDemoSidebar}
        setShowDemoSidebar={setShowDemoSidebar}
      />
      <Hero />
      <FeatureShowcase />
      <IndustryUseCases />
      <InteractiveDemo
        showDemoSidebar={showDemoSidebar}
        setShowDemoSidebar={setShowDemoSidebar}
      />
      <HowItWorks />
      <TestimonialsCarousel />
      <ROICalculator />
      <LiveStatsCounter />
      <SecurityCompliance />
      <IntegrationShowcase />
      <Pricing />
      <FAQ />
      <Contact />
      <CTA />
      <Footer />
      <AIChatbot />
    </div>
  )
}

export default App
