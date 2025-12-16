import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isAuthenticated, logout, getCurrentUser } from '../../api/auth';
import classes from './Header.module.css';

export default function Header() {
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cartItems);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const authenticated = isAuthenticated();
  const currentUser = getCurrentUser();

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className={classes.header}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h1 className={classes.logo}>GadgetNew</h1>
      </Link>
      <nav className={classes.nav}>
        {authenticated ? (
          <>
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
            <div className={classes.userSection}>
              <span className={classes.userEmail}>{currentUser?.email}</span>
              <button onClick={handleSignOut} className={classes.signOutBtn}>
                Sign Out
              </button>
            </div>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) => isActive ? `${classes.link} ${classes.active}` : classes.link}
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) => isActive ? `${classes.link} ${classes.active}` : classes.link}
            >
              Register
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
