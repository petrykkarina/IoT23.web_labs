// src/components/Header/Header.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classes from './Header.module.css';

export default function Header() {
  // useSelector hook - getting data from redux store
  const cartItems = useSelector(state => state.cartItems);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className={classes.header}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h1 className={classes.logo}>GadgetNew</h1>
      </Link>
      <nav className={classes.nav}>
        <NavLink
          to="/"
          className={({ isActive }) => isActive ? `${classes.link} ${classes.active}` : classes.link}
        >
          Home
        </NavLink>
        <NavLink
          to="/catalog"
          className={({ isActive }) => isActive ? `${classes.link} ${classes.active}` : classes.link}
        >
          Catalog
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) => isActive ? `${classes.link} ${classes.active}` : classes.link}
        >
          Cart
          {totalItems > 0 && (
            <span className={classes.cartBadge}>{totalItems}</span>
          )}
        </NavLink>
        <NavLink
          to="/dashboard"
          className={({ isActive }) => isActive ? `${classes.link} ${classes.active}` : classes.link}
        >
          Dashboard
        </NavLink>
      </nav>
    </header>
  );
}
