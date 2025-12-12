// src/components/Header/Header.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import classes from './Header.module.css';

export default function Header() {
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
                    Каталог
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