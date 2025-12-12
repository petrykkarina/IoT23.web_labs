import React from 'react';
import classes from './HeroSection.module.css';

import HeroImage from '../../assets/hero-gadgets.jpg'; 

const SHOP_HEADING = 'GadgetNew — Майбутнє, Яке Ти Обираєш';
const SHOP_DESCRIPTION = 'Преміальна техніка та інноваційні гаджети, створені для тих, хто цінує стиль, швидкість і бездоганний досвід. Обирай нову еру технологій — сьогодні.';


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