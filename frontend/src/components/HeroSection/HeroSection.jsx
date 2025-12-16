import React from 'react';
import classes from './HeroSection.module.css';

import HeroImage from '../../assets/hero-gadgets.jpg';

const SHOP_HEADING = 'GadgetNew — The Future You Choose';
const SHOP_DESCRIPTION = 'Premium tech and innovative gadgets, crafted for those who value style, speed, and flawless experience. Choose the new era of technology — today.';

export default function HeroSection() {
  return (
    <section className={classes.hero}>
      <div className={classes.imageBox}>
        <img
          src={HeroImage}
          alt="Premium Gadgets Selection"
          className={classes.heroImage}
        />
      </div>
      <div className={classes.content}>
        <h2 className={classes.heading}>{SHOP_HEADING}</h2>
        <p className={classes.text}>{SHOP_DESCRIPTION}</p>
      </div>
    </section>
  );
}
