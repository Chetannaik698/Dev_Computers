import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';
import { apiFetch } from '../services/api';
import { productCategories, services, PHONE } from '../data/data';
import logo from '../assets/logo.png';

/* ── Seed data ── */
const seedBookings = [
  { id: 1, name: 'Rahul Sharma', phone: '9876543210', service: 'CCTV Camera Installation', date: '2024-12-20', time: '10:00 AM – 11:00 AM', status: 'confirmed', address: 'Koramangala' },
  { id: 2, name: 'Priya Nair', phone: '9123456789', service: 'Laptop Service & Sales', date: '2024-12-21', time: '2:00 PM – 3:00 PM', status: 'pending', address: 'Indiranagar' },
  { id: 3, name: 'Amit Patel', phone: '9988776655', service: 'Computer Service & Gaming PC Build', date: '2024-12-22', time: '11:00 AM – 12:00 PM', status: 'done', address: 'BTM Layout' },
  { id: 4, name: 'Sunita Reddy', phone: '9871234560', service: 'Printer Service & Cartridge Refilling', date: '2024-12-23', time: '3:00 PM – 4:00 PM', status: 'pending', address: 'Jayanagar' },
  { id: 5, name: 'Kiran Mathew', phone: '9012345678', service: 'CCTV Camera Installation', date: '2024-12-24', time: '9:00 AM – 10:00 AM', status: 'confirmed', address: 'Whitefield' },
];

const STATUS_NEXT = { pending: 'confirmed', confirmed: 'done', done: 'pending' };

const Toast = ({ msg, onHide }) => {
  React.useEffect(() => { const t = setTimeout(onHide, 2800); return () => clearTimeout(t); }, [onHide]);
  return (
    <div className="admin-toast">
      <i className="fa-solid fa-circle-check"></i> {msg}
    </div>
  );
};

export default function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState('');
  const [bookingFilter, setBookingFilter] = useState('all');
  const [toast, setToast] = useState('');
  const [editProd, setEditProd] = useState(null);

  const showToast = (msg) => setToast(msg);

  const navLinks = [
    { id: 'dashboard', icon: 'fa-chart-pie', label: 'Dashboard' },
    { id: 'add-product', icon: 'fa-plus-circle', label: 'Add Product' },
    { id: 'manage-products', icon: 'fa-boxes-stacked', label: 'Manage Products' },
    { id: 'bookings', icon: 'fa-calendar-check', label: 'Booking Requests' },
  ];

  const closeSidebar = () => setSidebarOpen(false);
  const navigate = (v) => { setView(v); closeSidebar(); };

  useEffect(() => {
    async function loadAdminData() {
      try {
        const [productsData, bookingsData] = await Promise.all([
          apiFetch('/products'),
          apiFetch('/bookings'),
        ]);
        setProducts(productsData);
        setBookings(bookingsData);
      } catch (error) {
        showToast(error.message || 'Unable to load admin data.');
      }
    }
    loadAdminData();
  }, []);

  /* Delete product */
  const deleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await apiFetch(`/products/${id}`, { method: 'DELETE' });
      setProducts(ps => ps.filter(p => p._id !== id));
      showToast('Product deleted.');
    } catch (error) {
      showToast(error.message || 'Delete failed.');
    }
  };

  /* Status toggle */
  const toggleStatus = async (id) => {
    const booking = bookings.find(b => b._id === id);
    if (!booking) return;
    const nextStatus = STATUS_NEXT[booking.status];
    try {
      const updated = await apiFetch(`/bookings/${id}/status`, {
        method: 'PUT',
        body: { status: nextStatus },
      });
      setBookings(bs => bs.map(b => b._id === id ? updated : b));
      showToast('Status updated!');
    } catch (error) {
      showToast(error.message || 'Could not update status.');
    }
  };

  /* Render helpers */
  const StatusPill = ({ status }) => (
    <span className={`status-pill status-${status}`}>
      <i className="fa-solid fa-circle" style={{ fontSize: '0.45rem' }}></i>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );

  /* Counts */
  const pending = bookings.filter(b => b.status === 'pending').length;
  const done = bookings.filter(b => b.status === 'done').length;

  return (
    <div className="admin-shell">
      {/* Sidebar overlay */}
      <div className={`admin-overlay${sidebarOpen ? ' open' : ''}`} onClick={closeSidebar} />

      {/* Sidebar */}
      <aside className={`admin-sidebar${sidebarOpen ? ' open' : ''}`}>
        <div className="sidebar-logo">
          <img src={logo} alt="Dev Computers Logo" className="sidebar-logo-icon" />
          <div>
            <div className="sidebar-logo-text">Dev Computers</div>
            <div className="sidebar-logo-sub">Admin Panel</div>
          </div>
        </div>
        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Main Menu</div>
          {navLinks.map(l => (
            <button
              key={l.id}
              className={`sidebar-link${view === l.id ? ' active' : ''}`}
              onClick={() => navigate(l.id)}
            >
              <i className={`fa-solid ${l.icon}`}></i> {l.label}
              {l.id === 'bookings' && pending > 0 && (
                <span style={{ marginLeft: 'auto', background: '#ef4444', color: '#fff', borderRadius: 50, width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 800, flexShrink: 0 }}>
                  {pending}
                </span>
              )}
            </button>
          ))}
          <div className="sidebar-section-label">Other</div>
          <Link to="/" className="sidebar-link" onClick={closeSidebar}>
            <i className="fa-solid fa-house"></i> Back to Website
          </Link>
        </nav>
        <div className="sidebar-footer">
          <a href={`tel:${PHONE}`}>
            <i className="fa-solid fa-phone"></i> {PHONE}
          </a>
        </div>
      </aside>

      {/* Main */}
      <div className="admin-main">
        <header className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button className="hamburger-admin" onClick={() => setSidebarOpen(v => !v)}>
              <span /><span /><span />
            </button>
            <div className="topbar-title">
              {navLinks.find(l => l.id === view)?.label || 'Admin'}
            </div>
          </div>
          <div className="topbar-right">
            <span className="topbar-badge"><i className="fa-solid fa-circle"></i> Live</span>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,#2563eb,#a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 800, color: '#fff' }}>A</div>
          </div>
        </header>

        <div className="admin-content">
          {/* ── DASHBOARD ── */}
          {view === 'dashboard' && (
            <div>
              <div className="admin-stat-cards">
                {[
                  { label: 'Total Products', val: products.length, icon: 'fa-boxes-stacked', col: '#2563eb', bg: 'rgba(37,99,235,0.15)', change: '+3 this month' },
                  { label: 'Total Bookings', val: bookings.length, icon: 'fa-calendar-check', col: '#a78bfa', bg: 'rgba(167,139,250,0.15)', change: '+5 this week' },
                  { label: 'Pending', val: pending, icon: 'fa-clock', col: '#f59e0b', bg: 'rgba(245,158,11,0.15)', change: 'Action needed' },
                  { label: 'Completed', val: done, icon: 'fa-circle-check', col: '#10b981', bg: 'rgba(16,185,129,0.15)', change: '+2 today' },
                ].map((s, i) => (
                  <div className="admin-stat-card" key={i} style={{ '--accent': `${s.col}55` }}>
                    <div className="asc-icon" style={{ background: s.bg, color: s.col }}>
                      <i className={`fa-solid ${s.icon}`}></i>
                    </div>
                    <div>
                      <div className="asc-val">{s.val}</div>
                      <div className="asc-label">{s.label}</div>
                      <div className="asc-change"><i className="fa-solid fa-arrow-trend-up"></i>{s.change}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent bookings */}
              <div className="admin-table-card">
                <div className="atc-header">
                  <h3><i className="fa-solid fa-calendar" style={{ color: '#60a5fa', marginRight: 8 }}></i>Recent Bookings</h3>
                  <button className="btn-admin btn-admin-blue" onClick={() => navigate('bookings')}>View All</button>
                </div>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Customer</th><th>Service</th><th>Date</th><th>Status</th><th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.slice(0, 5).map(b => (
                      <tr key={b._id}>
                        <td className="td-name">{b.customer}</td>
                        <td>{b.service}</td>
                        <td>{b.date}</td>
                        <td><StatusPill status={b.status} /></td>
                        <td>
                          <button className="btn-admin btn-admin-blue" onClick={() => toggleStatus(b._id)}>
                            Next Status
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Inventory */}
              <div className="admin-table-card">
                <div className="atc-header">
                  <h3><i className="fa-solid fa-warehouse" style={{ color: '#60a5fa', marginRight: 8 }}></i>Inventory Snapshot</h3>
                  <button className="btn-admin btn-admin-blue" onClick={() => navigate('manage-products')}>Manage</button>
                </div>
                <table className="admin-table">
                  <thead>
                    <tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th></tr>
                  </thead>
                  <tbody>
                    {products.slice(0, 6).map(p => (
                      <tr key={p._id}>
                        <td className="td-name">{p.name}</td>
                        <td>{p.category || p.categoryLabel}</td>
                        <td style={{ color: '#60a5fa', fontWeight: 700 }}>{p.price}</td>
                        <td>
                          <span className={`status-pill ${p.inStock ? 'status-done' : 'status-pending'}`}>
                            <i className="fa-solid fa-circle" style={{ fontSize: '0.45rem' }}></i>
                            {p.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── ADD PRODUCT ── */}
          {view === 'add-product' && (
            <AddProductForm
              categories={productCategories.filter(c => c.id !== 'all')}
              initial={editProd}
              onSave={async (data) => {
                try {
                  if (editProd) {
                    const updated = await apiFetch(`/products/${editProd._id}`, {
                      method: 'PUT',
                      body: data,
                    });
                    setProducts(ps => ps.map(p => p._id === editProd._id ? updated : p));
                    showToast('Product updated!');
                    setEditProd(null);
                  } else {
                    const created = await apiFetch('/products', {
                      method: 'POST',
                      body: data,
                    });
                    setProducts(ps => [...ps, created]);
                    showToast('Product added!');
                  }
                  navigate('manage-products');
                } catch (error) {
                  showToast(error.message || 'Unable to save product.');
                }
              }}
            />
          )}

          {/* ── MANAGE PRODUCTS ── */}
          {view === 'manage-products' && (
            <div>
              <div className="admin-table-card">
                <div className="atc-header">
                  <h3><i className="fa-solid fa-boxes-stacked" style={{ color: '#60a5fa', marginRight: 8 }}></i>All Products ({products.length})</h3>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <div className="admin-search-wrap">
                      <i className="fa-solid fa-magnifying-glass"></i>
                      <input
                        className="admin-search"
                        placeholder="Search products..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                      />
                    </div>
                    <button className="btn-admin btn-admin-green" onClick={() => { setEditProd(null); navigate('add-product'); }}>
                      <i className="fa-solid fa-plus"></i> Add New
                    </button>
                  </div>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table className="admin-table">
                    <thead>
                      <tr><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                      {products
                        .filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()))
                        .map(p => (
                          <tr key={p._id}>
                            <td>
                              <img src={p.image || 'https://via.placeholder.com/52x40?text=No'} alt={p.name}
                                style={{ width: 52, height: 40, objectFit: 'cover', borderRadius: 8, border: '1px solid rgba(255,255,255,0.07)' }} />
                            </td>
                            <td className="td-name" style={{ maxWidth: 200 }}>{p.name}</td>
                            <td>{p.category || p.categoryLabel}</td>
                            <td style={{ color: '#60a5fa', fontWeight: 700 }}>{p.price}</td>
                            <td>
                              <span className={`status-pill ${p.inStock ? 'status-done' : 'status-pending'}`}>
                                <i className="fa-solid fa-circle" style={{ fontSize: '0.45rem' }}></i>
                                {p.inStock ? 'In Stock' : 'Out'}
                              </span>
                            </td>
                            <td>
                              <div className="btn-action-row">
                                <button className="btn-admin btn-admin-blue"
                                  onClick={() => { setEditProd(p); navigate('add-product'); }}>
                                  <i className="fa-solid fa-pen"></i> Edit
                                </button>
                                <button className="btn-admin btn-admin-red"
                                  onClick={() => deleteProduct(p._id)}>
                                  <i className="fa-solid fa-trash"></i> Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── BOOKINGS ── */}
          {view === 'bookings' && (
            <div>
              <div className="admin-table-card">
                <div className="atc-header">
                  <h3><i className="fa-solid fa-calendar-check" style={{ color: '#60a5fa', marginRight: 8 }}></i>Booking Requests ({bookings.length})</h3>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                    <div className="admin-filter-tabs">
                      {['all', 'pending', 'confirmed', 'done'].map(f => (
                        <button
                          key={f}
                          className={`admin-filter-tab${bookingFilter === f ? ' active' : ''}`}
                          onClick={() => setBookingFilter(f)}
                        >
                          {f.charAt(0).toUpperCase() + f.slice(1)}
                          {f !== 'all' && ` (${bookings.filter(b => b.status === f).length})`}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table className="admin-table">
                    <thead>
                      <tr><th>#</th><th>Customer</th><th>Phone</th><th>Service</th><th>Date</th><th>Time</th><th>Status</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                      {bookings
                        .filter(b => bookingFilter === 'all' || b.status === bookingFilter)
                        .map(b => (
                          <tr key={b._id}>
                            <td style={{ color: '#475569' }}>#{b._id?.toString().slice(-6)}</td>
                            <td className="td-name">{b.customer}</td>
                            <td>
                              <a href={`tel:+91${b.phone}`} style={{ color: '#60a5fa', fontSize: '0.82rem' }}>+91 {b.phone}</a>
                            </td>
                            <td style={{ maxWidth: 160, fontSize: '0.8rem' }}>{b.service}</td>
                            <td>{b.date}</td>
                            <td style={{ fontSize: '0.78rem' }}>{b.time}</td>
                            <td><StatusPill status={b.status} /></td>
                            <td>
                              <div className="btn-action-row">
                                <button className="btn-admin btn-admin-blue" onClick={() => toggleStatus(b._id)}>
                                  <i className="fa-solid fa-arrow-rotate-right"></i> Next
                                </button>
                                <a href={`tel:+91${b.phone}`} className="btn-admin btn-admin-green">
                                  <i className="fa-solid fa-phone"></i> Call
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {toast && <Toast msg={toast} onHide={() => setToast('')} />}
    </div>
  );
}

/* ── Add/Edit Product Form ── */
function AddProductForm({ categories, initial, onSave }) {
  const [form, setForm] = useState({
    name: initial?.name || '',
    category: initial?.category || '',
    categoryLabel: initial?.categoryLabel || '',
    price: initial?.price || '',
    priceNum: initial?.priceNum || 0,
    image: initial?.image || '',
    images: initial?.images || [],
    inStock: initial?.inStock ?? true,
    description: initial?.description || '',
    spec1: initial?.specs?.[0] || '',
    spec2: initial?.specs?.[1] || '',
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState(initial?.images || []);
  const [uploading, setUploading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => {
      const updated = { ...f, [name]: value };
      if (name === 'category') {
        const cat = categories.find(c => c.id === value);
        updated.categoryLabel = cat?.label || '';
      }
      return updated;
    });
  };

  const handleFileChange = e => {
    const files = Array.from(e.target.files).slice(0, 4);
    setImageFiles(files);
    setImagePreviews(files.map(file => URL.createObjectURL(file)));
  };

  const uploadProductImages = async () => {
    if (imageFiles.length === 0) {
      return form.images || [];
    }
    const data = new FormData();
    imageFiles.forEach(file => data.append('images', file));
    const result = await apiFetch('/uploads/cloudinary', { method: 'POST', body: data });
    return result.urls || [];
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setUploading(true);
    try {
      const imageUrls = await uploadProductImages();
      await onSave({
        ...form,
        specs: [form.spec1, form.spec2].filter(Boolean),
        priceNum: parseInt(form.price.replace(/[^0-9]/g, '')) || 0,
        images: imageUrls,
        image: imageUrls.length > 0 ? imageUrls[0] : form.image || '',
        inStock: form.inStock === 'true' || form.inStock === true,
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-form-card">
      <h2><i className="fa-solid fa-plus-circle" style={{ color: '#60a5fa', marginRight: 8 }}></i>
        {initial ? 'Edit Product' : 'Add New Product'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="aform-row">
          <div className="aform-group">
            <label>Product Name *</label>
            <input className="aform-input" name="name" value={form.name} onChange={handleChange} placeholder="e.g. Gaming Mouse RGB" required />
          </div>
          <div className="aform-group">
            <label>Category *</label>
            <select className="aform-select" name="category" value={form.category} onChange={handleChange} required>
              <option value="">Select category...</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </div>
        </div>
        <div className="aform-row">
          <div className="aform-group">
            <label>Price (e.g. ₹1,999) *</label>
            <input className="aform-input" name="price" value={form.price} onChange={handleChange} placeholder="₹0,000" required />
          </div>
          <div className="aform-group">
            <label>Stock Status</label>
            <select className="aform-select" name="inStock" value={String(form.inStock)} onChange={handleChange}>
              <option value="true">In Stock</option>
              <option value="false">Out of Stock</option>
            </select>
          </div>
        </div>
        <div className="aform-group">
          <label>Image URL</label>
          <input className="aform-input" name="image" value={form.image} onChange={handleChange} placeholder="https://images.unsplash.com/..." />
          {form.image && <img src={form.image} alt="Preview" className="img-preview" onError={e => e.target.style.display = 'none'} />}
        </div>
        <div className="aform-group">
          <label>Upload Images (up to 4)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            className="aform-input"
            onChange={handleFileChange}
          />
          {imagePreviews.length > 0 && (
            <div className="upload-preview-grid">
              {imagePreviews.map((src, idx) => (
                <div className="upload-preview-item" key={idx}>
                  <img src={src} alt={`Preview ${idx + 1}`} />
                </div>
              ))}
            </div>
          )}
          <small style={{ color: '#64748b' }}>
            Upload product images from your system. If you upload files, they will be sent to Cloudinary and used as product images.
          </small>
        </div>
        <div className="aform-row">
          <div className="aform-group">
            <label>Spec 1</label>
            <input className="aform-input" name="spec1" value={form.spec1} onChange={handleChange} placeholder="e.g. 16000 DPI Sensor" />
          </div>
          <div className="aform-group">
            <label>Spec 2</label>
            <input className="aform-input" name="spec2" value={form.spec2} onChange={handleChange} placeholder="e.g. RGB Lighting" />
          </div>
        </div>
        <div className="aform-group">
          <label>Description</label>
          <textarea className="aform-textarea" name="description" value={form.description} onChange={handleChange} placeholder="Short product description..." rows={4} />
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button type="submit" className="btn-admin-submit">
            <i className="fa-solid fa-floppy-disk"></i> {initial ? 'Save Changes' : 'Add Product'}
          </button>
          <button type="button" className="btn-admin btn-admin-red" style={{ padding: '10px 20px', fontSize: '0.875rem' }}
            onClick={() => window.history.back()}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
