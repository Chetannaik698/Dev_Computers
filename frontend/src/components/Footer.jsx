import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from '../assets/logo.png';
import { PHONE, PHONE_DISPLAY, getWhatsAppLink, LOCATION_ADDRESS } from '../data/data';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        {/* Brand */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <div className="footer-logo-icon">
              <img src={logo} alt="Dev Computers" className="footer-logo-img" />
            </div>
            <span className="footer-logo-name">Dev Computers</span>
          </Link>
          <p>Your trusted technology partner in Bengaluru. Expert repairs, quality products, and professional CCTV installation.</p>
          <div className="footer-socials">
            <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
            <a href={getWhatsAppLink('Hello! I found you on your website.')} target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <i className="fa-brands fa-whatsapp"></i>
            </a>
            <a href="#" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/"><i className="fa-solid fa-chevron-right" style={{fontSize:'0.65rem', color:'#2563eb'}}></i> Home</Link></li>
            <li><Link to="/services"><i className="fa-solid fa-chevron-right" style={{fontSize:'0.65rem', color:'#2563eb'}}></i> Services</Link></li>
            <li><Link to="/products"><i className="fa-solid fa-chevron-right" style={{fontSize:'0.65rem', color:'#2563eb'}}></i> Products</Link></li>
            <li><Link to="/booking"><i className="fa-solid fa-chevron-right" style={{fontSize:'0.65rem', color:'#2563eb'}}></i> Book Service</Link></li>
            <li><Link to="/contact"><i className="fa-solid fa-chevron-right" style={{fontSize:'0.65rem', color:'#2563eb'}}></i> Contact Us</Link></li>
            <li><Link to="/admin"><i className="fa-solid fa-chevron-right" style={{fontSize:'0.65rem', color:'#2563eb'}}></i> Admin Panel</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div className="footer-col">
          <h4>Our Services</h4>
          <ul>
            <li><Link to="/services"><i className="fa-solid fa-chevron-right" style={{fontSize:'0.65rem', color:'#2563eb'}}></i> CCTV Installation</Link></li>
            <li><Link to="/services"><i className="fa-solid fa-chevron-right" style={{fontSize:'0.65rem', color:'#2563eb'}}></i> IP/PTZ Camera Setup</Link></li>
            <li><Link to="/services"><i className="fa-solid fa-chevron-right" style={{fontSize:'0.65rem', color:'#2563eb'}}></i> Computer Service</Link></li>
            <li><Link to="/services"><i className="fa-solid fa-chevron-right" style={{fontSize:'0.65rem', color:'#2563eb'}}></i> Gaming PC Build</Link></li>
            <li><Link to="/services"><i className="fa-solid fa-chevron-right" style={{fontSize:'0.65rem', color:'#2563eb'}}></i> Printer Service</Link></li>
            <li><Link to="/services"><i className="fa-solid fa-chevron-right" style={{fontSize:'0.65rem', color:'#2563eb'}}></i> Laptop Sales & Repair</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4>Contact Info</h4>
          <div className="footer-contact-item">
            <div className="fc-icon"><i className="fa-solid fa-phone"></i></div>
            <div>
              <p>Call Us</p>
              <a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a>
            </div>
          </div>
          <div className="footer-contact-item">
            <div className="fc-icon" style={{background:'rgba(37,211,102,0.12)', borderColor:'rgba(37,211,102,0.25)', color:'#25d366'}}>
              <i className="fa-brands fa-whatsapp"></i>
            </div>
            <div>
              <p>WhatsApp</p>
              <a href={getWhatsAppLink('Hello! I need assistance.')} target="_blank" rel="noreferrer">{PHONE_DISPLAY}</a>
            </div>
          </div>
          <div className="footer-contact-item">
            <div className="fc-icon"><i className="fa-solid fa-location-dot"></i></div>
            <div>
              <p style={{color:'#94a3b8'}}>{LOCATION_ADDRESS}</p>
            </div>
          </div>
          <div className="footer-contact-item">
            <div className="fc-icon"><i className="fa-solid fa-clock"></i></div>
            <div>
              <p style={{color:'#94a3b8'}}>Mon–Sat: 9:00 AM – 7:00 PM<br />Sunday: 10:00 AM – 4:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Dev Computers. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
