import React from 'react';
import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import ServicesOverview from './components/ServicesOverview';
import WhyAiolos from './components/WhyAiolos';
import FlagshipProjects from './components/FlagshipProjects';
import Testimonials from './components/Testimonials';
import CTABanner from './components/CTABanner';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <HeroSection />
      <ServicesOverview />
      <WhyAiolos />
      <FlagshipProjects />
      <Testimonials />
      <CTABanner />
      <Footer />
    </div>
  );
}

export default App; 