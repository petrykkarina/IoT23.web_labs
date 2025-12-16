import React from 'react';
import classes from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={classes.footer}>
      © {new Date().getFullYear()} GadgetNew — Petryk.K.
    </footer>
  );
}
