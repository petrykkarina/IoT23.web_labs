import React from 'react';
import HeroSection from '../../components/HeroSection/HeroSection';
import './Home.css';
import HeroBanner from '../../assets/banners/hero-banner.jpg';

export default function Home() {
  return (
    <div className="home-container">
      {/* Hero Banner */}
      <div className="heroBanner">
        <img src={HeroBanner} alt="Tech Gadgets Banner" className="bannerImage" />
      </div>

      <HeroSection />

      {/* About Section */}
      <section className="about-section">
        <h2>Welcome to GadgetNew!</h2>
        <p>Click on &quot;Catalog&quot; to browse all our products, use search and filter options.</p>
      </section>
    </div>
  );
}
