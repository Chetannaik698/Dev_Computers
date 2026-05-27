import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './Products.css';
import { productCategories, getWhatsAppLink } from '../data/data';
import { apiFetch } from '../services/api';

export default function Products() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('cat') || 'all');
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const data = await apiFetch('/products');
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to load products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat) setActiveTab(cat);
  }, [searchParams]);

  useEffect(() => {
    const els = document.querySelectorAll('.fade-in');
    const io = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 60);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [activeTab, search]);

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchCat = activeTab === 'all' || p.category === activeTab;
      const q = search.toLowerCase();
      const matchSearch = !q || p.name.toLowerCase().includes(q) || (p.categoryLabel || '').toLowerCase().includes(q) || (p.specs || []).some(s => (s || '').toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [activeTab, search, products]);

  return (
    <div className="products-page page-enter">
      <div className="products-hero">
        <div className="container">
          <div className="section-tag fade-in">Our Store</div>
          <h1 className="fade-in">
            Quality <span className="gradient-text">Products</span>
          </h1>
          <p className="fade-in">
            Explore our curated selection of computer accessories, laptops, CCTV equipment, and printers at competitive prices.
          </p>
        </div>
      </div>

      <div className="products-controls">
        <div className="container">
          <div className="products-search-wrap fade-in">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              className="products-search"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-tabs fade-in">
            {productCategories.map(c => (
              <button
                key={c.id}
                className={`filter-tab${activeTab === c.id ? ' active' : ''}`}
                onClick={() => setActiveTab(c.id)}
              >
                <i className={`fa-solid ${c.icon}`}></i>
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="products-section">
        <div className="container">
          <div className="products-count fade-in">
            Showing <span>{filtered.length}</span> product{filtered.length !== 1 ? 's' : ''}
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state fade-in">
              <i className="fa-solid fa-box-open"></i>
              <h3>No products found</h3>
              <p>Try adjusting your search or category filter.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '24px' }}>
              {filtered.map((p, i) => (
                <div className="prod-card fade-in" key={p._id} style={{ transitionDelay: `${i * 0.06}s` }}>
                  <div className="prod-card-img">
                    <img
                      src={p.images?.[0] || p.image || 'https://via.placeholder.com/420x280?text=No+Image'}
                      alt={p.name}
                      loading="lazy"
                    />
                    <div className="prod-card-img-overlay" />
                  </div>
                  <div className="prod-card-body">
                    <div className="prod-cat">{p.categoryLabel}</div>
                    <div className="prod-name">{p.name}</div>
                    <div className="prod-specs">
                      {(p.specs || []).map((sp, j) => (
                        <span className="spec-chip" key={j}>{sp}</span>
                      ))}
                    </div>
                    <div className="prod-rating">
                      <div className="stars">
                        {[...Array(Math.floor(p.rating || 0))].map((_, j) => (
                          <i key={j} className="fa-solid fa-star"></i>
                        ))}
                        {(p.rating || 0) % 1 >= 0.5 && <i className="fa-solid fa-star-half-stroke"></i>}
                      </div>
                      <span>{p.rating || 0} ({p.reviews || 0} reviews)</span>
                    </div>
                    <div className="prod-footer">
                      <div className="prod-price">{p.price}</div>
                      <div className="prod-actions">
                        <Link to={`/products/${p._id}`} className="btn-view">
                          <i className="fa-solid fa-eye"></i> View Details
                        </Link>
                        <a
                          href={getWhatsAppLink(`Hi! I'm interested in ${p.name} (${p.price}). Please share details.`)}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-wa-sm"
                          title="WhatsApp Enquiry"
                        >
                          <i className="fa-brands fa-whatsapp"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
