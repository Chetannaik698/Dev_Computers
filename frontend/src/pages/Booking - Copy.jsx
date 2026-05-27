import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Booking.css';
import { apiFetch } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { services, getWhatsAppLink, PHONE, PHONE_DISPLAY, timeSlots } from '../data/data';

const today = new Date().toISOString().split('T')[0];

const initForm = {
  name: '', phone: '', service: '', date: '', time: '', address: '', notes: '',
};

const initErrors = {
  name: '', phone: '', service: '', date: '', time: '', address: '',
};

export default function Booking() {
  const { user } = useAuth();
  const [form, setForm] = useState(initForm);
  const [errors, setErrors] = useState(initErrors);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.name && !form.name) {
      setForm((current) => ({ ...current, name: user.name }));
    }
  }, [user, form.name]);

  useEffect(() => {
    const els = document.querySelectorAll('.fade-in');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 60);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const validate = () => {
    let valid = true;
    const errs = { ...initErrors };

    if (!form.name.trim() || form.name.trim().length < 2) {
      errs.name = 'Please enter your full name (min 2 chars)';
      valid = false;
    }
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.replace(/\s/g, ''))) {
      errs.phone = 'Please enter a valid 10-digit phone number';
      valid = false;
    }
    if (!form.service) {
      errs.service = 'Please select a service';
      valid = false;
    }
    if (!form.date) {
      errs.date = 'Please select a preferred date';
      valid = false;
    }
    if (!form.time) {
      errs.time = 'Please select a time slot';
      valid = false;
    }
    if (!form.address.trim() || form.address.trim().length < 10) {
      errs.address = 'Please enter a complete address (min 10 chars)';
      valid = false;
    }

    setErrors(errs);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setSubmitError('Please login before submitting a booking.');
      return;
    }
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError('');

    try {
      await apiFetch('/bookings', {
        method: 'POST',
        body: {
          customer: form.name,
          phone: form.phone,
          service: form.service,
          date: form.date,
          time: form.time,
          address: form.address,
          notes: form.notes,
        },
      });
      setSubmitted(true);
      setForm(initForm);
    } catch (err) {
      setSubmitError(err.message || 'Unable to submit booking.');
    } finally {
      setSubmitting(false);
    }
  };

  const waMessage = `🔧 *New Service Booking — Dev Computers*\n\n*Name:* ${form.name}\n*Phone:* +91 ${form.phone}\n*Service:* ${form.service}\n*Date:* ${form.date}\n*Time:* ${form.time}\n*Address:* ${form.address}\n*Notes:* ${form.notes || 'None'}`;

  if (submitted) {
    return (
      <div className="booking-page page-enter">
        <div className="container" style={{ paddingTop: 60, paddingBottom: 80 }}>
          <div className="booking-success">
            <div className="success-icon">
              <i className="fa-solid fa-circle-check"></i>
            </div>
            <h2><span className="gradient-text">Booking Confirmed!</span></h2>
            <p>
              Thank you, <strong>{form.name}</strong>! Your service booking for <strong>{form.service}</strong> on <strong>{form.date}</strong> at <strong>{form.time}</strong> has been received. Please confirm via WhatsApp so our team can prepare.
            </p>
            <a
              href={getWhatsAppLink(waMessage)}
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp"
              style={{ display: 'inline-flex', marginBottom: 16 }}
            >
              <i className="fa-brands fa-whatsapp"></i> Confirm on WhatsApp
            </a>
            <br />
            <button
              onClick={() => { setSubmitted(false); setForm(initForm); }}
              className="btn-outline"
              style={{ marginTop: 8 }}
            >
              <i className="fa-solid fa-plus"></i> Book Another Service
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page page-enter">
      <div className="booking-hero">
        <div className="container">
          <div className="section-tag fade-in">Book a Service</div>
          <h1 className="fade-in">
            Schedule Your <span className="gradient-text">Service</span>
          </h1>
          <p className="fade-in">Fill in the form and we'll confirm your booking via WhatsApp or call.</p>
        </div>
      </div>

      <div className="booking-section">
        <div className="container">
          <div className="booking-layout">
            {/* Form */}
            <div className="booking-form-card fade-in">
              <h2><i className="fa-solid fa-calendar-check"></i> Service Booking Form</h2>
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name <span>*</span></label>
                    <input
                      className={`form-input${errors.name ? ' error' : ''}`}
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                    />
                    {errors.name && <div className="field-error"><i className="fa-solid fa-circle-exclamation"></i>{errors.name}</div>}
                  </div>
                  <div className="form-group">
                    <label>Phone Number <span>*</span></label>
                    <div className="phone-group">
                      <div className="phone-prefix">+91</div>
                      <input
                        className={`form-input${errors.phone ? ' error' : ''}`}
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="10-digit number"
                        maxLength={10}
                      />
                    </div>
                    {errors.phone && <div className="field-error"><i className="fa-solid fa-circle-exclamation"></i>{errors.phone}</div>}
                  </div>
                </div>

                <div className="form-group">
                  <label>Service Required <span>*</span></label>
                  <select
                    className={`form-select${errors.service ? ' error' : ''}`}
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                  >
                    <option value="">Select a service...</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.title}>{s.title} — from {s.startingPrice}</option>
                    ))}
                  </select>
                  {errors.service && <div className="field-error"><i className="fa-solid fa-circle-exclamation"></i>{errors.service}</div>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Preferred Date <span>*</span></label>
                    <input
                      type="date"
                      className={`form-input${errors.date ? ' error' : ''}`}
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      min={today}
                    />
                    {errors.date && <div className="field-error"><i className="fa-solid fa-circle-exclamation"></i>{errors.date}</div>}
                  </div>
                  <div className="form-group">
                    <label>Preferred Time Slot <span>*</span></label>
                    <select
                      className={`form-select${errors.time ? ' error' : ''}`}
                      name="time"
                      value={form.time}
                      onChange={handleChange}
                    >
                      <option value="">Select time slot...</option>
                      {timeSlots.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    {errors.time && <div className="field-error"><i className="fa-solid fa-circle-exclamation"></i>{errors.time}</div>}
                  </div>
                </div>

                <div className="form-group">
                  <label>Service Address <span>*</span></label>
                  <textarea
                    className={`form-textarea${errors.address ? ' error' : ''}`}
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Your full address for doorstep service, or 'Visit Store' if coming to our shop"
                    rows={3}
                  />
                  {errors.address && <div className="field-error"><i className="fa-solid fa-circle-exclamation"></i>{errors.address}</div>}
                </div>

                <div className="form-group">
                  <label>Additional Notes</label>
                  <textarea
                    className="form-textarea"
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="Describe the issue or any special requirements (optional)"
                    rows={3}
                  />
                </div>

                {submitError && <div className="field-error" style={{ marginBottom: 16 }}><i className="fa-solid fa-circle-exclamation"></i>{submitError}</div>}
                {!user && (
                  <div className="field-note" style={{ marginBottom: 16 }}>
                    Please <Link to="/login">login</Link> or <Link to="/register">register</Link> to complete the booking.
                  </div>
                )}
                <button type="submit" className="btn-submit" disabled={submitting || !user}>
                  <i className="fa-solid fa-paper-plane"></i>
                  {submitting ? 'Submitting…' : 'Submit Booking Request'}
                </button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="booking-sidebar">
              <div className="sidebar-card fade-in">
                <h3>Quick Contact</h3>
                <a href={`tel:${PHONE}`} className="sidebar-action" style={{ background: 'rgba(37,99,235,0.08)', borderRadius: 12 }}>
                  <div className="sidebar-action-icon" style={{ background: 'rgba(37,99,235,0.2)', color: '#60a5fa' }}>
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div className="sidebar-action-text">
                    <div className="sidebar-action-label">Call Us Directly</div>
                    <div className="sidebar-action-val">{PHONE_DISPLAY}</div>
                  </div>
                  <i className="fa-solid fa-arrow-right" style={{ color: '#64748b', fontSize: '0.8rem' }}></i>
                </a>
                <a href={getWhatsAppLink('Hi! I want to book a service. Please assist.')} target="_blank" rel="noreferrer"
                  className="sidebar-action" style={{ background: 'rgba(37,211,102,0.08)', borderRadius: 12 }}>
                  <div className="sidebar-action-icon" style={{ background: 'rgba(37,211,102,0.15)', color: '#25d366' }}>
                    <i className="fa-brands fa-whatsapp"></i>
                  </div>
                  <div className="sidebar-action-text">
                    <div className="sidebar-action-label">WhatsApp Us</div>
                    <div className="sidebar-action-val">{PHONE_DISPLAY}</div>
                  </div>
                  <i className="fa-solid fa-arrow-right" style={{ color: '#64748b', fontSize: '0.8rem' }}></i>
                </a>
              </div>

              <div className="sidebar-card fade-in">
                <h3>Services Available</h3>
                <ul className="sidebar-services">
                  {services.map((s) => (
                    <li key={s.id}>
                      <i className={`fa-solid ${s.icon}`}></i>
                      {s.title}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="fade-in">
                <div className="guarantee-badge">
                  <i className="fa-solid fa-shield-halved"></i>
                  <div>
                    <strong>90-Day Warranty</strong>
                    <span>All repairs come with a 90-day warranty on parts and labour. Your satisfaction is guaranteed.</span>
                  </div>
                </div>
              </div>

              <div className="sidebar-card fade-in" style={{ background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.15)' }}>
                <h3 style={{ color: '#60a5fa' }}>🕒 Working Hours</h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    { day: 'Monday – Friday', time: '9:00 AM – 7:00 PM' },
                    { day: 'Saturday', time: '9:00 AM – 7:00 PM' },
                    { day: 'Sunday', time: '10:00 AM – 4:00 PM' },
                  ].map((h) => (
                    <li key={h.day} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#94a3b8', paddingBottom: 8, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <span>{h.day}</span>
                      <span style={{ color: '#60a5fa', fontWeight: 600 }}>{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
