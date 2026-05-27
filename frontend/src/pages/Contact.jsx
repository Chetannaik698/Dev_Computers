import React, { useState, useEffect } from 'react';
import './Contact.css';
import { PHONE, PHONE_DISPLAY, getWhatsAppLink, LOCATION_ADDRESS, LOCATION_MAP } from '../data/data';

const infoCards = [
  {
    icon: 'fa-phone', label: 'Call Us', value: PHONE_DISPLAY,
    sub: 'Mon–Sat 9AM–7PM', accent: '#2563eb', bg: 'rgba(37,99,235,0.12)',
    link: `tel:${PHONE}`, linkLabel: 'Call Now',
    linkStyle: { background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.3)', color: '#60a5fa' },
    linkHover: {},
  },
  {
    icon: 'fa-brands fa-whatsapp', label: 'WhatsApp', value: PHONE_DISPLAY,
    sub: 'Reply within 5 mins', accent: '#25d366', bg: 'rgba(37,211,102,0.12)',
    link: getWhatsAppLink('Hello! I need assistance from Dev Computers.'),
    linkLabel: 'Chat Now', external: true,
    linkStyle: { background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.3)', color: '#25d366' },
  },
  {
    icon: 'fa-location-dot', label: 'Visit Us', value: LOCATION_ADDRESS,
    sub: 'Bhatkal, Karnataka', accent: '#f59e0b', bg: 'rgba(245,158,11,0.12)',
    link: LOCATION_MAP,
    linkLabel: 'Get Directions', external: true,
    linkStyle: { background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)', color: '#fcd34d' },
  },
  {
    icon: 'fa-clock', label: 'Working Hours', value: 'Mon–Sat: 9AM–7PM',
    sub: 'Sunday: 10AM–4PM', accent: '#a78bfa', bg: 'rgba(167,139,250,0.12)',
    link: null,
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });

  useEffect(() => {
    const els = document.querySelectorAll('.fade-in');
    const io = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 70);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `Hi! I'm ${form.name}.\nPhone: +91 ${form.phone}\n\n${form.message}`;
    window.open(getWhatsAppLink(msg), '_blank');
  };

  return (
    <div className="contact-page page-enter">
      <div className="contact-hero">
        <div className="container">
          <div className="section-tag fade-in">Get in Touch</div>
          <h1 className="fade-in">Contact <span className="gradient-text">Dev Computers</span></h1>
          <p className="fade-in">We're here to help. Reach out via call, WhatsApp, or visit us at our Bengaluru store.</p>
        </div>
      </div>

      <div className="contact-info-section">
        <div className="container">
          <div className="contact-cards-grid">
            {infoCards.map((c, i) => (
              <div className="contact-info-card fade-in" key={i}
                style={{ '--accent': c.accent, transitionDelay: `${i * 0.07}s` }}>
                <div className="cic-icon" style={{ background: c.bg, color: c.accent }}>
                  <i className={`fa-solid ${c.icon}`}></i>
                </div>
                <div className="cic-label">{c.label}</div>
                <div className="cic-value">{c.value}</div>
                <div className="cic-sub">{c.sub}</div>
                {c.link && (
                  <a
                    href={c.link}
                    className="cic-link"
                    style={c.linkStyle}
                    target={c.external ? '_blank' : undefined}
                    rel={c.external ? 'noreferrer' : undefined}
                  >
                    {c.linkLabel} <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.7rem' }}></i>
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="contact-main-layout">
            {/* Map */}
            <div className="map-card fade-in">
              <div className="map-card-header">
                <i className="fa-solid fa-map-location-dot"></i>
                <div>
                  <h3>Our Location</h3>
                  <p>{LOCATION_ADDRESS}</p>
                </div>
              </div>
              <iframe
                className="map-embed"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.018!2d75.2192!3d13.8015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba4a6a8c6c6c6c7%3A0x6c6c6c6c6c6c6c6c!2sShirali%2C%20Bhatkal!5e0!3m2!1sen!2sin!4v1700000000000"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Dev Computers Location"
              ></iframe>
              <div className="map-card-footer">
                <p><i className="fa-solid fa-location-dot" style={{ color: '#60a5fa', marginRight: 6 }}></i>{LOCATION_ADDRESS}</p>
                <a
                  href={LOCATION_MAP}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                  style={{ padding: '8px 18px', fontSize: '0.8rem' }}
                >
                  <i className="fa-solid fa-diamond-turn-right"></i> Directions
                </a>
              </div>
            </div>

            {/* Quick contact form */}
            <div className="contact-form-card fade-in">
              <h3>Send us a Message</h3>
              <p className="sub">Fill this form — it opens WhatsApp with your message pre-filled for instant response.</p>
              <form onSubmit={handleSubmit}>
                <div className="cform-group">
                  <label>Your Name</label>
                  <input
                    className="cform-input"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="cform-group">
                  <label>Phone Number</label>
                  <input
                    className="cform-input"
                    placeholder="10-digit mobile number"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    maxLength={10}
                  />
                </div>
                <div className="cform-group">
                  <label>Your Message</label>
                  <textarea
                    className="cform-textarea"
                    placeholder="How can we help you?"
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    required
                    rows={4}
                  />
                </div>
                <button type="submit" className="btn-wa-submit">
                  <i className="fa-brands fa-whatsapp"></i> Send via WhatsApp
                </button>
              </form>

              <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <p style={{ fontSize: '0.78rem', color: '#475569', textAlign: 'center', marginBottom: 12 }}>Or reach us directly</p>
                <a href={`tel:${PHONE}`} className="btn-primary" style={{ justifyContent: 'center', width: '100%' }}>
                  <i className="fa-solid fa-phone"></i> Call {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
