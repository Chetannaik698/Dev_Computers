import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { PHONE, PHONE_DISPLAY, getWhatsAppLink, services, products, whyChooseUs, stats, testimonials, productCategories } from '../data/data';

/* ── Intersection Observer hook ── */
function useScrollReveal(selector = '.fade-in') {
  useEffect(() => {
    const els = document.querySelectorAll(selector);
    const io = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [selector]);
}

/* ── Counter ── */
function Counter({ target, suffix }) {
  const [val, setVal] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        io.disconnect();
        let start = 0;
        const step = target / 60;
        const t = setInterval(() => {
          start += step;
          if (start >= target) { setVal(target); clearInterval(t); }
          else setVal(Math.floor(start));
        }, 25);
      }
    }, { threshold: 0.5 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [target]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

/* ── Particles ── */
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  '--dur': `${6 + Math.random() * 6}s`,
  '--delay': `${Math.random() * 4}s`,
}));

export default function Home() {
  useScrollReveal('.fade-in');
  useScrollReveal('.fade-in-left');
  useScrollReveal('.fade-in-right');

  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

  return (
    <div className="page-enter">
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-particles">
          {PARTICLES.map((s, i) => <span key={i} style={s} />)}
        </div>

        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <i className="fa-solid fa-circle-dot"></i>
              Bhatkal's Trusted Tech Shop
            </div>
            <h1 className="hero-title gradient-text-blue">Where Technology</h1>
            <span className="hero-title-accent gradient-text">Meets Excellence.</span>
            <p className="hero-desc">
              Expert computer repairs, custom gaming PC builds, CCTV installations, laptop sales, and printer servicing — all under one roof in Bhatkal.
            </p>
            <div className="hero-ctas">
              <a href={`tel:${PHONE}`} className="btn-primary">
                <i className="fa-solid fa-phone"></i> Call Now
              </a>
              <a href={getWhatsAppLink('Hello! I need assistance from Dev Computers.')} target="_blank" rel="noreferrer" className="btn-whatsapp">
                <i className="fa-brands fa-whatsapp"></i> WhatsApp Us
              </a>
              <Link to="/booking" className="btn-outline">
                <i className="fa-solid fa-calendar-check"></i> Book Service
              </Link>
            </div>
            <div className="hero-stats">
              {stats.slice(0, 3).map((s, i) => (
                <div className="hero-stat" key={i}>
                  <div className="hero-stat-value">{s.value}{s.suffix}</div>
                  <div className="hero-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual card */}
          <div className="hero-visual">
            <div className="hero-visual-card">
              <div className="hvc-header">
                <div className="hvc-dot" style={{background:'#ef4444'}}></div>
                <div className="hvc-dot" style={{background:'#f59e0b'}}></div>
                <div className="hvc-dot" style={{background:'#10b981'}}></div>
                <span style={{marginLeft:8,fontSize:'0.8rem',color:'#475569'}}>Our Services</span>
              </div>
              <div className="hvc-services">
                {[
                  {icon:'fa-video',name:'CCTV Installation',price:'From ₹4,999',col:'#2563eb',badge:'Popular',bc:'rgba(37,99,235,0.15)',bcc:'#60a5fa'},
                  {icon:'fa-desktop',name:'Computer Repair',price:'From ₹499',col:'#10b981',badge:'Fast',bc:'rgba(16,185,129,0.15)',bcc:'#34d399'},
                  {icon:'fa-laptop',name:'Laptop Service',price:'From ₹599',col:'#a78bfa',badge:'Same Day',bc:'rgba(167,139,250,0.15)',bcc:'#a78bfa'},
                  {icon:'fa-print',name:'Printer Repair',price:'From ₹299',col:'#f59e0b',badge:'Quick',bc:'rgba(245,158,11,0.15)',bcc:'#fcd34d'},
                ].map((s, i) => (
                  <div className="hvc-service" key={i}>
                    <div className="hvc-icon" style={{background:`linear-gradient(135deg,${s.col}33,${s.col}11)`,border:`1px solid ${s.col}44`}}>
                      <i className={`fa-solid ${s.icon}`} style={{color:s.col}}></i>
                    </div>
                    <div className="hvc-info">
                      <div className="hvc-name">{s.name}</div>
                      <div className="hvc-price">{s.price}</div>
                    </div>
                    <div className="hvc-badge" style={{background:s.bc,color:s.bcc,border:`1px solid ${s.bcc}44`,fontSize:'0.65rem',padding:'3px 8px',borderRadius:'50px',fontWeight:700}}>
                      {s.badge}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hvc-floating">
              <div className="hvc-floating-value">2000+</div>
              <div className="hvc-floating-label">Happy Customers</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="services-section">
        <div className="container">
          <div className="section-header fade-in">
            <div className="section-tag">What We Do</div>
            <h2 className="section-title">Our <span className="gradient-text">Services</span></h2>
            <p className="section-sub">Professional tech services with a commitment to quality and fast turnaround.</p>
          </div>
          <div className="services-grid">
            {services.map((s, i) => (
              <div className="service-card fade-in" key={s.id} style={{transitionDelay:`${i*0.07}s`}}>
                <div className="service-card-icon">
                  <i className={`fa-solid ${s.icon}`}></i>
                </div>
                <h3>{s.title}</h3>
                <p>{s.short}</p>
                <div className="service-card-footer">
                  <div className="service-card-price">From <span>{s.startingPrice}</span></div>
                  <Link to="/booking" className="btn-primary" style={{padding:'9px 18px',fontSize:'0.82rem'}}>
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:'40px'}} className="fade-in">
            <Link to="/services" className="btn-outline">
              <i className="fa-solid fa-arrow-right"></i> View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CATEGORY STRIP ===== */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header fade-in" style={{marginBottom:'32px'}}>
            <div className="section-tag">Browse</div>
            <h2 className="section-title">Shop by <span className="gradient-text">Category</span></h2>
          </div>
          <div className="categories-strip fade-in">
            {productCategories.map(c => (
              <Link to={`/products?cat=${c.id}`} className="category-chip" key={c.id}>
                <i className={`fa-solid ${c.icon}`}></i>
                <span>{c.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header fade-in">
            <div className="section-tag">Shop</div>
            <h2 className="section-title">Featured <span className="gradient-text">Products</span></h2>
            <p className="section-sub">Quality products at competitive prices. Enquire now for best deals.</p>
          </div>
          <div className="products-grid">
            {featuredProducts.map((p, i) => (
              <div className={`product-card animated-border fade-in`} key={p.id} style={{transitionDelay:`${i*0.08}s`}}>
                <div className="product-card-img">
                  <img src={p.image} alt={p.name} loading="lazy" />
                  <div className="product-card-img-overlay" />
                </div>
                <div className="product-card-body">
                  <div className="product-card-cat">{p.categoryLabel}</div>
                  <div className="product-card-name">{p.name}</div>
                  <div className="product-card-specs">
                    {p.specs.map((sp, j) => <span className="spec-chip" key={j}>{sp}</span>)}
                  </div>
                  <div className="product-card-footer">
                    <div className="product-card-price">{p.price}</div>
                    <a href={getWhatsAppLink(`Hi! I'm interested in ${p.name} (${p.price}). Please share details.`)}
                      target="_blank" rel="noreferrer" className="btn-enquire">
                      <i className="fa-brands fa-whatsapp"></i> Enquire
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:'40px'}} className="fade-in">
            <Link to="/products" className="btn-primary">
              <i className="fa-solid fa-th-large"></i> View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* ===== COUNTERS ===== */}
      <section className="counters-section">
        <div className="container">
          <div className="counters-grid">
            {stats.map((s, i) => (
              <div className="counter-item fade-in" key={i} style={{transitionDelay:`${i*0.1}s`}}>
                <i className={`fa-solid ${s.icon}`}></i>
                <div className="counter-value">
                  <Counter target={s.value} suffix={s.suffix} />
                </div>
                <div className="counter-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="why-section">
        <div className="container">
          <div className="section-header fade-in">
            <div className="section-tag">Why Us</div>
            <h2 className="section-title">Why Choose <span className="gradient-text">Dev Computers</span></h2>
            <p className="section-sub">We go beyond just fixing things — we build lasting relationships with our customers.</p>
          </div>
          <div className="why-grid">
            {whyChooseUs.map((w, i) => (
              <div className="why-card fade-in" key={i} style={{transitionDelay:`${i*0.07}s`}}>
                <div className="why-card-icon">
                  <i className={`fa-solid ${w.icon}`}></i>
                </div>
                <h3>{w.title}</h3>
                <p>{w.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header fade-in">
            <div className="section-tag">Reviews</div>
            <h2 className="section-title">What Our <span className="gradient-text">Customers Say</span></h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div className="testimonial-card fade-in" key={i} style={{transitionDelay:`${i*0.07}s`}}>
                <div className="testimonial-stars">
                  {[...Array(t.rating)].map((_, j) => <i key={j} className="fa-solid fa-star"></i>)}
                  {[...Array(5 - t.rating)].map((_, j) => <i key={j} className="fa-regular fa-star"></i>)}
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.avatar}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT STRIP ===== */}
      <section className="contact-strip">
        <div className="container">
          <div className="contact-strip-inner fade-in">
            <div className="contact-strip-text">
              <h2>Ready to Get Started?<br /><span className="gradient-text">Let's Fix It Today.</span></h2>
              <p>Call us, WhatsApp, or book a service online — we're here to help!</p>
            </div>
            <div className="contact-strip-actions">
              <a href={`tel:${PHONE}`} className="btn-primary">
                <i className="fa-solid fa-phone"></i> {PHONE_DISPLAY}
              </a>
              <a href={getWhatsAppLink('Hello! I need tech assistance from Dev Computers.')} target="_blank" rel="noreferrer" className="btn-whatsapp">
                <i className="fa-brands fa-whatsapp"></i> WhatsApp Us
              </a>
              <Link to="/contact" className="btn-outline">
                <i className="fa-solid fa-map-location-dot"></i> Our Location
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
