import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Service from '../models/Service.js';
import Booking from '../models/Booking.js';
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '../config.js';

const products = [
  {
    name: 'Mechanical Gaming Keyboard RGB',
    category: 'accessories',
    categoryLabel: 'Computer Accessories',
    price: '₹2,499',
    priceNum: 2499,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80',
    specs: ['Cherry MX Blue Switches', 'Full RGB Backlight'],
    description: 'Elevate your typing and gaming experience with this full-size mechanical keyboard featuring Cherry MX switches, per-key RGB lighting, and a robust aluminium top plate. Compatible with Windows and Mac.',
    specsList: ['Switch Type: Cherry MX Blue (Tactile)', 'Backlight: Per-key RGB, 16.8M colors', 'Connectivity: USB-C detachable cable', 'Layout: Full-size 104-key', 'Polling Rate: 1000Hz', 'Material: Aluminium top plate'],
    rating: 4.7,
    reviews: 134,
    featured: true,
    inStock: true,
    quantity: 20,
  },
  {
    name: 'Gaming Mouse 16000 DPI',
    category: 'accessories',
    categoryLabel: 'Computer Accessories',
    price: '₹1,799',
    priceNum: 1799,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80',
    specs: ['16000 DPI Sensor', '7 Programmable Buttons'],
    description: 'High-precision optical gaming mouse with adjustable DPI up to 16000, RGB underglow lighting, and ergonomic right-handed design. Ideal for FPS and MOBA players.',
    specsList: ['Sensor: Optical, up to 16000 DPI', 'Buttons: 7 programmable', 'Lighting: RGB underglow', 'Cable: 1.8m braided USB', 'Weight: 95g (without cable)', 'Compatibility: Windows 7+, macOS 10.11+'],
    rating: 4.5,
    reviews: 89,
    featured: true,
    inStock: true,
    quantity: 44,
  },
];

const services = [
  {
    title: 'CCTV Camera Installation',
    short: 'Professional CCTV setup for homes, offices & shops with remote viewing.',
    description: 'We provide end-to-end CCTV surveillance solutions tailored to your security needs. Our technicians assess your premises, recommend the best camera placements, and install industry-grade systems that keep you safe 24/7.',
    features: ['Site survey & camera placement planning', 'HD, Full HD & 4K camera options', 'Night vision & motion detection', 'Remote viewing via mobile app', 'DVR/NVR configuration & cloud backup', '1-year installation warranty'],
    startingPrice: '₹4,999',
    category: 'Security',
  },
  {
    title: 'Laptop Service & Sales',
    short: 'Laptop repairs, screen replacements, and refurbished laptop sales.',
    description: 'From cracked screens to motherboard-level repairs, our certified technicians restore your laptop to like-new condition. We also stock quality refurbished laptops with warranty, ideal for students and professionals on a budget.',
    features: ['Screen / display replacement', 'Battery & keyboard replacement', 'Motherboard & chip-level repair', 'Data recovery & transfer', 'Refurbished laptop sales with warranty', 'Software troubleshooting & antivirus'],
    startingPrice: '₹599',
    category: 'Repair',
  },
];

const bookings = [
  {
    customer: 'Rahul Sharma',
    email: 'rahul@example.com',
    phone: '9876543210',
    service: 'Laptop Repair',
    date: '2026-06-12',
    time: '10:00 AM',
    address: 'Shirali',
    status: 'pending',
  },
  {
    customer: 'Priya Nair',
    email: 'priya@example.com',
    phone: '9123456789',
    service: 'CCTV Camera Installation',
    date: '2026-06-14',
    time: '02:00 PM',
    address: 'Bhatkal Town',
    status: 'confirmed',
  },
];

export async function initSeed() {
  const users = await User.countDocuments();
  if (users === 0) {
    const hash = bcrypt.hashSync(ADMIN_PASSWORD, 10);
    await User.create({ name: 'Admin', email: ADMIN_EMAIL.toLowerCase().trim(), password: hash, role: 'admin' });
  }

  const productCount = await Product.countDocuments();
  if (productCount === 0) {
    await Product.insertMany(products);
  }

  const serviceCount = await Service.countDocuments();
  if (serviceCount === 0) {
    await Service.insertMany(services);
  }

  const bookingCount = await Booking.countDocuments();
  if (bookingCount === 0) {
    await Booking.insertMany(bookings);
  }
}
