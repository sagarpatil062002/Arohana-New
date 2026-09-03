// src/components/Navbar.tsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMenu = () => setMobileOpen(false);

  return (
    <>
      <header className="site-navbar">
        <div className="site-navbar-container">
          {/* Logo */}
          <NavLink to="/" className="brand-logo-link" onClick={closeMenu} aria-label="Ārohana Consultancy Home">
            <span className="brand-monogram-symbol">Ā</span>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="brand-title-text">ĀROHANA</span>
              <span className="font-mono" style={{ fontSize: '8px', letterSpacing: '0.24em', color: '#C5A46D' }}>
                CONSULTANCY
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav-links" aria-label="Primary Navigation">
            <NavLink
              to="/work"
              className={({ isActive }) => `desktop-nav-item ${isActive ? 'active' : ''}`}
            >
              Work
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => `desktop-nav-item ${isActive ? 'active' : ''}`}
            >
              About
            </NavLink>
            <NavLink
              to="/services"
              className={({ isActive }) => `desktop-nav-item ${isActive ? 'active' : ''}`}
            >
              Services
            </NavLink>
            <NavLink
              to="/army-projects"
              className={({ isActive }) => `desktop-nav-item ${isActive ? 'active' : ''}`}
            >
              Army Projects
            </NavLink>
            <NavLink
              to="/tourin"
              className={({ isActive }) => `desktop-nav-item ${isActive ? 'active' : ''}`}
            >
              Tourin
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) => `desktop-nav-item ${isActive ? 'active' : ''}`}
            >
              Contact
            </NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileOpen}
          >
            <span>{mobileOpen ? 'CLOSE' : 'MENU'}</span>
            <span style={{ color: '#C5A46D' }}>{mobileOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer ${mobileOpen ? 'open' : ''}`}>
        <div style={{ marginBottom: '2rem' }}>
          <span className="font-mono" style={{ fontSize: '10px', letterSpacing: '0.24em', color: '#C5A46D', textTransform: 'uppercase', display: 'block', marginBottom: '1.5rem' }}>
            NAVIGATION // INDEX
          </span>
          <nav className="mobile-nav-links-list">
            <NavLink to="/work" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
              <span>Work</span>
              <span className="font-mono" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>01</span>
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
              <span>About</span>
              <span className="font-mono" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>02</span>
            </NavLink>
            <NavLink to="/services" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
              <span>Services</span>
              <span className="font-mono" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>03</span>
            </NavLink>
            <NavLink to="/army-projects" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
              <span>Army Projects</span>
              <span className="font-mono" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>04</span>
            </NavLink>
            <NavLink to="/tourin" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
              <span>Tourin</span>
              <span className="font-mono" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>05</span>
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
              <span>Contact</span>
              <span className="font-mono" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>06</span>
            </NavLink>
          </nav>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span className="font-mono" style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
            ĀROHANA CONSULTANCY
          </span>
          <span className="font-mono" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>
            We build brands, businesses &amp; experiences.
          </span>
          <span className="font-mono" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>
            MUMBAI · GOA · LADAKH
          </span>
        </div>
      </div>
    </>
  );
};

export default Navbar;
