import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProductDetail.css';
import { getWhatsAppLink, PHONE } from '../data/data';
import { apiFetch } from '../services/api';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeImg, setActiveImg] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        setError('');
        console.log('ProductDetail: loading product id=', id);
        const data = await apiFetch(`/products/${id}`);
        console.log('ProductDetail: product data=', data);

        if (!data) {
          // If apiFetch returns null/undefined without throwing an error
          setProduct(null);
          setError('Product not found.');
          return; // Exit early from the function
        }
        setProduct(data);

        const allProducts = await apiFetch('/products');
        console.log('ProductDetail: all products count=', Array.isArray(allProducts) ? allProducts.length : 0);
        const related = allProducts.filter(p => p.category === data.category && p._id !== data._id).slice(0, 4);
        setRelatedProducts(related);
      } catch (err) {
        console.error('Failed to load product:', err);
        setProduct(null);
        setError((err && err.message) || 'Unable to load product details.');
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  const productImages = product
    ? Array.isArray(product.images)
      ? product.images
      : product.images
        ? [product.images]
        : []
    : [];

  const thumbImages = product
    ? (productImages.length > 0
        ? productImages.slice(0, 4)
        : [product.image].filter(Boolean))
    : [];

  useEffect(() => {
    setActiveImg(0);

    // Delay to ensure DOM has rendered after product state update
    const timer = setTimeout(() => {
      const els = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
      if (!els.length) return;

      const io = new IntersectionObserver(entries => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), i * 70);
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.05, rootMargin: '0px 0px -10px 0px' });

      els.forEach(el => io.observe(el));

      // Fallback: force-show all after 600ms in case observer never fires
      const fallback = setTimeout(() => {
        document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right')
          .forEach(el => el.classList.add('visible'));
      }, 600);

      return () => {
        io.disconnect();
        clearTimeout(fallback);
      };
    }, 100);

    return () => clearTimeout(timer);
  }, [id, product]); // re-run after product data loads

  if (loading) {
    return (
      <div className="product-detail-page page-enter">
        <div className="container" style={{ padding: '120px 24px', textAlign: 'center' }}>
          <div style={{ color: '#94a3b8', marginBottom: 20 }}>Loading product details...</div>
          <div className="loader" style={{ margin: '0 auto', width: 48, height: 48, border: '4px solid rgba(255,255,255,0.15)', borderTop: '4px solid #60a5fa', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-detail-page page-enter">
        <div className="container" style={{ padding: '120px 24px', textAlign: 'center' }}>
          <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: '3rem', color: '#f59e0b', marginBottom: 20, display: 'block' }}></i>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", marginBottom: 12 }}>Unable to load product</h2>
          <p style={{ color: '#64748b', marginBottom: 24 }}>{error}</p>
          <Link to="/products" className="btn-primary"><i className="fa-solid fa-arrow-left"></i> Back to Products</Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-page page-enter">
        <div className="container" style={{ padding: '120px 24px', textAlign: 'center' }}>
          <i className="fa-solid fa-box-open" style={{ fontSize: '3rem', color: '#1e2d4a', marginBottom: 20, display: 'block' }}></i>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", marginBottom: 12 }}>Product Not Found</h2>
          <p style={{ color: '#64748b', marginBottom: 24 }}>This product doesn't exist or may have been removed.</p>
          <Link to="/products" className="btn-primary"><i className="fa-solid fa-arrow-left"></i> Back to Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page page-enter">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          <div className="breadcrumb-list">
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep"><i className="fa-solid fa-chevron-right"></i></span>
            <Link to="/products">Products</Link>
            <span className="breadcrumb-sep"><i className="fa-solid fa-chevron-right"></i></span>
            <Link to={`/products?cat=${product.category}`}>{product.categoryLabel}</Link>
            <span className="breadcrumb-sep"><i className="fa-solid fa-chevron-right"></i></span>
            <span className="breadcrumb-current">{product.name}</span>
          </div>
        </div>
      </div>

      {/* debug box removed to show product details (was used for troubleshooting) */}

      {/* Main detail */}
      <div className="product-detail-section">
        <div className="container">
          <div className="pd-grid">
            {/* Images */}
            <div className="pd-images fade-in-left">
              <div className="pd-main-img">
                <img
                  src={thumbImages[activeImg] || product.image || 'https://via.placeholder.com/720x480?text=No+Image'}
                  alt={product.name}
                  onError={(e) => { console.error('Product main image failed to load', e); e.currentTarget.src = 'https://via.placeholder.com/720x480?text=No+Image'; }}
                />
              </div>
              <div className="pd-thumbs">
                {thumbImages.map((img, i) => (
                  <div
                    key={i}
                    className={`pd-thumb${activeImg === i ? ' active' : ''}`}
                    onClick={() => setActiveImg(i)}
                  >
                    <img src={img} alt={`View ${i + 1}`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="pd-info fade-in-right">
              <div className="pd-cat">{product.categoryLabel}</div>
              <h1 className="pd-name">{product.name}</h1>

              <div className="pd-rating-row">
                <div className="stars">
                  {[...Array(Math.floor(product.rating))].map((_, j) => (
                    <i key={j} className="fa-solid fa-star"></i>
                  ))}
                  {product.rating % 1 >= 0.5 && <i className="fa-solid fa-star-half-stroke"></i>}
                </div>
                <span className="pd-rating-num">{product.rating}</span>
                <span className="pd-review-count">({product.reviews} reviews)</span>
              </div>

              <div className="pd-price">{product.price}</div>
              <div className="pd-stock">
                <i className="fa-solid fa-circle"></i>
                In Stock — Ready for pickup / delivery
              </div>

              <p className="pd-desc">{product.description}</p>

              <div className="pd-actions">
                <a href={`tel:${PHONE}`} className="btn-primary">
                  <i className="fa-solid fa-phone"></i> Call Now to Order
                </a>
                <a
                  href={getWhatsAppLink(`Hi! I'm interested in purchasing ${product.name} (${product.price}). Please confirm availability and share payment details.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-whatsapp"
                >
                  <i className="fa-brands fa-whatsapp"></i> WhatsApp Enquiry
                </a>
                <button className="btn-buy">
                  <i className="fa-solid fa-cart-shopping"></i> Buy Now (Visit Store)
                </button>
              </div>

              <div className="pd-specs-title">Specifications</div>
              <div className="pd-specs-list">
                {(product.specsList || []).map((spec, i) => {
                  const [key, val] = spec.split(':');
                  return (
                    <div className="pd-spec-row" key={i}>
                      <div className="pd-spec-key">{key?.trim()}</div>
                      <div className="pd-spec-val">{val?.trim()}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div className="related-section">
          <div className="container">
            <h2 className="fade-in">Related <span className="gradient-text">Products</span></h2>
            <div className="related-grid">
              {relatedProducts.map((p, i) => (
                <Link
                  to={`/products/${p._id}`}
                  key={p._id}
                  className="prod-card fade-in"
                  style={{ textDecoration: 'none', transitionDelay: `${i * 0.07}s` }}
                >
                  <div className="prod-card-img">
                      <img src={p.images?.[0] || p.image || 'https://via.placeholder.com/420x280?text=No+Image'} alt={p.name} loading="lazy" />
                    <div className="prod-card-img-overlay" />
                  </div>
                  <div className="prod-card-body">
                    <div className="prod-cat">{p.categoryLabel}</div>
                    <div className="prod-name">{p.name}</div>
                    <div className="prod-specs">
                      {(p.specs || []).map((sp, j) => <span className="spec-chip" key={j}>{sp}</span>)}
                    </div>
                    <div className="prod-footer">
                      <div className="prod-price">{p.price}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}