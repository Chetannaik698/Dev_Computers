import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Services.css';
import { getWhatsAppLink, PHONE } from '../data/data';
import { apiFetch } from '../services/api';

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.fade-in');
    const io = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useScrollReveal();

  useEffect(() => {
    async function loadServices() {
      try {
        setLoading(true);
        const data = await apiFetch('/services');
        setServices(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to load services:', error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    }
    loadServices();
  }, []);

  return (
    <div className="services-page page-enter">
      <div className="services-hero">
        <div className="container">
          <div className="section-tag fade-in">Our Services</div>
          <h1 className="fade-in">
            Professional <span className="gradient-text">Tech Services</span>
          </h1>
          <p className="fade-in">
            From CCTV installations to custom PC builds — expert solutions with transparent pricing and fast turnaround.
          </p>
        </div>
      </div>

      <div className="services-list">
        <div className="container">
          {services.length === 0 && !loading && (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <i className="fa-solid fa-inbox" style={{ fontSize: '2.5rem', color: '#1e2d4a', marginBottom: 16, display: 'block' }}></i>
              <h3>No services available</h3>
              <p style={{ color: '#64748b' }}>Check back soon for our service offerings.</p>
            </div>
          )}
          {services.map((s, i) => (
            <div className="service-detail-card fade-in" key={s._id} style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="sdc-left">
                <div className="sdc-icon-wrap">
                  <i className={`fa-solid ${s.icon || 'fa-wrench'}`}></i>
                </div>
                <div className="sdc-cat">{s.category || 'Service'}</div>
                <h2 className="sdc-title">{s.title}</h2>
                <p className="sdc-desc">{s.description}</p>
                <div className="sdc-price-row">
                  <span className="sdc-price-label">Starting from</span>
                  <span className="sdc-price">{s.startingPrice || 'Contact us'}</span>
                </div>
                <div className="sdc-actions">
                  <Link to="/booking" className="btn-primary">
                    <i className="fa-solid fa-calendar-check"></i> Book Now
                  </Link>
                  <a
                    href={getWhatsAppLink(`Hi! I'm interested in your "${s.title}" service. Please share more details.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-whatsapp"
                  >
                    <i className="fa-brands fa-whatsapp"></i> WhatsApp
                  </a>
                  <a href={`tel:${PHONE}`} className="btn-outline">
                    <i className="fa-solid fa-phone"></i> Call
                  </a>
                </div>
              </div>

              <div className="sdc-right">
                <div className="sdc-features-title">What's Included</div>
                <div className="sdc-features">
                  {(s.features || []).map((f, j) => (
                    <div className="sdc-feature" key={j}>
                      <i className="fa-solid fa-circle-check"></i>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{ padding: '0 0 80px' }}>
        <div className="container">
          <div className="contact-strip-inner fade-in" style={{
            background: 'linear-gradient(135deg, rgba(37,99,235,0.15), rgba(167,139,250,0.08))',
            border: '1px solid rgba(37,99,235,0.25)',
            borderRadius: '28px',
            padding: '48px 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            flexWrap: 'wrap'
          }}>
            <div>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.6rem', fontWeight: 800, marginBottom: 8 }}>
                Not sure which service you need?
              </h3>
              <p style={{ color: '#94a3b8' }}>Talk to our experts — we'll guide you to the right solution.</p>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href={`tel:${PHONE}`} className="btn-primary">
                <i className="fa-solid fa-phone"></i> Call an Expert
              </a>
              <a
                href={getWhatsAppLink('Hi! I need help choosing the right service. Can you assist?')}
                target="_blank"
                rel="noreferrer"
                className="btn-whatsapp"
              >
                <i className="fa-brands fa-whatsapp"></i> Chat with Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
