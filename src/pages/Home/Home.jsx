import React from 'react';
import HeroSection from '../../components/HeroSection/HeroSection';
import './Home.css';
import HeroBanner from '../../assets/banners/hero-banner.jpg';

export default function Home() {
    return (
        <div className="home-container">

            {/* БАНЕР З ГАДЖЕТАМИ */}
            <div className="heroBanner">
                <img src={HeroBanner} alt="Tech Gadgets Banner" className="bannerImage" />
            </div>

            <HeroSection />

            {/* Додаткова інформація про сайт */}
            <section className="about-section">
                <h2>Welcome to GadgetNew!</h2>
                <p>Натисніть на "Каталог", щоб переглянути всі наші товари, скористатися пошуком та фільтрацією.</p>
            </section>

        </div>
    );
}
