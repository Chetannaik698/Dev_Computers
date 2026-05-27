import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';
import { PHONE, PHONE_DISPLAY } from '../data/data';
import logo from '../assets/logo.png';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/products', label: 'Products' },
  { to: '/booking', label: 'Book Service' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const isAdmin = Boolean(user?.role === 'admin');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const close = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={close}>
            <img src={logo} alt="Dev Computers Logo" className="navbar-logo-img" />
          </Link>

          <div className="navbar-links">
            {links.map(l => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                {l.label}
              </NavLink>
            ))}
          </div>

          <div className="navbar-cta">
            <button 
              className="btn-theme-toggle" 
              onClick={toggleTheme} 
              aria-label="Toggle dark/light mode"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <i className={`fa-solid fa-${theme === 'dark' ? 'sun' : 'moon'}`}></i>
            </button>
            <a href={`tel:${PHONE}`} className="btn-nav-call">
              <i className="fa-solid fa-phone"></i> {PHONE_DISPLAY}
            </a>
            <Link to="/booking" className="btn-nav-book">
              <i className="fa-solid fa-calendar-check"></i> Book Now
            </Link>
            <div className="auth-dropdown">
              {user ? (
                <div style={{ position: 'relative' }}>
                  <button
                    type="button"
                    className="btn-auth-link"
                    onClick={() => setDropdownOpen(v => !v)}
                    aria-expanded={dropdownOpen}
                    style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '0', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <i className="fa-solid fa-user"></i> {user?.name || 'User'} <i className="fa-solid fa-caret-down"></i>
                  </button>
                  {dropdownOpen && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      background: 'rgba(15, 23, 44, 0.98)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '0.5rem',
                      minWidth: '180px',
                      boxShadow: '0 16px 45px rgba(0,0,0,0.2)',
                      zIndex: 1000,
                      marginTop: '0.75rem',
                      padding: '8px'
                    }}>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="admin-dropdown-item"
                          onClick={close}
                          style={{
                            display: 'block',
                            padding: '0.75rem 1rem',
                            color: 'rgba(255,255,255,0.9)',
                            textDecoration: 'none',
                            cursor: 'pointer',
                            borderRadius: '0.375rem',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.08)' }
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                          <i className="fa-solid fa-lock"></i> Admin Panel
                        </Link>
                      )}
                      <Link
                        to="/logout"
                        className="admin-dropdown-item"
                        onClick={close}
                        style={{
                          display: 'block',
                          padding: '0.75rem 1rem',
                          color: 'rgba(255,255,255,0.9)',
                          textDecoration: 'none',
                          cursor: 'pointer',
                          borderRadius: '0.375rem',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.08)' }
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                      >
                        <i className="fa-solid fa-sign-out-alt"></i> Logout
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="btn-auth-link" onClick={close}>
                  <i className="fa-solid fa-user"></i> Login
                </Link>
              )}
            </div>
          </div>

          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div className={`mobile-overlay${menuOpen ? '' : ' hide-mobile'}`} onClick={close}
        style={{ opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'auto' : 'none', transition: 'opacity 0.3s' }} />

      {/* Mobile Drawer */}
      <div className={`mobile-drawer${menuOpen ? ' open' : ''}`}>
        <button 
          className="mobile-drawer-close" 
          onClick={close}
          aria-label="Close menu"
        >
          <i className="fa-solid fa-times"></i>
        </button>
        {links.map(l => (
          <NavLink key={l.to} to={l.to} end={l.to === '/'} onClick={close}
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            {l.label}
          </NavLink>
        ))}
        <div className="mobile-drawer-cta">
          <a href={`tel:${PHONE}`} onClick={close}
            style={{ background: '#2563eb', color: '#fff' }}>
            <i className="fa-solid fa-phone"></i> Call Us
          </a>
          <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" onClick={close}
            style={{ background: '#25d366', color: '#fff' }}>
            <i className="fa-brands fa-whatsapp"></i> WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
